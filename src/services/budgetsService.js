import { budgetsRepository } from "../repositories/budgetsRepository.js";
import { viajesRepository } from "../repositories/travelRepository.js";  
import { userRepository } from "../repositories/userRepository.js";
import { vehicleRepository } from "../repositories/vehicleRepository.js";

export const getAllBudgets = async ({
  page = 1,
  limit = 8,
  search = "",
}) => {
  const query = budgetsRepository
    .createQueryBuilder("b")
    .leftJoinAndSelect("b.viaje", "viaje")
    .orderBy("b.id", "DESC");

   // SEARCH
if (search) {
  query.andWhere(
    `b.entidad LIKE :search`,
    {
      search: `%${search}%`,
    }
  );
}

  // PAGINACIÓN
  page = Number(page) || 1;
limit = Number(limit) || 8;

const skip = (page - 1) * limit;

query.skip(skip).take(limit);

  const [budgets, total] = await query.getManyAndCount();

  const result = await Promise.all(
    budgets.map(async (b) => {
      const chofer = await userRepository.findOneBy({
        id: b.chofer,
      });

      const vehiculo = await vehicleRepository.findOneBy({
        id: b.vehiculo,
      });

      const encargado = await userRepository.findOneBy({
        id: b.encargado,
      });

      return {
        ...b,
        chofer,
        vehiculo,
        encargado,
      };
    })
  );

  return {
    data: result,
    total,
    totalPages: Math.ceil(total / limit),
  };
};

// Traer un presupuesto por ID
export const getBudgetById = async (id) => {
  const presupuesto = await budgetsRepository.findOne({
    where: { id },
    relations: ["viaje"],
  });

  if (!presupuesto) {
    throw new Error("Presupuesto no encontrado");
  }

  const chofer = await userRepository.findOneBy({
    id: presupuesto.chofer,
  });

  const vehiculo = await vehicleRepository.findOneBy({
    id: presupuesto.vehiculo,
  });

  const encargado = await userRepository.findOneBy({
    id: presupuesto.encargado,
  });

  return {
    ...presupuesto,
    chofer,
    vehiculo,
    encargado,
  };
};

// Crear un nuevo presupuesto
export const createBudget = async (data) => {
  try {
    const presupuestoAdd = {
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
    };

    // Asignar viaje si se pasa viaje_id
    if (data.viaje_id) {
      const viaje = await viajesRepository.findOneBy({ id: data.viaje_id });
      if (!viaje) throw new Error("Viaje no encontrado");
      presupuestoAdd.viaje = viaje;
    }

    const nuevoPresupuesto = budgetsRepository.create(presupuestoAdd);
    return await budgetsRepository.save(nuevoPresupuesto);
  } catch (error) {
    console.error("❌ Error al crear presupuesto:", error);
    throw error;
  }
};

// Actualizar presupuesto existente
export const updateBudget = async (id, data) => {
  const presupuesto = await budgetsRepository.findOne({
    where: { id },
    relations: ["viaje"],
  });
  if (!presupuesto) throw new Error("Presupuesto no encontrado");

  budgetsRepository.merge(presupuesto, data);
  presupuesto.updated_at = new Date();

  // Actualizar viaje si se pasa viaje_id
  if (data.viaje_id) {
    const viaje = await viajesRepository.findOneBy({ id: data.viaje_id });
    if (!viaje) throw new Error("Viaje no encontrado");
    presupuesto.viaje = viaje;
  }

  return await budgetsRepository.save(presupuesto);
};

// Eliminar presupuesto
export const deleteBudget = async (id) => {
  const presupuesto = await budgetsRepository.findOneBy({ id });
  if (!presupuesto) throw new Error("Presupuesto no encontrado");

  return await budgetsRepository.remove(presupuesto);
};