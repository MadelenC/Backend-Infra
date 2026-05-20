import {
  countBudgets,
  countUsers,
  countVehicles,
  countTrips,
} from "../services/dashboardService.js";

export const getDashboardStats = async (req, res) => {
  try {
    const budgets = await countBudgets();
    const users = await countUsers();
    const vehicles = await countVehicles();
    const trips = await countTrips();

    return res.json({
      budgets,
      users,
      vehicles,
      trips,
    });

  } catch (error) {
    console.error("Error dashboard stats:", error);
    return res.status(500).json({
      message: "Error al obtener estadísticas del dashboard",
    });
  }
};