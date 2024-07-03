import '../../saas/index/post.scss'
import React from 'react';
import Cookies from 'js-cookie'
import { useState, useEffect, useContext } from "react";
import { getPost, postDelete } from "../../api/postAPI.js"


function Post() {
    const userID = Cookies.get('id')

    const [recarga, setRecarga] = useState(true)
    const [data, setData] = useState('')

    
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
                        {userID == data.userID ? <input type="button" value="Eliminar Post" id={data._id} onClick={deletePost} /> : <></>}
                    </div>
                )
                setData(allPostMap)
                setRecarga(false)
            }
        }
    }) 


    async function deletePost(e) {
        const deletePostAPI = await postDelete(e.target.id)
    }



    return (
        <div id="post-body">
            {data}
        </div>
    )
}




export {
    Post,
}