import { prismaClient } from '../database/PrismaClient.js';

class UserController {
  static async createUser(req, res) {
    const { nome, telefone, email } = req.body;

    try {
      const user = await prismaClient.usuario.create({
        data: { nome, telefone, email },
      });
      res.status(201).json({ success: true, message: "Usuário criado com sucesso", data: user });
    } catch (error) {
      res.status(400).json({ success: false, message: "Erro ao criar usuário", details: error.message });
    }
  }

  static async getAllUsers(req, res) {
    try {
      const users = await prismaClient.usuario.findMany();
      res.status(200).json({ success: true, message: "Usuários encontrados", data: users });
    } catch (error) {
      res.status(500).json({ success: false, message: "Erro ao buscar usuários", details: error.message });
    }
  }

  static async getUserById(req, res) {
    const { id } = req.params;

    try {
      const user = await prismaClient.usuario.findUnique({
        where: { id: parseInt(id) },
      });

      if (!user) {
        return res.status(404).json({ success: false, message: "Usuário não encontrado" });
      }

      res.status(200).json({ success: true, message: "Usuário encontrado", data: user });
    } catch (error) {
      res.status(500).json({ success: false, message: "Erro ao buscar usuário", details: error.message });
    }
  }

  static async getUserByEmail(req, res) {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email não fornecido" });
    }

    try {
      const user = await prismaClient.usuario.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(404).json({ success: false, message: "Usuário não encontrado" });
      }

      res.status(200).json({ success: true, message: "Usuário encontrado", data: user });
    } catch (error) {
      res.status(500).json({ success: false, message: "Erro ao buscar usuário", details: error.message });
    }
  }


  static async updateUser(req, res) {
    const { id } = req.params;
    const { nome, telefone, email } = req.body;

    try {
      const user = await prismaClient.usuario.update({
        where: { id: parseInt(id) },
        data: { nome, telefone, email },
      });

      res.status(200).json({ success: true, message: "Usuário atualizado", data: user });
    } catch (error) {
      res.status(400).json({ success: false, message: "Erro ao atualizar usuário", details: error.message });
    }
  }

  static async deleteUser(req, res) {
    const { id } = req.params;

    try {
      const user = await prismaClient.usuario.findUnique({
        where: { id: parseInt(id) },
      });

      if (!user) {
        return res.status(404).json({ success: false, message: "Usuário não encontrado" });
      }

      await prismaClient.usuario.delete({
        where: { id: parseInt(id) },
      });

      res.status(204).send();
    } catch (error) {
      res.status(400).json({ success: false, message: "Erro ao deletar usuário", details: error.message });
    }
  }
}

export default UserController;
