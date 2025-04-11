import { prismaClient } from '../database/PrismaClient.js';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

class LoginController{
    
    static async login(req, res) {
        const {email, senha} = req.body;

        try{
            // search user by email
            const user = await prismaClient.usuario.findUnique({
                where: {email}
            });

            // check if user exists
            if(!user){
                return res.status(404).json({ success: false, message: "Usuário não encontrado" });
            }

            // check if password is correct
            // compare password with bcrypt
            const passEncryptValide = bcrypt.compareSync(senha, user.senha);

            if(!passEncryptValide){
                return res.status(401).json({ success: false, message: "Senha inválida" });
            }

            // token content
            const payload = {id: user.id, nome: user.nome};

            // create token jwt
            const token = jwt.sign(payload, process.env.SECRET_JWT, {expiresIn: '3h'});

            // return token
            return res.status(200).json({ success: true, message: "Login realizado com sucesso", data: payload, token: token });
        
        }catch(error){
            return res.status(500).json({ success: false, message: "Erro ao fazer login", details: error.message });
        }
    }
}

export default LoginController;