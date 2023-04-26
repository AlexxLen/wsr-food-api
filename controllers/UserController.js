import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const register = async (req, res) => {
	try {
		const user = await prisma.user.create({
			data: {
				email: req.body.email,
				fullname: req.body.fullname,
				password: req.body.password,
				phone: req.body.phone,
			},
		});

		const token = jwt.sign(
			{
				id: user._id,
			},
			'wsr-food',
			{
				expiresIn: '7d',
			},
		);

		res.status(201).json({ token });
	} catch (err) {
		res.status(500).json({
			message: 'Ошибка!',
		});
	}
};

export const login = async (req, res) => {
	try {
		const email = req.body.email;
		const password = req.body.password;
		const user = await prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			return res.status(401).json({
				message: 'Пользователь не найден',
			});
		}

		const isValidPass = password == user.password;

		if (!isValidPass) {
			return res.status(400).json({
				message: 'Неверный логин или пароль',
			});
		}

		const token = jwt.sign(
			{
				id: user._id,
			},
			'wsr-food',
			{
				expiresIn: '7d',
			},
		);

		res.status(201).json({ token });
	} catch (err) {
		res.status(500).json({
			message: 'Ошибка!',
		});
	}
};
