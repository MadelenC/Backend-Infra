import { authService } from '../services/authService.js';

export const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {

    console.log("DATOS RECIBIDOS EN EL LOGIN" ,req.body)

    const { cedula, password } = req.body;
    if (!cedula || !password) throw new Error('Ci and password are required');
    
    const response = await authService.getByCi(cedula);
    if (!response) throw new Error('el Usuario no existe');

    const result = await authService.comparePassword(password, response.password);
    console.log("::RESPONSE::>>>" ,result)
    if (!result) throw new Error('Contraseña incorrecta');

    
    const { user, token } = await authService.login(req.body);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
