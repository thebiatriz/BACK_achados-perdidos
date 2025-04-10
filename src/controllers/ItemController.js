// controllers/ItemController.js
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

// Criar novo item
export const createItem = async (req, res) => {
  try {
    const {
      nome,
      data,
      rua,
      bairro,
      cidade,
      referencia,
      foto,
      status,
      usuarioId,
      categoriaId,
    } = req.body;

    const novoItem = await prisma.item.create({
      data: {
        nome,
        data: data ? new Date(data) : undefined,
        rua,
        bairro,
        cidade,
        referencia,
        foto,
        status,
        usuario_id: usuarioId,
      },
    });

    await prisma.item_categoria.create({
      data: {
        item_id: novoItem.id,
        categoria_id: categoriaId,
      },
    });

    res.status(201).json({ mensagem: 'Item criado com sucesso', item: novoItem });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao criar item' });
  }
};

// Listar todos os itens
export const getAllItems = async (req, res) => {
  try {
    const { status, categoriaId, busca } = req.query;

    const itens = await prisma.item.findMany({
      where: {
        status: status ? parseInt(status) : undefined,
        item_categoria: categoriaId
          ? {
              some: {
                categoria_id: parseInt(categoriaId),
              },
            }
          : undefined,
        OR: busca
          ? [
              { nome: { contains: busca, mode: 'insensitive' } },
              { cidade: { contains: busca, mode: 'insensitive' } },
              { bairro: { contains: busca, mode: 'insensitive' } },
              { rua: { contains: busca, mode: 'insensitive' } },
              { referencia: { contains: busca, mode: 'insensitive' } },
            ]
          : undefined,
      },
      include: {
        item_categoria: {
          include: {
            categoria: true,
          },
        },
        usuario: {
          select: { nome: true, telefone: true, email: true },
        },
      },
      orderBy: { id: 'desc' },
    });

    res.json(itens);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar itens' });
  }
};

// Buscar item por ID
export const getItemById = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await prisma.item.findUnique({
      where: { id: parseInt(id) },
      include: {
        item_categoria: {
          include: { categoria: true },
        },
        usuario: {
          select: { nome: true, telefone: true, email: true },
        },
      },
    });

    if (!item) return res.status(404).json({ erro: 'Item não encontrado' });

    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar item' });
  }
};

// Atualizar item pelo ID
export const updateItemByCodigo = async (req, res) => {
  try {
    const { codigo } = req.params;
    const dadosAtualizados = req.body;

    const item = await prisma.item.update({
      where: { codigo },
      data: {
        nome: dadosAtualizados.nome,
        data: dadosAtualizados.data ? new Date(dadosAtualizados.data) : undefined,
        rua: dadosAtualizados.rua,
        bairro: dadosAtualizados.bairro,
        cidade: dadosAtualizados.cidade,
        referencia: dadosAtualizados.referencia,
        foto: dadosAtualizados.foto,
        status: dadosAtualizados.status,
        usuario_id: dadosAtualizados.usuarioId,
      },
    });

    if (dadosAtualizados.categoriaId) {
      await prisma.item_categoria.deleteMany({ where: { item_id: item.id } });
      await prisma.item_categoria.create({
        data: {
          item_id: item.id,
          categoria_id: dadosAtualizados.categoriaId,
        },
      });
    }

    res.json({ mensagem: 'Item atualizado', item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao atualizar item' });
  }
};

// Remover item pelo código
export const deleteItemByCodigo = async (req, res) => {
  try {
    const { codigo } = req.params;

    const item = await prisma.item.findUnique({ where: { codigo } });

    if (!item) return res.status(404).json({ erro: 'Item não encontrado' });

    await prisma.item_categoria.deleteMany({ where: { item_id: item.id } });
    await prisma.item.delete({ where: { codigo } });

    res.json({ mensagem: 'Item deletado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao deletar item' });
  }
};
