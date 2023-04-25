import axios from "axios";

export const findOwnerPosts = async (
  skip,
  setSkip,
  setHasMore,
  posts,
  setPosts,
  id
) => {
  try {
    await axios.get(`/post/posts/${id}/${+skip}`).then((res) => {
      const userId = res.data.userId;
      const newPosts = res.data.posts.map((post) => ({ ...post, userId }));
      setPosts([...posts, ...newPosts]);
      setSkip(skip + 5);
      setHasMore(res.data.posts.length !== 0);
    });
  } catch (err) {
    console.error(err);
  }
};

export const createPost = async (post, setPosts, userId) => {
  const res = await axios.post("/post/", {
    subject: post.subject,
    desc: post.desc,
    category: post.category,
  });

  setPosts((prevPosts) => [res.data.post, ...prevPosts]);
};
export const searchPost = async (search, posts, setPosts) => {
  const res = await axios.get(`/post/${search}/${posts.skip}`);

  setPosts({
    ...posts,
    data: [...posts.data, ...res.data],
    hasMore: res.data.length !== 0,
    skip: posts.skip + 5,
    loading: posts.loading ? false : null,
  });
};

export const getPost = async (setPost, id) => {
  const res = await axios.get(`/post/${id}`);
  setPost(res.data);
};

export const like = async (id, userId, setLikes, likes) => {
  const res = await axios.post(`/post/like`, { id });
  if (res.data.like) {
    setLikes((prevLikes) => [...prevLikes, userId]);
  } else {
    setLikes((prevLikes) => [...prevLikes.filter((like) => like !== userId)]);
  }
};
