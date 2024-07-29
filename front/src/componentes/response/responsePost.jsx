import React from "react";
import { useState, useEffect, useContext } from "react";
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'
import { useParams } from "react-router-dom";
import { getpostByID } from "../../api/postAPI";
import { getresponseByID, getResponseByProperty, responseDelete } from "../../api/responseAPI";
import { getUserByID } from "../../api/userAPI";
import { getNotificationByProperty, notificationDelete } from "../../api/notificationAPI";
import { useNavigate } from "react-router-dom";
import { ContextoCompartido } from "../../funciones/context";
import { deleteFile } from '../../funciones/deleteImage'

import '../../saas/response/response.scss'





// Pagina para poder ver el detalle de las respuestas de un post concreto
function ResponsePost() {
    const navigate = useNavigate()

    const { id } = useParams()
    const userCurrentID = Cookies.get('id')

    const { valorResponse } = useContext(ContextoCompartido);
    const { setValorResponse } = useContext(ContextoCompartido);

    const [dataResponse, setDataResponse] = useState()
    const [reboot, setReboot] = useState(true)
  
    const [username, setUsername] = useState()
    const [dateString, setDateString] = useState()
    const [postPrincipal, setPostPrincipal] = useState()
    const [postPrincipalLength, setPostPrincipalLength] = useState(false)
    const [userIMG, setUserIMG] = useState()
    const [postIMG, setPostIMG] = useState()
    const [postIMGLength, setPostIMGLength] = useState(false)
    const [userID, setUserID] = useState()






    // useEffect para mostrar el post principal con la id que se pasa en la URL y todas las respuestas asociadas
    // Se usa un metodo map para mostrar todo en el return
    useEffect(() => {
        if (reboot || valorResponse) {
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

                getPostPrincipal.data.post.length > 0 ? setPostPrincipalLength(true) : setPostPrincipalLength(false)
                getPostPrincipal.data.img.length > 0 ? setPostIMGLength(true) : setPostIMGLength(false)


                const userCurrentUsername = await getUserByID(userCurrentID)

                const getResponseChildren = await getResponseByProperty('postID', id)
                
                const getResponseChildrenMap = await getResponseChildren.data.reverse().map((data) =>
                    <div key={data._id} id="getResponse-div">
                        <div id="getResponse-div-header">
                            <img id='getResponse-div-userIMG' src={data.userIMG} />
                            <div id="getResponse-div-header-data">
                                <p id='getResponse-div-username' onClick={async () => {navigate(`/user/${data.userID}`)}}>{data.username}</p>
                                <p id='getResponse-div-date'>{data.dateString}</p>
                            </div>
                        </div>
                        { data.post.length > 1 ? <p id='getResponse-div-post'>{data.post}</p> : <></> }
                        { data.img == undefined || data.img == null ? <></> : <img id='getResponse-div-img' src={data.img} />  }
                        {userCurrentUsername.data.username === data.username ? <div id="getResponse-div-button"> <input type="button" value="Eliminar respuesta" id={data._id} onClick={sweetAlert} /> </div> : <></>}
                    </div>
                )
                setDataResponse(getResponseChildrenMap)
            }
        }
        setReboot(false)
        setValorResponse(false)
    }, [valorResponse])




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
        const getResponseID = await getresponseByID(responseID)

        if (getNotificationID.data.length > 0) {
            const notificationRemove = await notificationDelete(getNotificationID.data[0]._id)
        }

        const responseRemove = await responseDelete(responseID)

        if (getResponseID.data.img != undefined && getResponseID.data.img.length > 0) {
            const filename = getResponseID.data.img.split('/').pop()
            const data = await deleteFile(filename)
        }


        setReboot(true)
        setValorResponse(true)
    }


    



    return (

        <>

            <div id="response-body">

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

                    {/* Operadores ternarios para evitar que si no hay texto u foto, aparezcan los background o borders */}
                    <div id="response-postPrincipal-data">
                        { postPrincipalLength ? ( <p id='response-postPrincipal-post'>{postPrincipal}</p> ) : ( <></> ) }
                        { postIMGLength ? ( <img id='response-postPrincipal-img' src={postIMG} /> ) : ( <></> ) }
                    </div>
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
    ResponsePost
}