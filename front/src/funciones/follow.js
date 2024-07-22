import { getFollowByID, getFollowByProperty, followUpdate } from '../api/followAPI.js'
import { getFollowerByID, getFollowerByProperty, followerUpdate } from '../api/followerAPI.js'




    // Funcion asociada al icono de follow para seguir al usuario o dejar de seguir en el caso de que ya se este siguiendo
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

    }



    export {
        followAdd
    }