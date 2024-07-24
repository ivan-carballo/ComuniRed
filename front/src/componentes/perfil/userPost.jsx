import React, { useSyncExternalStore } from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
import { getPost, getPostByProperty, postDelete } from '../../api/postAPI.js'
import { getResponseByProperty, responseDelete } from "../../api/responseAPI.js"
import { getUserByID } from '../../api/userAPI.js'
import { postRemove } from "../../funciones/postDelete.js";
import Swal from "sweetalert2";

import '../../saas/perfil/userPost.scss'



// Componente para visualizar todos los posts creados por tu usuario
function AllPostByUser () {
    const navigate = useNavigate()

    const [reboot, setReboot] = useState(true)
    const [show, setShow] = useState()



    // useEffect para traer todos los posts creados y hacer un metodo map para mostrarlos en el return
    useEffect(() => {
        if (reboot) {
            getAllPost()
            async function getAllPost() {
                const userID = Cookies.get('id')

                let getPost = await getPostByProperty('userID', userID)
                getPost = getPost.data.reverse()

                let getPostArray = []

                // Se hace un bucle para poder tener tambien el numero de respuestas dadas a cada uno de los posts y poder mostrarlo en un boton de 'ver respuestas'
                for (let i = 0; getPost.length > i; i++) {
                    let numberResponses = await getResponseByProperty('postID', getPost[i]._id)
                    numberResponses = numberResponses.data.length
                    getPost[i].responses = numberResponses
                    getPostArray.push(getPost[i])
                }


                const postMap = getPostArray.map((data) => 
                    <div id='postMap-div' key={data._id}>
                        <p id='postMap-date'>{data.dateString}</p>
                        { data.post.length > 1 ? <p id='postMap-post'>{data.post}</p> : <></> }
                        { data.img != undefined && data.img != null ? <img id='postMap-img' src={data.img} /> : <></> }
                        <div id="postMap-buttons">
                            <input type="button" value={`Ver respuestas (${data.responses})`} id={data._id} onClick={postShow} />
                            <input type="button" className="deletePost" value="Eliminar" id={data._id} onClick={sweetAlert} />
                        </div>
                    </div>
                )
                setShow(postMap)
            }
        }
        setReboot(false)
    }, [reboot])



    // Funcion intermedia para desplegar un aviso al usuario antes de hacer la eliminacion por si es un error o se arrepiente
    async function sweetAlert(e) {
        Swal.fire({
            title: 'Confirmar eliminacion de post',
            text: "Cuando se elimina un post tambien se eliminan todas las respuestas asociadas a dicho post. Esta operacion no se puede revertir.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, elimina todo',
            cancelButtonText: 'No, cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                postDel(e);
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



    // Funcion para eliminar un post concreto junto con sus respuestas
    // La funcion postRemove es una funcion externa para poder reutilizarla en diferentes partes de la web
    async function postDel(e) {
        const postID = await e.target.id
        const deletePostResponse = await postRemove(postID)
        setReboot(true)
    }




    // Funcion para ver el detalle y respuestas de un post concreto
    async function postShow(e) {
        const postID = await e.target.id
        navigate(`/response/${postID}`)
    }






    return (
        <>
        
            <div id="postByUser-body">
                {show}
            </div>
        
        </>
    )
}



export {
    AllPostByUser
}