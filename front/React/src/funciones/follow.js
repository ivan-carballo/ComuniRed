import { getFollowByID, getFollowByProperty, followUpdate } from '../api/followAPI.js'
import { getFollowerByID, getFollowerByProperty, followerUpdate } from '../api/followerAPI.js'
import { getNotiFollowByProperty, notiFollowCreate, notiFollowDelete } from '../api/notiFollowAPI.js'
import { getUserByID } from '../api/userAPI.js'
import { dateFormat } from '../funciones/fecha.js'



    // Funcion asociada al icono de follow para seguir al usuario o dejar de seguir en el caso de que ya se este siguiendo
    // Se crea tambien una notificacion para avisar del nuevo seguidor (O se elimina en el caso de que deje de seguir)
    async function followAdd(userCurrentID, id, follow) {
        // Buscar la informacion de las tablas follow y followers para obtener los arrays necesarios
        const getFollowID = await getFollowByProperty('userID', userCurrentID)
        const getFollowArray = await getFollowByID(getFollowID.data[0]._id)
        let followArray = getFollowArray.data.follow

        const getFollowerID = await getFollowerByProperty('userID', id)
        const getFollowerArray = await getFollowerByID(getFollowerID.data[0]._id)
        let followerArray = getFollowerArray.data.follower

        // Ternario para quitar o poner el follow dependiendo del estado
        follow ? followArray=followArray.filter(data => data !== id) : followArray.push(id)
        follow ? followerArray=followerArray.filter(data => data !== userCurrentID) : followerArray.push(userCurrentID)

        // Hacer el update con la nueva situacion del follow
        const newFollowArray = {'follow': followArray}
        const sendUpdateFollow = await followUpdate(getFollowID.data[0]._id, newFollowArray)  
        
        const newFollowerArray = {'follower': followerArray}
        const sendUpdateFollower = await followerUpdate(getFollowerID.data[0]._id, newFollowerArray) 

        // Obtener los datos para crear la notificacion desde getUserByID
        const getUserData = await getUserByID(userCurrentID)

        const notificacionArray = {'followID': userCurrentID,
                                    'followerID': id,
                                    'username': await getUserData.data.username,
                                    'dateString': await dateFormat(Date.now()),
                                    'img': await getUserData.data.img}

        // Comprobar si existe una notificacion previa
        const notificacionValidate = await getNotiFollowByProperty('followID', userCurrentID)
        const notificacionSome = await notificacionValidate.data.some(data => data.followerID == id)

        // Condicional para incluir o borrar dependiendo del argumento "follow"
        if (follow && notificacionSome) {
            // Eliminar la notificacion
            const notificacionFilter = await notificacionValidate.data.filter(data => data.followerID == id)
            const notificacionRemove = await notiFollowDelete(notificacionFilter[0]._id)
        } else if (!follow && !notificacionSome) {
            // Crear la notificacion
            const notificacionNew = await notiFollowCreate(notificacionArray)
        }

    }



    export {
        followAdd
    }