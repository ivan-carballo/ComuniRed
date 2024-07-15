import React from "react";
import { useState, useEffect } from "react";
import { getPostByProperty } from "../../api/postAPI";

import '../../saas/otherPerfil/otherPost.scss'


function OtherPost({id}) {
    const [data, setData] = useState()


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
                        <input type="button" value="Responder" id={data._id} />
                        <input type="button" value="Ver respuestas" id={data._id} />
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