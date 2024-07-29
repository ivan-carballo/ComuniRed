import express from "express"
import cors from "cors"
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import userController from "../controllers/userController.js"
import postController from '../controllers/postController.js'
import responseController from '../controllers/responseController.js'
import notiFollowController from '../controllers/notiFollowController.js'
import { sendEmail } from '../../config/emailService.js'
import sha256 from 'js-sha256'

dotenv.config()
const app = express()
app.use(cors())



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

    const userID = await getById(tokenPayload.userID)

    const arrayUser = {'id': userID._id,
                        'username': userID.username,
                        'img': userID.img
    }

    res.json({data:arrayUser});
    console.log(arrayUser.username)
}



const getByProperty=async(req,res)=>{
    const {property,value}=req.body;
    const propiedad = await userController.getByProperty(property,value);
    res.json({data:propiedad})
}



// Al crear un nuevo usuario, tambien hay que crear un email de verificacion
const create = async(req,res)=>{
    const propiedad = await userController.create(req.body);
    sendEmail(req.body.email, req.body.username, propiedad._id)
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
    const id = req.params.id;
    const propiedad = await userController.update(id,req.body);
    res.json({data:propiedad})
}





// Funcion para que cuando un usuario se cambie la foto de perfil, se cambie tambien en los posts y respuestas que lo necesiten
const updateIMG = async(req,res)=>{
    const id = req.params.id;
    const propiedad = await userController.update(id,req.body);

    // Cambiar en Post
    const updatePost = await postController.getByProperty('userID', id)
    if (updatePost != undefined && updatePost.length > 0) {
        const updatePostMap = updatePost.map( async (data) => {
            const newArrayPost = {'userIMG': req.body.img}
            const newUpdatePost = await postController.update(data._id, newArrayPost)
        })
    }

    // Cambiar en respuestas
    const updateResponse = await responseController.getByProperty('userID', id)
    if (updateResponse != undefined && updateResponse.length > 0) {
        const updateResponseMap = updateResponse.map( async (data) => {
            const newArrayResponse = {'userIMG': req.body.img}
            const newUpdateResponse = await responseController.update(data._id, newArrayResponse)
        })
    }

    // Cambiar en notiFollows
    const updateNotiFollow = await notiFollowController.getByProperty('followID', id)
    if (updateNotiFollow != undefined && updateNotiFollow.length > 0) {
        const updateNotiFollowMap = updateNotiFollow.map( async (data) => {
            const newArrayNotiFollow = {'img': req.body.img}
            const newUpdateNotiFollow = await notiFollowController.update(data._id, newArrayNotiFollow)
        })
    }


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
    updateIMG,
    remove
}