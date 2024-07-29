import React from "react";
import { useState, useEffect } from "react";
import { getPostByProperty } from "../../api/postAPI";
import { useNavigate } from "react-router-dom";

import '../../saas/otherPerfil/otherPost.scss'


// Componente para mostrar los posts de un usuario concreto que se veran en la pagina del perfil del usuario (No el logueado, sino otro)
function OtherPost({id}) {
    const navigate = useNavigate()

    const [data, setData] = useState()


    // useEffect para traer todos los post del otro usuario y hacer un metodo map para poder meterlo en el return
    useEffect(() => {
        otherPost(id)
        async function otherPost(id) {
            let getPostByUserID = await getPostByProperty('userID', id)
            getPostByUserID = getPostByUserID.data.reverse()

            const getPostMap = await getPostByUserID.map((data) => 
                <div key={data._id} id="getPost-div">
                    <p id='getPost-date'>{data.dateString}</p>
                    { data.post.length > 0 ? <p id='getPost-post'>{data.post}</p> : <></> }
                    { data.img != undefined && data.img != null ? <img id='getPost-img' src={data.img} /> : <></> }
                    <div id="getPost-buttons">
                    <input className="getPost-buttons-input" type="button" value="Ver detalles / Responder" id={data._id} onClick={async ()=>{navigate(`/response/${data._id}`)}} />
                    </div>
                </div>
            )
            setData(getPostMap)
        }
    }, [])

    


    return (

        <>
        
            <div id="otherPost-body">
                {data}
            </div>
        
        </>

    )
}


export {
    OtherPost
}