import express from "express";
import cors from "cors"
import dotenv from 'dotenv';
import notiInboxController from "../controllers/notiInboxController.js";

dotenv.config();
const app = express();
app.use(cors())


const getAll = async(req,res)=>{
    const propiedad = await notiInboxController.getAll();
    res.json({data:propiedad})
}

const getById = async (req,res) =>{
    const id = req.params.id
    const propiedad = await notiInboxController.getById(id);
    res.json({data:propiedad});
}

const getByProperty=async(req,res)=>{
    const {property,value}=req.body;
    const propiedad = await notiInboxController.getByProperty(property,value);
    res.json({data:propiedad})
}

const create = async(req,res)=>{
    const propiedad = await notiInboxController.create(req.body);
    res.json({data:propiedad})
}


const update = async(req,res)=>{
    const id = req.params.id;
    const propiedad = await notiInboxController.update(id,req.body);
    res.json({data:propiedad})
}

const remove = async(req,res)=>{
    const id = req.params.id;
    const propiedad = await notiInboxController.remove(id);
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