import express from "express";
import cors from "cors"
import dotenv from 'dotenv';
import inboxController from "../controllers/inboxController.js";

dotenv.config();
const app = express();
app.use(cors())


const getAll = async(req,res)=>{
    const propiedad = await inboxController.getAll();
    res.json({data:propiedad})
}

const getById = async (req,res) =>{
    const id = req.params.id
    const propiedad = await inboxController.getById(id);
    res.json({data:propiedad});
}

const getByProperty=async(req,res)=>{
    const {property,value}=req.body;
    const propiedad = await inboxController.getByProperty(property,value);
    res.json({data:propiedad})
}

const create = async(req,res)=>{
    const propiedad = await inboxController.create(req.body);
    res.json({data:propiedad})
}


const update = async(req,res)=>{
    const id = eq.params.id;
    const propiedad = await inboxController.update(id,req.body);
    res.json({data:propiedad})
}

const remove = async(req,res)=>{
    const id = req.params.id;
    const propiedad = await inboxController.remove(id);
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