import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import { createPost } from "../api/post";
import { AuthContext } from "../providers/AuthProvider";
export default function AddPost(props) {

  // Pobranie funkcji setUser z kontekstu uwierzytelniania
  const { setUser } = useContext(AuthContext);

  // Stan do przechowywania danych nowego posta
  const [post, setPost] = useState({
    subject: "",
    desc: "",
  });

  return (
    <div className="post-container">
      <h2>Add your post below</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createPost(post, props.setPosts, setUser, setPost);
        }}
      >
        <div className="post-element-container">
          <input
            placeholder="Subject"
            required
            type="text"
            value={post?.subject?.slice(0, 75)}
            onChange={(e) => {
              const text = e.target.value.slice(0, 75);
              setPost({ ...post, subject: text });
            }}
          />
        </div>

        <span className="post-limit-characters">
          {" "}
          {post?.subject?.length > 75 ? 75 : post?.subject?.length}/75
        </span>
        <div className="post-element-container">
          <textarea
            placeholder="Description"
            required
            value={post?.desc?.slice(0, 400)}
            onChange={(e) => {
              const text = e.target.value.slice(0, 400);
              setPost({ ...post, desc: text });
            }}
          />
        </div>

        <span className="post-limit-characters">
          {props?.post?.desc?.length > 400 ? 400 : post?.desc?.length}
          /400
        </span>
        <Button type="submit" variant="contained" color="success">
          Add Post
        </Button>
      </form>
    </div>
  );
}
