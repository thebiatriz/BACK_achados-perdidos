import { prismaClient } from '../database/PrismaClient.js';

// Create new user
export const createUser = async (req, res) => {
  const { nome, telefone, email, senha } = req.body;

  try {
    const user = await prismaClient.usuario.create({
      data: { nome, telefone, email, senha },
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: "Error creating user", details: error.message });
  }
};

// List all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await prismaClient.usuario.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Error searching for users" });
  }
};

// Search user by ID
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prismaClient.usuario.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Error searching for user" });
  }
};

// Update user
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { nome, telefone, email, senha } = req.body;

  try {
    const user = await prismaClient.usuario.update({
      where: { id },
      data: { nome, telefone, email, senha },
    });

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: "Error updating user" });
  }
};

// Delete user
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await prismaClient.usuario.delete({ where: { id } });
    res.status(204).send(); // Success without content
  } catch (error) {
    res.status(400).json({ error: "Error deleting user" });
  }
};
