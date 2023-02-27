import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getByVersion = async (req, res) => {
	try {
		const version = req.params.version;
		const dishes = await prisma.dish.findMany({
			where: {
				version: version,
			},
		});
		res.status(200).json(dishes);
	} catch (err) {
		res.status(500).json({ message: 'Ошибка' });
	}
};

export const getVersions = async (req, res) => {
	try {
		const dishes = await prisma.dish.findMany({
			select: {
				version: true,
			},
		});
		res.status(200).json(dishes);
	} catch (err) {
		res.status(500).json({ message: 'Ошибка' });
	}
};
