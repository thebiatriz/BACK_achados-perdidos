import {prismaClient} from "../database/PrismaClient.js";

export default class CategoryController {

    // create a new category
    static async createCategory(req, res){
        const{ nome } = req.body;
        
        try{
            const category = await prismaClient.categoria.create({
                data: { nome },
            });

            res.status(201).json({sucess: true, message: "Categoria criada com sucesso", data: category});
        
        }catch(error){
            res.status(400).json({sucess: false, error: "Erro ao criar categoria", details: error.message});
        }
    }


    // list all categories
    static async findAllCategory(req, res){
        try{
            const categories = await prismaClient.categoria.findMany();
            return res.status(200).json({sucess: true, message: "Categorias encontradas", data: categories});
        
        }catch(error){
            res.status(500).json({sucess: false, error: "Erro ao buscar categorias", details: error.message});
        }
    }


    // update category by id
    static async updatedCategory(req, res){
        const {id} = req.params;
        const {nome} = req.body;

        try{
            // check if the category exists
            const category = await prismaClient.categoria.findFirst({
                where: {id: parseInt(id)}
            })

            if(!category){
                return res.status(404).json({sucess: false, message: "Categoria não encontrada"});
            }

            // update the category
            const updatedCategory = await prismaClient.categoria.update({
                where: {id: parseInt(id)},
                data: {nome}
            })

            return res.status(200).json({sucess: true, message: "Categoria atualizada com sucesso", data: updatedCategory});
        
        }catch(error){
            res.status(500).json({sucess: false, error: "Erro ao atualizar categoria", details: error.message});
        }

    }


    //list category by id
    static async findCategoryById(req, res){
        const {id} = req.params;

        try{
            // search for the category by id and include the items
            // and the count of items
            const category = await prismaClient.categoria.findFirst({
                where: {id: parseInt(id)},
                include: {
                    item_categoria: true,
                    _count:{
                        select: {item_categoria: true}
                    }
                }
            })

            if(!category){
                return res.status(404).json({sucess: false, message: "Categoria não encontrada"});
            }

            return res.status(200).json({sucess: true, message: "Categoria encontrada", data: category});
        
        }catch(error){
            res.status(500).json({sucess: false, error: "Erro ao buscar categoria", details: error.message});
        }
    }



    // delete category by id
    static async deleteCategory(req, res){
        const {id} = req.params;

        try{
            // first check if the category exists
            const category = await prismaClient.categoria.findFirst({
                where: {id: parseInt(id)}
            })
            if(!category){
                return res.status(404).json({sucess: false, message: "Categoria não encontrada"});
            }

            // check if the category has items
            const items = await prismaClient.item_categoria.findMany({
                where: {categoria_id: parseInt(id)}
            })

            if(items.length > 0){
                return res.status(400).json({sucess: false, message: "Categoria não pode ser deletada pois possui itens"});
            }

            // delete the category
            await prismaClient.categoria.delete({
                where: {id: parseInt(id)}
            })
            return res.status(200).json({sucess: true, message: "Categoria deletada com sucesso", data: category});

        }catch(error){
            res.status(400).json({sucess: false, error: "Erro ao deletar categoria", details: error.message});
        }
    }
    
    


}