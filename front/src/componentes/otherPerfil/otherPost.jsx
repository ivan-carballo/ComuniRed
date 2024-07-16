import React from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import { dateFormat } from '../../funciones/fecha.js'
import { getPostByProperty } from "../../api/postAPI";
import { responseCreate } from '../../api/responseAPI.js'
import { getUserByID } from "../../api/userAPI";

import '../../saas/otherPerfil/otherPost.scss'


function OtherPost({id}) {
    const [data, setData] = useState()

    const userID = Cookies.get('id')


    useEffect(() => {
        otherPost(id)
        async function otherPost(id) {
            let getPostByUserID = await getPostByProperty('userID', id)
            getPostByUserID = getPostByUserID.data.reverse()

            const getPostMap = await getPostByUserID.map((data) => 
                <div key={data._id} id="getPost-div">
                    <p id='getPost-date'>{data.dateString}</p>
                    <p id='getPost-post'>{data.post}</p>
                    <div id="getPost-buttons">
                        <a href={`/response/${data._id}`}> <input className="getPost-buttons-input" type="button" value="Ver detalles / Responder" id={data._id} /> </a>
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