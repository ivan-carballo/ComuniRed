import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'
import { getUserByID } from "../../api/userAPI";
import { getFollowByProperty, followUpdate } from '../../api/followAPI'
import { getFollowerByProperty, followerUpdate } from "../../api/followerAPI";
import Swal from "sweetalert2";

import '../../saas/perfil/userPost.scss'


function AllFollowByUser() {
    const navigate = useNavigate()
    const userCurrentID = Cookies.get('id')

    const [reboot, setReboot] = useState(true)
    const [buttonFollow, setButtonFollow] = useState('active')
    const [buttonFollower, setButtonFollower] = useState()
    const [show, setShow] = useState()
    const [showFollow, setShowFollow] = useState()
    const [showFollower, setShowFollower] = useState()



    // useEffect para traer los usuarios que me siguen y a los que sigo
    useEffect(() => {
        if (reboot) {

            getDataFollow()
            async function getDataFollow() {
                let allUserFollow = []
                let allUserFollower = []

                // Obtener los arrays de ambas tablas
                const getFollow = await getFollowByProperty('userID', userCurrentID)
                const getFollower = await getFollowerByProperty('userID', userCurrentID)

                const getArrayFollow = await getFollow.data[0].follow.reverse()
                const getArrayFollower = await getFollower.data[0].follower.reverse()
                
                
                // Hacer dos metodos map para sacar la informacion de los usuarios desde los IDs
                const followDataUser = await Promise.all( getArrayFollow.map( async (data) => {
                    const getUserFollow = await getUserByID(data)
                    allUserFollow.push(getUserFollow.data)
                }))

                const followerDataUser = await Promise.all( getArrayFollower.map( async (data) => {
                    const getUserFollower = await getUserByID(data)
                    allUserFollower.push(getUserFollower.data)
                }))


                // Hacer dos metodos map para meter en useState y sacarlo en pantalla dentro del return
                const followMap = allUserFollow.map((data) => 
                    <div id="follow-div" key={data._id}>
                        <img src={data.img} />
                        <p onClick={async () => { navigate(`/user/${data._id}`) }}>{data.username}</p>
                        <input type="button" value="Dejar de seguir" id={data._id}  />
                    </div>
                )

                const followerMap = allUserFollower.map((data) => 
                    <div id="follow-div" key={data._id}>
                        <img src={data.img} />
                        <p onClick={async () => { navigate(`/user/${data._id}`) }}>{data.username}</p>
                        <input type="button" value="Seguir" id={data._id} />
                    </div>
                )

                setShowFollow(followMap)
                setShowFollower(followerMap)
                setShow(followMap)

                }
            setReboot(false)
        }
    }, [reboot])




    // Funcion para controlar los estilos de los botones y lo que se muestra en pantalla, follow o followers
    async function buttonShow(e) {
        const buttonValue = e.target.value

        if (buttonValue === 'Siguiendo') {
            setShow(showFollow)
            setButtonFollow('active')
            setButtonFollower('')
        } else if (buttonValue === 'Seguidores') {
            setShow(showFollower)
            setButtonFollow('')
            setButtonFollower('active')
        }
    }




    return (
        <>
        
            <div id="followByUser-body">

                <div id="followByUser-buttons">
                    <input type="button" value="Siguiendo" id={buttonFollow} onClick={buttonShow} />
                    <input type="button" value="Seguidores" id={buttonFollower} onClick={buttonShow} />
                </div>

                <div id="followByUser-data">
                    {show}
                </div>
               
            </div>
        
        </>
    )
}



export {
    AllFollowByUser
}