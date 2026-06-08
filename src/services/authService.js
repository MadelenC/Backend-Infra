import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories/userRepository.js';

const SECRET_KEY = process.env.JWT_SECRET || 'secret_key';

export const authService = {
  register: async (userData) => {
    console.log('📦 Datos recibidos en register:', userData);
    const { email, password } = userData;

    if (!email || !password) throw new Error('Email and password are required');

    const existingUser = await userRepository.findOneBy({ email });
    if (existingUser) throw new Error('Email already in use');

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    await userRepository.save(newUser); 

    const { password: _, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  },

  login: async ({ cedula, password }) => {
  if (!cedula || !password) {
    throw new Error('Ci and password are required');
  }

  const user = await userRepository.findOneBy({
    cedula: cedula.trim(),
  });

  if (!user) {
    throw new Error('Invalid Ci or password');
  }

  if (!user.active) {
  throw new Error("Usuario inactivo. Contacte al administrador.");
}

if (user.tipo === "ninguno") {
  throw new Error("Usuario sin tipo asignado. Contacte al administrador.");
}

  const validPassword = await bcrypt.compare(
    password,
    user.password
  );

  if (!validPassword) {
    throw new Error('Invalid Ci or password');
  }

  const token = jwt.sign(
    { id: user.id, cedula: user.cedula },
    SECRET_KEY,
    { expiresIn: '1h' }
  );

  const { password: _, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, token };
},
  //prueba de que algunas contraseñas no funcionan
  //login: async ({ cedula, password }) => {

  //console.log("CEDULA RECIBIDA:", `"${cedula}"`);

  // DEBUG: ver TODOS los usuarios
  //const all = await userRepository.find();
  //console.log("CEDULAS EN BD:", all.map(u => u.cedula));

  //const user = await userRepository.findOneBy({ cedula });

  //console.log("USER ENCONTRADO:", user);

  //if (!user) throw new Error('Invalid Ci or password');

  //const isMatch = await bcrypt.compare(password, user.password);

  //if (!isMatch) throw new Error('Invalid Ci or password');

  //return user;
//},

  getByCi: async (ci) => {
    const user = await userRepository.findOneBy({ cedula: ci });
    return user;
  },

  comparePassword: async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
  },

};

