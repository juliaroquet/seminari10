import { Request, Response } from 'express';
import { usersofDB } from './../modelos/user'; // Ajusta la ruta de acuerdo a tu estructura de carpetas

export const modifyUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params; // Se asume que el ID del usuario se pasa por la URL
    const updatedData = req.body; // Los nuevos datos del usuario se reciben en el cuerpo de la solicitud

    // Validar que los datos a modificar estén presentes (por ejemplo, name, mail, comment)
    if (!updatedData.name || !updatedData.mail) {
      return res.status(400).json({ message: 'Name and mail are required fields' });
    }

    // Encontrar y actualizar el usuario
    const user = await usersofDB.findByIdAndUpdate(userId, updatedData, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error', error });
  }
};
