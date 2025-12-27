import { userRepository } from "../repositories/userRepository.js";
import { entidadesRepository } from "../repositories/entidadesRepository.js";

export const getAllUsers = async () => {
  return await userRepository.find({
    relations: ["entidades"],
  });
};


export const getUserById = async (id) => {
  return await userRepository.findOne({
    where: { id },
    relations: ["entidades"],
  });
};


export const createUser = async (data) => {
  try {
    // Limpiar campos opcionales vacíos
    const payload = { ...data };
    if (!payload.email) delete payload.email;
    if (!payload.cargo) delete payload.cargo;

    const userAdd = {
      nombres: payload.nombres,
      apellidos: payload.apellidos,
      cedula: payload.cedula,
      celular: payload.celular,
      email: payload.email,
      tipo: payload.tipo,
      insertador: "SISTEMA",
      password: payload.password,
      cargo: payload.cargo,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const user = userRepository.create(userAdd);

    return await userRepository.save(user);
  } catch (err) {
    console.error("Error al crear usuario:", err);
    
    if (err.code === "23505") { // Postgres unique violation
      throw new Error("Ya existe un usuario con algún dato único duplicado (cedula, celular o email).");
    }
    throw new Error("No se pudo crear el usuario. Verifique los datos.");
  }
};



export const updateUser = async (id, data) => {
  const user = await userRepository.findOne({
    where: { id },
    relations: ["entidades"],
  });
  if (!user) throw { status: 404, message: "Usuario no encontrado" };

  // 1️⃣ Actualizar campos simples
  userRepository.merge(user, data);

  // 2️⃣ Actualizar entidades relacionadas
  if (data.entidades && Array.isArray(data.entidades)) {
    user.entidades = await Promise.all(
      data.entidades.map(async (eData) => {
        let ent;
        if (eData.id) {
          ent = await entidadesRepository.findOneBy({ id: eData.id });
          if (!ent) throw { status: 404, message: `Entidad con id ${eData.id} no encontrada` };
          entidadesRepository.merge(ent, eData);
          await entidadesRepository.save(ent);
        } else {
          ent = entidadesRepository.create({ ...eData, user });
          await entidadesRepository.save(ent);
        }
        return ent;
      })
    );
  }

  try {
    return await userRepository.save(user);
  } catch (err) {
    if (err.code === "23505") {
      const field = err.detail.match(/\((.+)\)/)[1];
      throw { status: 400, message: `Ya existe un registro con el mismo ${field}` };
    }
    throw { status: 500, message: "Error al actualizar usuario" };
  }
};

export const deleteUser = async (id) => {
  const user = await userRepository.findOne({
    where: { id },
    relations: ["entidades"],
  });
  if (!user) throw { status: 404, message: "Usuario no encontrado" };

  try {
    return await userRepository.remove(user);
  } catch (err) {
    throw { status: 500, message: "Error al eliminar usuario" };
  }
};

