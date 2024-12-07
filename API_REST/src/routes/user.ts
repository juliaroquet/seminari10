import express from 'express';
import * as userServices from '../services/userServices';
import { logIn } from '../controllers/user_controller';

const router = express.Router();

// Obtener todos los usuarios
router.get('/', async (_req, res) => {
    const data = await userServices.getEntries.getAll();
    return res.json(data);
});

// Obtener un usuario por ID
router.get('/:id', async (req, res) => {
    const data = await userServices.getEntries.findById(req.params.id);
    return res.json(data);
});

// Crear un nuevo usuario
router.post('/newUser', async (req, res) => {
    const data = await userServices.getEntries.create(req.body);
    return res.json(data);
});

// Login del usuario
router.post('/logIn', logIn);

// Añadir experiencias a un usuario
router.post('/addExperiencias/:idUser/:idExp', async (req, res) => {
    const data = await userServices.getEntries.addExperiencies(req.params.idUser, req.params.idExp);
    return res.json(data);
});

// Modificar un usuario
router.put('/:id', async (req, res) => {
    try {
        const data = await userServices.getEntries.update(req.params.id, req.body);
        return res.json(data);
    } catch (error) {
        return res.status(500).json({ message: 'Error al modificar el usuario', error });
    }
});

// Eliminar un usuario
router.delete('/:id', async (req, res) => {
    const data = await userServices.getEntries.delete(req.params.id);
    return res.json(data);
});

// Eliminar una experiencia de un usuario
router.delete('/delParticipant/:idUser/:idExp', async (req, res) => {
    const data = await userServices.getEntries.delExperiencies(req.params.idUser, req.params.idExp);
    return res.json(data);
});

export default router;
