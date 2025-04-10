import { prismaClient } from '../database/PrismaClient.js';

class UserController {
  // Create new user
  static async create(req, res) {
    const { nome, telefone, email, senha } = req.body;

    try {
      const user = await prismaClient.usuario.create({
        data: { nome, telefone, email, senha },
      });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: "Error creating user", details: error.message });
    }
  }

  // Get all users
  static async getAll(req, res) {
    try {
      const users = await prismaClient.usuario.findMany();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: "Error retrieving users" });
    }
  }

  // Get user by ID (ID parsed to integer)
  static async getById(req, res) {
    const { id } = req.params;

    try {
      const user = await prismaClient.usuario.findUnique({
        where: { id: parseInt(id) }, // Ensure ID is integer
      });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: "Error retrieving user" });
    }
  }

  // Update user by ID
  static async update(req, res) {
    const { id } = req.params;
    const { nome, telefone, email, senha } = req.body;

    try {
      const user = await prismaClient.usuario.update({
        where: { id: parseInt(id) }, // Ensure ID is integer
        data: { nome, telefone, email, senha },
      });

      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: "Error updating user" });
    }
  }

  // Delete user by ID
  static async delete(req, res) {
    const { id } = req.params;

    try {
      await prismaClient.usuario.delete({
        where: { id: parseInt(id) }, // Ensure ID is integer
      });
      res.status(204).send(); // Success with no content
    } catch (error) {
      res.status(400).json({ error: "Error deleting user" });
    }
  }
}

export default UserController;
