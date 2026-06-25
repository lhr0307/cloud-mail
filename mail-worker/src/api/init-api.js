import app from '../hono/hono';
import { dbInit } from '../init/init';
import settingService from '../service/setting-service';

app.get('/init/refresh-setting-once', async (c) => {
	const setting = await c.env.kv.get('setting:');

	if (setting) {
		return c.text('already initialized');
	}

	await settingService.refresh(c);

	return c.text('success');
});

app.get('/init/bootstrap-once', async (c) => {
	const setting = await c.env.kv.get('setting:');

	if (setting) {
		return c.text('already initialized');
	}

	const steps = [
		'intDB',
		'v1_1DB',
		'v1_2DB',
		'v1_3DB',
		'v1_3_1DB',
		'v1_4DB',
		'v1_5DB',
		'v1_6DB',
		'v1_7DB',
		'v2DB',
		'v2_3DB',
		'v2_4DB',
		'v2_5DB',
		'v2_6DB',
		'v2_7DB',
		'v2_8DB',
		'v2_9DB',
		'v3_0DB'
	];

	for (const step of steps) {
		try {
			await dbInit[step](c);
		} catch (e) {
			console.warn(`bootstrap skipped ${step}: ${e.message}`);
		}
	}

	await settingService.refresh(c);

	return c.text('success');
});

app.get('/init/:secret', (c) => {
	return dbInit.init(c);
})
