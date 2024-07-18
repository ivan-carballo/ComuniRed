// Pagina para buscar usuarios, posts y respuestas


import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../componentes/navbar";
import { getUserByProperty } from '../api/userAPI'
import { getPostByProperty } from "../api/postAPI";
import { getResponseByProperty } from '../api/responseAPI'


import '../saas/search/search.scss'



function Search() {
    const navigate = useNavigate()

    const [data, setData] = useState()


    // Funcion que se ejecuta cada vez que el input text cambia
    async function inputSearch(e) {
        setData(null)

        // Sacar el valor de ambos inputs
        const formSelect = e.target.parentElement.childNodes[0].value
        const formInput = e.target.parentElement.childNodes[1].value

        // Si el input text esta vacio que salga de la funcion en vez de sacar todo lo que haya en MongoDB
        if (formInput.length < 1) {
            return
        }

        // Condicional para las tres busquedas, usuarios, posts y respuestas
        // Dentro de cada condicion hay una busqueda por propiedad y un metodo map para crear estructura en un useState y mostrarlo en el return
        if (formSelect === 'user') { // Busqueda de usuarios
            const userSearch = await getUserByProperty('username', formInput)

            if (userSearch.data.length > 0) {
                const userMap = userSearch.data.map((data) => 
                    <div key={data._id} id="userSearch-div" onClick={async () => navigate(`/user/${data._id}`)}>
                        <img src={data.img} />
                        <p>{data.username}</p>
                    </div>
                )
                setData(userMap)
            }


        } else if (formSelect === 'post') { // Busqueda de posts
            const postSearch = await getPostByProperty('post', formInput)

            if (postSearch.data.length > 0) {
                const postMap = postSearch.data.reverse().map((data) => 
                    <div key={data._id} id="postSearch-div" onClick={async () => navigate(`/response/${data._id}`)}>
                        <p>{data.username} / {data.dateString}</p>
                        <p id='postSearch-post'>{data.post}</p>
                        <img id='postSearch-img' src={data.img} />
                    </div>
                )
                setData(postMap)
            }


        } else if (formSelect === 'response') { // Busqueda de respuestas a posts
            const responseSearch = await getResponseByProperty('post', formInput)

            if (responseSearch.data.length > 0) {
                const responseMap = responseSearch.data.reverse().map((data) => 
                    <div key={data._id} id="responseSearch-div" onClick={async () => navigate(`/response/${data.postID}`)}>
                        <p>{data.username} / {data.dateString}</p>
                        <p id='responseSearch-post'>{data.post}</p>
                        <img id='responseSearch-img' src={data.img} />
                    </div>
                )
                setData(responseMap)
            }
        }


        

    }



    return (
        <>

            <Navbar />
        
            <div id="search-body">
                <div id="search-form">
                    <select>
                        <option value="user">Usuarios</option>
                        <option value="post">Posts</option>
                        <option value="response">Respuestas</option>
                    </select>
                    <input type="text" placeholder='Escriba su busqueda' onChange={inputSearch} />
                </div>

                <div id="search-result">
                    {data}
                </div>
            </div>
        
        </>
    )
}


export {
    Search
}