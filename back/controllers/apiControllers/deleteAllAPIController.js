import userController from "../controllers/userController.js"
import followController from '../controllers/followController.js'
import followerController from '../controllers/followerController.js'
import inboxController from '../controllers/inboxController.js'
import notificationController from '../controllers/notificationController.js'
import notiFollowController from '../controllers/notiFollowController.js'
import notiInboxController from '../controllers/notiInboxController.js'
import postController from '../controllers/postController.js'
import responseController from '../controllers/responseController.js'


import { sendEmail } from '../../config/emailService.js'
import sha256 from 'js-sha256'




// Funcion para eliminar un usuario y todo lo relacionado con ese usuario
// Ademas no se elimina del todo los datos para que el email y el username no pueda volver a ser usado

const deleteAllUser = async(req,res)=>{
    const id = req.params.id
    const arrayData = req.body

    // Traer datos del usuario por ID
    const userDataGet = await userController.getById(id)

    // Condicional para comparar contraseñas y si coincide entonces eliminar todo lo relacionado con este usuario de todas las tablas
    // Salvo la de Usuario que queda informacion para evitar que se pueda usar tanto el nombre como el email para un usuario nuevo
    if (userDataGet.password === arrayData.pass) {
        const getFollow = await followController.getByProperty('userID', id)
        //const removeFollow = await followController.remove(getFollow[0]._id)

        const getFollower = await followerController.getByProperty('userID', id)
        //const removeFollower = await followerController.remove(getFollower[0]._id)
        
        const getInboxID1 = await inboxController.getByProperty('userID1', id)
        const mapInboxID1 = getInboxID1.map( async (data) => {
           //const removeInboxID1 = await inboxController.remove(data._id)
        })

        const getInboxID2 = await inboxController.getByProperty('userID2', id)
        const mapInboxID2 = getInboxID2.map( async (data) => {
            //const removeInboxID2 = await inboxController.remove(data._id)
        })

        const getNotification1 = await notificationController.getByProperty('username', userDataGet.username)
        const mapNotification1 = getNotification1.map( async (data) => {
            //const removeNotification1 = await notificationController.remove(data._id)
        })

        const getNotification2 = await notificationController.getByProperty('userPrincipalID', id)
        const mapNotification2 = getNotification2.map( async (data) => {
            //const removeNotification2 = await notificationController.remove(data._id)
        })

        const getNotiFollowID1 = await notiFollowController.getByProperty('followID', id)
        const mapNotiFollowID1 = getNotiFollowID1.map( async (data) => {
           //const removeNotiFollowID1 = await notiFollowController.remove(data._id)
        })

        const getNotiFollowID2 = await notiFollowController.getByProperty('followerID', id)
        const mapNotiFollowID2 = getNotiFollowID2.map( async (data) => {
            //const removeNotiFollowID2 = await notiFollowController.remove(data._id)
        })

        const getNotiInboxID1 = await notiInboxController.getByProperty('userSend', id)
        const mapNotiInboxID1 = getNotiInboxID1.map( async (data) => {
           //const removeNotiInboxID1 = await notiInboxController.remove(data._id)
        })

        const getNotiInboxID2 = await notiInboxController.getByProperty('userReceived', id)
        const mapNotiInboxID2 = getNotiInboxID2.map( async (data) => {
            //const removeNotiInboxID2 = await notiInboxController.remove(data._id)
        })

        const getPost = await postController.getByProperty('userID', id)
        const mapPost = getPost.map( async (data) => {
            const getResponseByPost = await responseController.getByProperty('postID', data._id)
            const mapResponseByPost = getResponseByPost.map( async (data) => {
                //const removeResponseByPost = await responseController.remove(data._id)
            })
            //const removePost = await postController.remove(data._id)
        })

        const getResponseByUser = await responseController.getByProperty('username', userDataGet.username)
        const mapGetResponseByUser = getResponseByUser.map( async (data) => {
            //const removeResponseByUser = await responseController.remove(data._id)
        })

        const arrayUser = {'del': true}
        //const sendUpdateUser = await userController.update(id, arrayUser)

        res.json({data:true})

    } else {
        res.json({data:false})
    }
}



export {
    deleteAllUser
}