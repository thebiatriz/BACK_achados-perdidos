import {prismaClient} from "../database/PrismaClient.js";

export default class CategoryController {

    // create a new category
    static async create(req, res){
        const{ nome } = req.body;
        
        try{
            const category = await prismaClient.categoria.create({
                data: { nome },
            });

            res.status(201).json(category);
        
        }catch(error){
            res.status(400).json({error: "Error creating category", details: error.message});
        }
    }


    // list all categories
    static async findAll(req, res){
        try{
            const categories = await prismaClient.categoria.findMany();
            return res.status(200).json(categories);
        
        }catch(error){
            res.status(500).json({error: "Error to search categories", details:error.message});
        }
    }


    //list category by id
    static async findById(req, res){
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
                return res.status(404).json({error: "Category Not Found"});
            }

            return res.status(200).json(category);
        
        }catch(error){
            res.status(500).json({error: "Error to find category", details: error.message});
        }
    }



    // delete category by id
    static async delete(req, res){
        const {id} = req.params;

        try{
            // first check if the category exists
            const category = await prismaClient.categoria.findFirst({
                where: {id: parseInt(id)}
            })
            if(!category){
                return res.status(404).json({error: "Category Not Found"});
            }

            // check if the category has items
            const items = await prismaClient.item_categoria.findMany({
                where: {categoria_id: parseInt(id)}
            })

            if(items.length > 0){
                return res.status(400).json({error: "Category has items, delete them first"});
            }

            // delete the category
            await prismaClient.categoria.delete({
                where: {id: parseInt(id)}
            })
            return res.status(200).json({message: "Category deleted successfully"});

        }catch(error){
            res.status(400).json({error: "Error deleting category", details: error.message});
        }
    }
    
    


}