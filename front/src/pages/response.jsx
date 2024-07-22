import React from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'
import { Navbar } from "../componentes/navbar";
import { ResponseForm } from "../componentes/responseForm";
import { useParams } from "react-router-dom";
import { getpostByID } from "../api/postAPI";
import { getresponseByID, getResponseByProperty, responseDelete } from "../api/responseAPI";
import { getUserByID } from "../api/userAPI";
import { getNotificationByProperty, getNotificationByID, notificationDelete } from "../api/notificationAPI";
import { useNavigate } from "react-router-dom";

import '../saas/response/response.scss'


// Pagina para poder ver el detalle de las respuestas de un post concreto
function Response() {
    const navigate = useNavigate()

    const { id } = useParams()
    const userCurrentID = Cookies.get('id')

    const [dataResponse, setDataResponse] = useState()
    const [reboot, setReboot] = useState(true)

    const [username, setUsername] = useState()
    const [dateString, setDateString] = useState()
    const [postPrincipal, setPostPrincipal] = useState()
    const [userIMG, setUserIMG] = useState()
    const [postIMG, setPostIMG] = useState()
    const [userID, setUserID] = useState()
    

    // useEffect para mostrar el post principal con la id que se pasa en la URL y todas las respuestas asociadas
    // Se usa un metodo map para mostrar todo en el return
    useEffect(() => {
        if (reboot) {
            getPost(id)
            async function getPost(id) {
                const getPostPrincipal = await getpostByID(id)
                const getUserPrincipal = await getUserByID(getPostPrincipal.data.userID)
                setUsername(getPostPrincipal.data.username)
                setDateString(getPostPrincipal.data.dateString)
                setPostPrincipal(getPostPrincipal.data.post)
                setPostIMG(getPostPrincipal.data.img)
                setUserID(getPostPrincipal.data.userID)

                setUserIMG(getUserPrincipal.data.img)

                const userCurrentUsername = await getUserByID(userCurrentID)

                const getResponseChildren = await getResponseByProperty('postID', id)
                
                const getResponseChildrenMap = await getResponseChildren.data.reverse().map((data) =>
                    <div key={data._id} id="getResponse-div">
                        <p id='getResponse-div-username' onClick={async () => {navigate(`/user/${data.userID}`)}}>{data.username}</p>
                        <p id='getResponse-div-date'>{data.dateString}</p>
                        <p id='getResponse-div-post'>{data.post}</p>
                        <img id='getResponse-div-img' src={data.img} />
                        {userCurrentUsername.data.username === data.username ? <div id="getResponse-div-button"> <input type="button" value="Eliminar respuesta" id={data._id} onClick={sweetAlert} /> </div> : <></>}
                    </div>
                )
                setDataResponse(getResponseChildrenMap)

            }
        }
        setReboot(false)
    }, [reboot])




    // Funcion intermedia para desplegar un aviso al usuario antes de hacer la eliminacion por si es un error o se arrepiente
    async function sweetAlert(e) {
        Swal.fire({
            title: 'Confirmar eliminacion de respuesta',
            text: "Cuando se elimina una respuesta no se puede revertir.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, elimina todo',
            cancelButtonText: 'No, cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                responseDeleteByUser(e);
                Swal.fire(
                    '¡Hecho!',
                    'Tu acción ha sido completada.',
                    'success'
                );
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Cancelado',
                    'Tu acción ha sido cancelada :)',
                    'error'
                )
            }
        })
    }
    



    // Funcion para que un usuario pueda eliminar una respuesta que el mismo ha escrito
    // Ademas de la propia respuesta, tambien se elimina la notificacion en el caso de que aun exista
    async function responseDeleteByUser(e) {
        const responseID = e.target.id

        const getNotificationID = await getNotificationByProperty('responseID', responseID)

        if (getNotificationID.data.length > 0) {
            const notificationRemove = await notificationDelete(getNotificationID.data[0]._id)
        }

        const responseRemove = await responseDelete(responseID)
        

        setReboot(true)
    }





    return (

        <>
            <Navbar />

            <div id="response-body">

                <div id="response-responseForm">
                    <ResponseForm id={id} />
                </div>

                <div id="response-postPrincipal">

                    <div id="response-postPrincipal-header">
                        <div id="response-postPrincipal-header-img">
                            <img id='postPrincipal-userIMG' src={userIMG} />
                        </div>
                        <div id="response-postPrincipal-header-userData">
                            <p id='userData-username' onClick={async () => {navigate(`/user/${userID}`)}}>{username}</p>
                            <p>{dateString}</p>
                        </div>                     
                    </div>

                    <p id='response-postPrincipal-post'>{postPrincipal}</p>
                    <img id='response-postPrincipal-img' src={postIMG} />
                </div>


                <div id="response-responses">
                    <div id="response-border">
                        {dataResponse}
                    </div>
                </div>

            </div>


        </>

    )
}


export {
    Response
}