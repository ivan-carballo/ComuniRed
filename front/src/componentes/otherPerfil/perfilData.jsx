// Componente para la cabecera de su perfil visto desde otro usuario
// Contiene los datos basicos del usuario


import React from "react";
import { useState, useEffect } from "react";
import { getUserByID } from "../../api/userAPI";
import { getPostByProperty } from "../../api/postAPI";
import { FaInbox } from 'react-icons/fa'
import { Modal } from '../modal.jsx'


import '../../saas/otherPerfil/perfilData.scss'


function PerfilData({id}) {
    const [username, setUsername] = useState()
    const [perfilIMG, setPerfilIMG] = useState()
    const [date, setDate] = useState()
    const [post, setPost] = useState()
    const [modal, setModal] = useState()
    const [data, setData] = useState()




    // UseEffect para recopilar los datos del usuario con una llamada API
    useEffect(() => {
        showUser(id)
        async function showUser(id) {
            let getOtherUser = await getUserByID(id)
            getOtherUser = getOtherUser.data
            setData(getOtherUser)

            // Sacar solo el mes y año de la fecha de registro
            let date = getOtherUser.dateString
            date = date.split(",")[0].split(" de ")
            date = `${date[1]} ${date[2]}`
            date = date.charAt(0).toUpperCase() + date.slice(1).toLowerCase()

            // Buscar todos los posts del usuario para la estadistica
            const getPostByUser = await getPostByProperty('userID', id)

            setUsername(getOtherUser.username)
            setPerfilIMG(getOtherUser.img)
            setDate(date)
            setPost(getPostByUser.data.length)
        }
    })




    // Funcion para enviar un mensaje privado, se llega aqui desde el modal
    async function sendInbox(e) {
        

    }






    return (
        <div id="perfilData-body">
            <div id="perfilData-data">

                <img src={perfilIMG} />
                <div id="perfilData-p">
                    <div id="perfilData-header">
                        <p id='perfilData-user'>{username} </p>
                        <FaInbox id='perfilData-inbox' onClick={async ()=>{setModal(data)}} />  {/* Al pulsar el icono se abre modal para escribir mensaje privado */}
                    </div>
                    <p id='perfilData-date'>Registrado: {date}</p>
                    <p id='perfilData-post'>Nº post: {post}</p>
                </div>

            </div>

            {/* A partir de aqui es la estructura del modal para enviar un mesnaje privado */}
            {modal && 
            
                <Modal isOpen={true}>

                    <div id="modal-body">

                        <div id="modal-header">
                            <div id="modal-header-img">
                                <img src={modal.img} />
                            </div>
                            <div id="modal-header-data">
                                <h3>Mensaje privado</h3>
                                <h3>a {modal.username}</h3>
                            </div>
                        </div>

                        <div id="modal-text">
                            <textarea id='modal-textarea' placeholder='Escriba aqui su mensaje' cols={38} rows={10}></textarea>
                        </div>

                        <div id="modal-buttons">
                        <button onClick={async () => {setModal(null)}}>Cerrar</button>
                        <button onClick={sendInbox}>Enviar mensaje</button>
                        </div>
                        
                    </div>

                </Modal>

            }


        </div>
    )
}


export {
    PerfilData
}