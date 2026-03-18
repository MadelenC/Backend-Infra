import { budgetsRepository } from "../repositories/budgetsRepository.js";
import { viajesRepository } from "../repositories/travelRepository.js";  

// Traer todos los presupuestos con su viaje relacionado
export const getAllBudgets = async () => {
  return await budgetsRepository.find({ relations: ["viaje"] });
};

// Traer un presupuesto por ID
export const getBudgetById = async (id) => {
  const presupuesto = await budgetsRepository.findOne({
    where: { id },
    relations: ["viaje"],
  });
  if (!presupuesto) throw new Error("Presupuesto no encontrado");
  return presupuesto;
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