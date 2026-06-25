import app from '../hono/hono';
import { dbInit } from '../init/init';
import settingService from '../service/setting-service';

app.get('/init/bootstrap-once', async (c) => {
	const setting = await c.env.kv.get('setting:');

	if (setting) {
		return c.text('already initialized');
	}

	await dbInit.intDB(c);
	await dbInit.v1_1DB(c);
	await dbInit.v1_2DB(c);
	await dbInit.v1_3DB(c);
	await dbInit.v1_3_1DB(c);
	await dbInit.v1_4DB(c);
	await dbInit.v1_5DB(c);
	await dbInit.v1_6DB(c);
	await dbInit.v1_7DB(c);
	await dbInit.v2DB(c);
	await dbInit.v2_3DB(c);
	await dbInit.v2_4DB(c);
	await dbInit.v2_5DB(c);
	await dbInit.v2_6DB(c);
	await dbInit.v2_7DB(c);
	await dbInit.v2_8DB(c);
	await dbInit.v2_9DB(c);
	await dbInit.v3_0DB(c);
	await settingService.refresh(c);

	return c.text('success');
});

app.get('/init/:secret', (c) => {
	return dbInit.init(c);
})
