import jwt from 'jsonwebtoken';

export default function(req, res, next) {

    try{
        const {authorization} = req.headers;

        if(!authorization){
            return res.status(401).json({ success: false, message: "Token não informado" });
        }

        // extract token from header
        const token = authorization.replace("Bearer ", "").trim();

        // verify token
        const {id} = jwt.verify(token, process.env.SECRET_JWT);

        // check if token is valid
        if(!id){
            return res.staus(401).json({ success: false, message: "Token inválido" });
        }

        // add id to request
        req.id = id;

        return next();

    }catch(error){
        return res.status(401).json({ success: false, message: "Token inválido", details: error.message });
    }

}