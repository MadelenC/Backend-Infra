import { userRepository } from "../repositories/userRepository.js";

export const getAllUsers = async () => {
  return await userRepository.find();
};

export const getUserById = async (id) => {
  return await userRepository.findOneBy({ id });
};

export const createUser = async (data) => {
  const user = userRepository.create();
  return await userRepository.save(user);
};

export const updateUser = async (id, data) => {
  const user = await userRepository.findOneBy({ id });
  if(!user) return null;

  userRepository.merge(user, data);
  return await userRepository.save(user);
};
export const deleteUser = async (id) => {
  const user = await userRepository.findOneBy({ id });
  if(!user) return null;
  return await userRepository.remove(user);
}