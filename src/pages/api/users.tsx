// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//     if (req.method === 'POST') {
//         return await addUser(req, res);
//     } else if (req.method === 'GET') {
//         return await readUsers(req, res);
//     } else {
//         return res.status(405).json({ message: 'Method not allowed', success: false })
//     }
// }

// async function readUsers(req, res) {
//     try {
//         const readEntry = await prisma.user.findMany();
//         return res.status(200).json(readEntry, { success: true })
//     } catch (error) {
//         console.error('Request error', error);
//         res.status(500).json({ error: "Error reading from database", success: false })
//     }
// }

// async function addUser(req, res) {
//     const body = req.body;
//     try {
//         const newEntry = await prisma.user.create({
//             data: {
//                 username: body.username,
//                 email: body.email,
//                 password: body.password
//             }
//         });
//         return res.status(200).json(newEntry, { success: true })
//     } catch (error) {
//         console.error('Request error', error);
//         res.status(500).json({ error: "Error adding the user", success: false })
//     }
// }