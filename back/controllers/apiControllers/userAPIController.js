import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import userController from "../controllers/userController.js";

dotenv.config();


const getAll = async(req,res)=>{
    const propiedad = await userController.getAll();
    res.json({data:propiedad})
}

const getById = async (req,res) =>{
    const id = req.params.id
    const propiedad = await userController.getById(id);
    res.json({data:propiedad});
}


const getByToken = async (req,res) =>{
    const token = await req.body.token
    let arrayToken = token.split(",");
    arrayToken = token.split(".");
    let tokenPayload = JSON.parse(atob(arrayToken[1]));
    //res.json({data:tokenPayload});
}

const getByProperty=async(req,res)=>{
    const {property,value}=req.query;
    const propiedad = await userController.getByProperty(property,value);
    res.json({data:propiedad})
}

const create = async(req,res)=>{
    const propiedad = await userController.create(req.body);
    res.json({data:propiedad})
}

const login = async(req,res)=> {
    const datos = req.body;
    
    const userFind = await userController.getByProperty('email', datos.email)

    const payload = {'userID': userFind[0]._id, 'username':userFind[0].username, 'pass':userFind[0].password}
    const token = jwt.sign(payload, 'JWT_KEY', {expiresIn: '1m'})
    res.json({data:token});
}

const update = async(req,res)=>{
    const id = eq.params.id;
    const propiedad = await userController.update(id,req.body);
    res.json({data:propiedad})
}

const remove = async(req,res)=>{
    const id = req.params.id;
    const propiedad = await userController.remove(id);
    res.json({data:propiedad})
}

export default{
    getAll,
    getById,
    getByToken,
    getByProperty,
    create,
    login,
    update,
    remove
}