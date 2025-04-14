// controllers/ItemController.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create new item
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

 return res.status(201).json({ success: true, message: "Item criado com sucesso", data: novoItem });    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: "Error ao criar item", details: error.message });
    }
};

// Get all items
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

        return res.status(200).json({ success: true, message: "Itens encontrados", data: itens });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: "Error ao buscar itens", details: error.message });
    }
};

// Get item by ID
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

        if (!item) return res.status(404).json({ success: false, message: "Item não encontrado" });

        return res.status(200).json({ success: true, message: "Itens encontrados", data: item });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: "Erro ao buscar item", details: error.message });
    }
};

// Update item by ID
export const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const dadosAtualizados = req.body;

        const item = await prisma.item.update({
            where: { id: parseInt(id) },
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
            await prisma.item_categoria.deleteMany({
                where: { item_id: item.id }
            });
            await prisma.item_categoria.create({
                data: {
                    item_id: item.id,
                    categoria_id: dadosAtualizados.categoriaId,
                },
            });
        }

        return res.status(200).json({ success: true, message: "Item atualizado com sucesso", data: item });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: "Erro ao atualizar o item", details: error.message });
    }
};

// Delete item by ID
export const deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await prisma.item.findUnique({
            where: { id: parseInt(id) }
        });

        if (!item) return res.status(404).json({ success: false, message: "Item não encontrado" });

        await prisma.item_categoria.deleteMany({
            where: { item_id: item.id }
        });

        await prisma.item.delete({ where: { id: item.id } });

        return res.status(200).json({ success: true, message: "Item deletado com sucesso", data: item });
    } catch (error) {
        console.error(error);
        return res.status(400).json({ success: false, message: "Error ao deletar item", details: error.message });
    }
};
