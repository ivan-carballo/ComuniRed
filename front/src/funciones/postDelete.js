import { postDelete } from '../api/postAPI.js'
import { deleteFile } from './deleteImage.js'
import { getResponseByProperty, responseDelete } from "../api/responseAPI.js"
import { getNotificationByProperty, notificationDelete } from '../api/notificationAPI.js'
import { getpostByID } from '../api/postAPI.js'


// Funcion para poder eliminar un post junto con todas las respuestas asociadas
// Se hace externo para reutilizarse
async function postRemove(postID) {

    const getResponseByPost = await getResponseByProperty('postID', postID)
    const notificationByPost = await getNotificationByProperty('postPrincipalID', postID)
    const postByID = await getpostByID(postID)


    const responseMap = getResponseByPost.data.map( async (data) => {
        // Eliminar las imagenes del backend
        if (data.img.length > 0) {
            const filename = data.img.split('/').pop()
            const fileDelete = await deleteFile(filename)
        }
        const responseRemoveLoop = await responseDelete(data._id)
    })


    // Eliminar las notificaciones asociadas
    const notificationMap = await notificationByPost.data.map( async (data) => {
        const notificationRemoveLoop = await notificationDelete(data._id)
    })


    // Eliminar imagen del backend para el post
    if (postByID.data.img != undefined && postByID.data.img.length > 0) {
        const filename = postByID.data.img.split('/').pop()
        const data = await deleteFile(filename)
    }

    const postRemove = await postDelete(postID)

}


export {
    postRemove
}