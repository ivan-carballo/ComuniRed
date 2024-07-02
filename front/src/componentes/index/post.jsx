import '../../saas/index/post.scss'
import { useState, useEffect, useContext } from "react";
import { getPost } from "../../api/postAPI.js"


function Post() {
    const [recarga, setRecarga] = useState(true)
    const [data, setData] = useState('')

    

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
                    </div>
                )
                setData(allPostMap)
                setRecarga(false)
            }
        }
    }) 



    return (
        <div id="post-body">
            {data}
        </div>
    )
}




export {
    Post
}