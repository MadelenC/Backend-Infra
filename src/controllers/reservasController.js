import * as reservasService from "../services/reservasService.js";

// Obtener todas las reservas
export const getReservas = async (req, res) => {
  try {
    const reservas = await reservasService.getAllReservas();
    res.json(reservas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener reserva por ID
export const getReservaById = async (req, res) => {
  try {
    const reserva = await reservasService.getReservaById(parseInt(req.params.id));
    res.json(reserva);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};


// Crear nueva reserva
export const createReserva = async (req, res) => {
  try {
    console.log("Payload recibido en backend:", req.body);

    // <-- CORRECCIÓN: convertir user_id y pasajeros a números
    req.body.user_id = parseInt(req.body.user_id);
    req.body.pasajeros = parseInt(req.body.pasajeros);

    const nuevaReserva = await reservasService.createReserva(req.body);
    res.status(201).json(nuevaReserva);
  } catch (err) {
    console.error("Error al crear reserva:", err);
    res.status(500).json({ error: err.message });
  }
};

// Actualizar reserva existente
export const updateReserva = async (req, res) => {
  try {
    const updated = await reservasService.updateReserva(
      parseInt(req.params.id),
      req.body
    );
    if (!updated) return res.status(404).json({ error: "Reserva no encontrada" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar reserva
export const deleteReserva = async (req, res) => {
  try {
    const deleted = await reservasService.deleteReserva(parseInt(req.params.id));
    if (!deleted) return res.status(404).json({ error: "Reserva no encontrada" });
    res.json({ message: "Reserva eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};