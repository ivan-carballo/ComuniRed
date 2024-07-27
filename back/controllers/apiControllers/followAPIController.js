import express from "express";
import cors from "cors"
import dotenv from 'dotenv';
import followController from "../controllers/followController.js";

dotenv.config();
const app = express();
app.use(cors())


const getAll = async(req,res)=>{
    const propiedad = await followController.getAll();
    res.json({data:propiedad})
}

const getById = async (req,res) =>{
    const id = req.params.id
    const propiedad = await followController.getById(id);
    res.json({data:propiedad});
}

const getByProperty=async(req,res)=>{
    const {property,value}=req.body;
    const propiedad = await followController.getByProperty(property,value);
    res.json({data:propiedad})
}

const create = async(req,res)=>{
    const propiedad = await followController.create(req.body);
    res.json({data:propiedad})
}


const update = async(req,res)=>{
    const id = req.params.id;
    const propiedad = await followController.update(id,req.body);
    res.json({data:propiedad})
}

const remove = async(req,res)=>{
    const id = req.params.id;
    const propiedad = await followController.remove(id);
    res.json({data:propiedad})
}

export default{
    getAll,
    getById,
    getByProperty,
    create,
    update,
    remove
}