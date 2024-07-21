import { postDelete } from '../api/postAPI.js'
import { getResponseByProperty, responseDelete } from "../api/responseAPI.js"


// Funcion para poder eliminar un post junto con todas las respuestas asociadas
// Se hace externo para reutilizarse
async function postRemove(postID) {

    let getResponseByPost = await getResponseByProperty('postID', postID)
    getResponseByPost = await getResponseByPost.data


    for (let i = 0; getResponseByPost.length > i; i++) {
        const responseID = await getResponseByPost[i]._id
        const responseRemove = await responseDelete(responseID)
    }


    const postRemove = await postDelete(postID)

}


export {
    postRemove
}