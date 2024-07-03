import '../../saas/index/post.scss'
import React from 'react';
import Cookies from 'js-cookie'
import { Modal } from '../modal.jsx'
import { useState, useEffect, useContext } from "react";
import { getPost, postDelete } from "../../api/postAPI.js"


function Post() {
    const userID = Cookies.get('id')

    const [recarga, setRecarga] = useState(true)
    const [data, setData] = useState('')
    const [response, setResponse] = useState('')

    
    async function RecargaPost() {
        setRecarga(true)
    }


    useEffect(() => {
        if(recarga) {

            allPost()
            async function allPost() {
                let AllPostData = await getPost()
                AllPostData = AllPostData.data
                AllPostData.reverse()

                const allPostMap = await AllPostData.map((data) =>
                    <div id='post-div' key={data._id}>
                        <h3>{data.username}</h3>
                        <h4>{data.dateString}</h4>
                        <p>{data.post}</p>
                        <input type="button" value="Responder" id={data._id} onClick={async () => {setResponse(data)}} />
                        {userID == data.userID ? <input type="button" value="Eliminar Post" id={data._id} onClick={deletePost} /> : <></>}
                    </div>
                )
                setData(allPostMap)
                setRecarga(false)
            }
        }
    }, [recarga]);


    async function deletePost(e) {
        const deletePostAPI = await postDelete(e.target.id)
    }


    async function responsePost(e) {
        const postOriginID = e.target.id
    }

    async function cerrar() {
        setResponse(null)
    }



    return (
        <div id="post-body">

            {response && 
                <Modal isOpen={true}>

                    <div id="completo">
                        <h1>Aqui para enviar una response</h1>
                        <p>{data}</p>
                    </div>
                    <div id="buttons">
                        <button onClick={cerrar}>Cerrar</button>
                    </div>

                </Modal>
            }

            {data}
        </div>
    )
}




export {
    Post,
}