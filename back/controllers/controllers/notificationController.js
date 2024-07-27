import express from "express";
import cors from "cors"

const app = express();
app.use(cors())

import notificationModel from "../../models/notificationModel.js";


const getAll = async(postId=null)=> {
    try {
        const datos = await notificationModel.find();
        return datos;
    } catch (error) {
        console.error(error);
        return [];
    }
}

const getById = async(id) =>{
    try {
        const datos = await notificationModel.findById(id);
        return datos;
    } catch (error) {
        console.error(error);
        return null;
        
    }
}

const getByProperty = async(property,value) =>{
    try {
        const datos = await notificationModel.find({[property]:value})
        return datos;
    } catch (error) {
        return null;
    }
}

const create = async(data) =>{
    try {
        const datos = await notificationModel.create(data);
        return datos;
    } catch (error) {
        console.error(error); 
        return null;  
    }
}

const update = async(id,data) =>{
    try {
        const olddatos = await notificationModel.findByIdAndUpdate(id,data);
        const datos = await notificationModel.findById(id);
        console.log("datos",datos);
        return datos;
    } catch (error) {
        console.error(error);
        return null;
    }
}

const remove = async(id) =>{
    try {
        const datos = await notificationModel.findByIdAndDelete(id);
        return datos;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const functions = {
    getAll,
    getById,
    getByProperty,
    create,
    update,
    remove
}

export default functions;