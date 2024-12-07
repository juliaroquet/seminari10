import { usersInterface, usersofDB } from '../modelos/user'

export const getEntries = {
    // Obtener todos los usuarios
    getAll: async () => {
        return await usersofDB.find();
    },

    // Encontrar un usuario por su ID
    findById: async (id: string) => {
        return await usersofDB.findOne({ _id: id });
    },

    // Buscar usuario por correo y contraseña
    findIdAndPassword: async (mail: string, password: string): Promise<usersInterface | null> => {
        return await usersofDB.findOne({ mail: mail }).exec()
            .then(userResponse => {
                if (userResponse == null || userResponse.password != password) {
                    return null;
                } else {
                    return userResponse;
                }
            });
    },

    // Añadir una experiencia a un usuario
    addExperiencies: async (idUser: string, idExp: string) => {
        return await usersofDB.findByIdAndUpdate(idUser, { $addToSet: { experiencies: idExp } });
    },

    // Eliminar una experiencia de un usuario
    delExperiencies: async (idUser: string, idExp: string) => {
        return await usersofDB.findByIdAndUpdate(idUser, { $pull: { experiencies: idExp } });
    },

    // Crear un nuevo usuario
    create: async (entry: object) => {
        return await usersofDB.create(entry);
    },

    // Actualizar los datos de un usuario
    update: async (id: string, body: object) => {
        try {
            // Buscar y actualizar al usuario
            const updatedUser = await usersofDB.findByIdAndUpdate(id, body, { new: true });
            return updatedUser;
        } catch (error) {
            console.error("Error al actualizar el usuario: ", error);
            throw error; // Lanzar el error para que el controlador lo maneje
        }
    },

    // Eliminar un usuario
    delete: async (id: string) => {
        return await usersofDB.findByIdAndDelete(id);
    }
}
