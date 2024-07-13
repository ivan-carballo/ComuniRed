import React from "react";
import { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import { getPostByProperty } from '../../api/postAPI.js'
import { getUserByID } from '../../api/userAPI.js'

import '../../saas/perfil/userPost.scss'



function AllPostByUser () {
    const [data, setData] = useState()



    useEffect(() => {
        getAllPost()
        async function getAllPost() {
            const userID = Cookies.get('id')

            let getPost = await getPostByProperty('userID', userID)
            getPost = getPost.data.reverse()
            console.log(getPost)

            const postMap = getPost.map((data) => 
                <div id='postMap-div' key={data._id}>
                    <p>{data.dateString}</p>
                    <p>{data.post}</p>
                </div>
            )
            setData(postMap)
        }


    }, [])


    return (
        <div id="postByUser-body">
            {data}
        </div>
    )
}



export {
    AllPostByUser
}