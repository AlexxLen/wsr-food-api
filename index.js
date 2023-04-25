import express from 'express';
import * as DishController from './controllers/DishController.js';
import * as UserController from './controllers/UserController.js';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.get('/versions', DishController.getVersions);
app.get('/dishes/versions', DishController.getDishes);

app.post('/auth/register', UserController.register);
app.post('/auth/login', UserController.login);

app.listen(4444, (err) => {
	if (!err) {
		console.log('Server OK!');
	}
});
