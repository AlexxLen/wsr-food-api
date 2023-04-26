import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getDishes = async (req, res) => {
	try {
		const dishes = await prisma.dish.findMany();
		res.status(200).json(dishes);
	} catch (err) {
		res.status(500).json({ message: 'Ошибка' });
	}
};

export const getDishesByVersion = async (req, res) => {
	try {
		const vers = req.params.version;
		const dishesByVersion = await prisma.dish.findMany({
			where: {
				version: vers,
			},
		});
		res.status(200).json(dishesByVersion);
	} catch (err) {
		res.status(500).json({ message: 'Ошибка' });
	}
};

export const getVersions = async (req, res) => {
	try {
		const versions = await prisma.dish.findMany({
			select: {
				version: true,
			},
			distinct: ['version'],
			orderBy: {
				version: 'asc',
			},
		});

		const response = {
			version: versions.map((vers) => vers.version),
		};
		console.log(versions);

		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Ошибка' });
	}
};
