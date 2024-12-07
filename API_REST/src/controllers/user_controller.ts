import { usersInterface, UsersInterfacePrivateInfo } from '../modelos/user'
import * as userServices from '../services/userServices'
import { Request, Response } from 'express'

// Iniciar sesión de usuario
export async function logIn(req: Request, res: Response): Promise<Response> {
    try {
        const { mail, password } = req.body as UsersInterfacePrivateInfo;
        const user: usersInterface | null = await userServices.getEntries.findIdAndPassword(mail, password);
        console.log("Logeado:", user);
        if (user != null) {
            return res.status(200).json(user);
        } else {
            return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });
        }
    } catch (e) {
        return res.status(500).json({ e: 'No se pudo encontrar el usuario' });
    }
}

// Modificar usuario
export async function modifyUser(req: Request, res: Response): Promise<Response> {
    try {
        const { userId } = req.params;  // Se asume que el ID del usuario se pasa por la URL
        const updatedData = req.body;   // Los nuevos datos del usuario se reciben en el cuerpo de la solicitud

        // Validar que los datos necesarios estén presentes
        if (!updatedData.name || !updatedData.mail) {
            return res.status(400).json({ message: 'El nombre y el correo son campos obligatorios' });
        }

        // Llamamos al servicio para actualizar el usuario
        const updatedUser = await userServices.getEntries.update(userId, updatedData);

        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error en el servidor interno', error});
    }
}
