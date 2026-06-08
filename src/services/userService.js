import { userRepository } from "../repositories/userRepository.js";
import { entidadesRepository } from "../repositories/entidadesRepository.js";
import bcrypt from "bcrypt";

// GET ALL USERS
export const getAllUsers = async ({ page, limit, search, role }) => {
  const query = userRepository
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.entidades", "entidades");


  if (search) {
    query.andWhere(
      `(LOWER(user.nombres) LIKE :search 
        OR LOWER(user.apellidos) LIKE :search
        OR user.cedula LIKE :search
        OR user.celular LIKE :search)`,
      { search: `%${search.toLowerCase()}%` }
    );
  }
 
  
  if (role) {
    query.andWhere("user.tipo = :role", { role });
  }

  query.skip((page - 1) * limit);
  query.take(limit);

  const [data, total] = await query.getManyAndCount();

  
  const cleaned = data.map((u) => ({
    id: u.id,
    nombres: u.nombres,
    apellidos: u.apellidos,
    tipo: u.tipo,
    cedula: u.cedula,
    celular: u.celular,
    email: u.email,
    cargo: u.cargo,
    avatar: u.avatar,
    insertador: u.insertador,
    active: u.active,

    
    entidades: u.entidades?.map(e => ({
      id: e.id,
      sigla: e.sigla,
      facultad: e.facultad,
      materia: e.materia,
      carrera: e.carrera


    })),
  }));

  return {
    data: cleaned,
    total,
    totalPages: Math.ceil(total / limit),
  };
};

export const getUserById = async (id) => {
  return await userRepository.findOne({
    where: { id },
    relations: ["entidades"],
  });
};




export const createUser = async (data) => {
  try {
    const payload = { ...data };
    const cedula = payload.cedula?.toString().trim();
    console.log("👉 CEDULA NORMALIZADA:", cedula);

    // VALIDAR CÉDULA DUPLICADA SIEMPRE EN BD
    const existingUser = await userRepository.findOne({
    where: { cedula },
  });

    if (existingUser) {
      throw {
        status: 400,
        message: "La cédula ya está registrada",
      };
    }

    if (!payload.email) delete payload.email;
    if (!payload.cargo) delete payload.cargo;

    const hashedPassword = await bcrypt.hash(
      payload.password,
      10
    );

    const userAdd = {
      nombres: payload.nombres,
      apellidos: payload.apellidos,
      cedula,
      celular: payload.celular,
      email: payload.email,
      tipo: payload.tipo,
      insertador:
        payload.insertador || "DESCONOCIDO",
      password: hashedPassword,
      cargo: payload.cargo,
      avatar: payload.avatar || null,
      active: true,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const user = userRepository.create(userAdd);

    return await userRepository.save(user);

  } catch (err) {

    console.error(
      "Error al crear usuario:",
      err
    );

    // ERROR PERSONALIZADO
    if (err.status) {
      throw err;
    }

    // ERROR UNIQUE POSTGRES
    if (err.code === "23505") {
      throw {
        status: 400,
        message:
          "La cédula ya está registrada",
      };
    }

    throw {
      status: 500,
      message:
        "No se pudo crear el usuario",
    };
  }
};


export const updateUser = async (id, data) => {
  try {
    console.log("📥 DATA QUE LLEGA:", data);

    const user = await userRepository.findOne({
      where: { id },
      relations: ["entidades"],
    });

    if (!user) {
      throw { status: 404, message: "Usuario no encontrado" };
    }

    const { entidades, ...userData } = data;

    console.log("👤 USER DATA:", userData);
    console.log("🏢 ENTIDADES:", entidades);

    if (!userData.password) {
      delete userData.password;
    }

    
    userRepository.merge(user, userData);
    await userRepository.save(user);

    
    if (Array.isArray(entidades)) {
      for (const eData of entidades) {

        console.log("➡️ PROCESANDO ENTIDAD:", eData);

        let entidad;

        if (eData.id) {
          entidad = await entidadesRepository.findOneBy({ id: eData.id });

          if (!entidad) {
            throw {
              status: 404,
              message: `Entidad ${eData.id} no encontrada`,
            };
          }

          entidadesRepository.merge(entidad, {
            ...eData,
            updated_at: new Date(), 
          });

        } else {
          entidad = entidadesRepository.create({
            ...eData,
            user,

            
            created_at: new Date(),
            updated_at: new Date(),
          });
        }

        console.log("💾 GUARDANDO ENTIDAD...");
        await entidadesRepository.save(entidad);
      }
    }

    
    const updatedUser = await userRepository.findOne({
      where: { id },
      relations: ["entidades"],
    });

    console.log("✅ USER FINAL:", updatedUser);

    return {
      id: updatedUser.id,
      nombres: updatedUser.nombres,
      apellidos: updatedUser.apellidos,
      tipo: updatedUser.tipo,
      cedula: updatedUser.cedula,
      celular: updatedUser.celular,
      email: updatedUser.email,
      cargo: updatedUser.cargo,
      avatar: updatedUser.avatar,
      insertador: updatedUser.insertador,

      entidades: updatedUser.entidades?.map(e => ({
        id: e.id,
        facultad: e.facultad,
        carrera: e.carrera,
        materia: e.materia,
        sigla: e.sigla,
        
      })),
    };

  } catch (err) {
    console.error("❌ ERROR REAL EN UPDATE:", err);
    throw err;
  }
};
// DELETE USER
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
//para cambiar cotraseña
 export const changePassword = async (id, data) => {

  const { currentPassword, newPassword } = data;

  console.log("👉 ID:", id);
  console.log("👉 DATA:", data);

  const user = await userRepository.findOne({
    where: { id },
  });

  console.log("👉 USER:", user);
  console.log("👉 PASSWORD DB:", user.password);

  if (!user) throw { status: 404, message: "Usuario no encontrado" };

  const isValid = await bcrypt.compare(
    currentPassword,
    user.password
  );

  console.log("👉 PASSWORD INPUT:", currentPassword);
  console.log("👉 COMPARE RESULT:", isValid);

  if (!isValid) {
    throw { status: 400, message: "Contraseña actual incorrecta" };
  }

  if (!newPassword || newPassword.length < 6) {
    throw { status: 400, message: "Mínimo 6 caracteres" };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  user.password = hashedPassword;
  user.updated_at = new Date();

  await userRepository.save(user);

  return { message: "Contraseña actualizada correctamente" };
};

export const updateAvatar = async (id, avatarUrl) => {

  const user = await userRepository.findOne({
    where: { id },
  });

  if (!user) {
    throw {
      status: 404,
      message: "Usuario no encontrado",
    };
  }

  user.avatar = avatarUrl;
  user.updated_at = new Date();

  await userRepository.save(user);

  return {
    avatar: user.avatar,
  };
};


export const toggleUserStatus = async (id) => {
  const user = await userRepository.findOneBy({ id });

  if (!user) {
    throw {
      status: 404,
      message: "Usuario no encontrado",
    };
  }

  user.active = !user.active;
  user.updated_at = new Date();

  await userRepository.save(user);

  return {
    id: user.id,
    active: user.active,
  };
};