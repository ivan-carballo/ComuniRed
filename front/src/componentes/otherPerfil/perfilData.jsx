// Componente para la cabecera de su perfil visto desde otro usuario
// Contiene los datos basicos del usuario


import React from "react";
import { useState, useEffect } from "react";
import { getUserByID } from "../../api/userAPI";
import { getPostByProperty } from "../../api/postAPI";
import { FaInbox } from 'react-icons/fa'
import { Modal } from '../modal.jsx'
import Cookies from 'js-cookie'
import { dateFormat } from '../../funciones/fecha.js'
import { inboxCreate, inboxUpdate, getInboxByProperty } from '../../api/inboxAPI.js'


import '../../saas/otherPerfil/perfilData.scss'


function PerfilData({id}) {
    const userCurrentID = Cookies.get('id')

    const [username, setUsername] = useState()
    const [perfilIMG, setPerfilIMG] = useState()
    const [date, setDate] = useState()
    const [post, setPost] = useState()
    const [modal, setModal] = useState()
    const [data, setData] = useState()
    const [aviso, setAviso] = useState()




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
            setPost(await getPostByUser.data.length)
        }
    })




    // Funcion para enviar un mensaje privado, se llega aqui desde el modal
    async function sendInbox(e) {
        // Recopilar informacion necesaria
        const userID1 = userCurrentID
        const userID2 = data._id
        const dateNow = await dateFormat(Date.now())
        
        const textarea = document.getElementById('modal-textarea')
        const text = textarea.value


        // Usar getByProperty para saber si ya existe una conversacion entre ambos usuarios
        // Si existe se actualiza con el nuevo mensaje, si no existe se crea una nueva conversacion
        const inboxByUserID1 = await getInboxByProperty('userID1', userID1)
        const inboxByUserID2 = await getInboxByProperty('userID2', userID1)


        // Se crea un array para los nuevos mensajes desde aqui para reutilizarlo dentro del condicional
        const textArray = {'text': text,
                            'dateString': dateNow,
                            'date': Date.now(),
                            'userID': userCurrentID}


        // Condicional para evitar que se mande un mensaje con el texto vacio
        if (text.length > 1) {

                // Comprobar en que situacion se encuentra la conversacion, analizando las 4 variables
                if (inboxByUserID1.data.length > 0 && inboxByUserID2.data.length > 0) {
                        // los dos tienen informacion

                        const inboxFilter1 = inboxByUserID1.data.filter(data => data.userID2 === userID2)
                        const inboxFilter2 = inboxByUserID2.data.filter(data => data.userID1 === userID2)

                        // Condicional para las posibilidades con ambos filtros
                        if (inboxFilter1.length > 0) {
                            inboxSend(inboxFilter1)

                        } else if (inboxFilter2.length > 0) {
                            inboxSend(inboxFilter2)

                        } else {
                            newInboxSend()
                        }

                        closeModal()

                } else if (inboxByUserID1.data.length > 0 && inboxByUserID2.data.length < 1) {
                        // Solo hay datos para uno de ellos

                        const inboxFilter = inboxByUserID1.data.filter(data => data.userID2 == userID2)

                        // Condicional para cuando no haya aun una conversacion entre ambos
                        if (inboxFilter.length > 0) {
                            inboxSend(inboxFilter)

                        } else {
                            newInboxSend()
                        }

                        closeModal()

                } else if (inboxByUserID1.data.length < 1 && inboxByUserID2.data.length > 0) {
                        // Solo hay datos para uno de ellos

                        const inboxFilter = inboxByUserID2.data.filter(data => data.userID1 == userID2)

                        // Condicional para cuando no haya aun una conversacion entre ambos
                        if (inboxFilter.length > 0) {
                            inboxSend(inboxFilter)

                        } else {
                            newInboxSend()
                        }

                        closeModal()

                } else if (inboxByUserID1.data.length < 1 && inboxByUserID2.data.length < 1) {
                        // No hay mensaje entre ambos usuarios

                        newInboxSend()
                        closeModal()

                } else {
                        console.log('no entra en nada');
                }

        } else {
            setAviso('No puede enviar un mensaje vacio')
        }



        // Funcion para guardar una conversacion cuando es nueva y ningun usuario aun ha mandando mensaje al otro
        async function newInboxSend() {
            const textArrayNew = [{'text': text,
                                'dateString': dateNow,
                                'date': Date.now(),
                                'userID': userCurrentID}]

            const inboxArray = {'userID1': userID1,
                                'userID2': userID2,
                                'dateString': dateNow,
                                'text': textArrayNew}

            const newInbox = await inboxCreate(inboxArray)
        }




        // Funcion para guardar un mensaje cuando ya existe una conversacion entre ambos usuarios
        async function inboxSend(inboxFilter) {

            // Incluir el nuevo mensaje al array ya existente
            let newArray = inboxFilter[0].text
            newArray.push(textArray)

            const newInbox = {'text': newArray,
                            'date': Date.now(),
                            'dateString': await dateFormat(Date.now()) }

            const newInboxUpdate = await inboxUpdate(inboxFilter[0]._id, newInbox)
        }




        // Funcion para poner un mensaje de aviso que el mensaje ya sido enviado y cerrar el modal tras 3 segundos
        async function closeModal() {
            textarea.value = ''
            setAviso('Su mensaje ha sido enviado correctamente')

            setTimeout(() => {
                setAviso(null)
                setModal(null)
            }, 5000);
        }
    }







    return (
        <div id="perfilData-body">
            <div id="perfilData-data">

                <img src={perfilIMG} />
                <div id="perfilData-p">
                    <div id="perfilData-header">
                        <p id='perfilData-user'>{username} </p>
                        {/* Ternario para que no se pueda ver el boton de abrir modal cuando se esta mirando el perfil del usuario logueado */}
                        {/* El boton abre modal para enviar mensaje privado */}
                        {userCurrentID != id ? <FaInbox id='perfilData-inbox' onClick={async ()=>{setModal(data)}} /> : <></>}
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
                            {aviso}
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