import React, { createContext, useState } from 'react';

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [post, setPost] = useState([]);

  const addPost = (NewPost) => {
    setPost([...post, NewPost]);
  };

  return (
    <PostContext.Provider value={{ post, addPost }}>
      {children}
    </PostContext.Provider>
  );
};
