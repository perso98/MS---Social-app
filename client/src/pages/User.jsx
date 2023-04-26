import { useContext, useEffect, useState } from "react";
import InfoCard from "../components/InfoCard";
import InfiniteScroll from "react-infinite-scroll-component";
import LinearProgress from "@mui/material/LinearProgress";
import { findOwnerPosts } from "../api/post";
import AddPost from "../components/AddPost";
import { useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import UserCard from "../components/UserCard";
import { getUser } from "../api/user";
import CircularProgress from "@mui/material/CircularProgress";
import EditPost from "../components/EditPost";
export default function User() {
  const [posts, setPosts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [profile, setProfile] = useState();
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [openEdit, setOpenEdit] = useState(false);
  const [post, setPost] = useState({});
  const { id } = useParams();
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const loadMore = () => {
    findOwnerPosts(skip, setSkip, setHasMore, posts, setPosts, id);
  };

  useEffect(() => {
    loadMore();
    getUser(id, setProfile, setLoading);
  }, [id]);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {profile ? <UserCard val={profile} /> : null}
          {id === user._id ? (
            <AddPost posts={posts} setPosts={setPosts} />
          ) : null}
          {posts.length === 0 ? (
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              Nothing found
            </div>
          ) : null}
          <InfiniteScroll
            dataLength={posts.length}
            next={loadMore}
            hasMore={hasMore}
            loader={
              <div style={{ marginTop: "2rem", textAlign: "center" }}>
                <LinearProgress color="inherit" />
              </div>
            }
          >
            {posts.map((val) => (
              <div className="main-element" key={val._id}>
                <InfoCard
                  val={val}
                  setPost={setPost}
                  setOpen={setOpenEdit}
                  setPosts={setPosts}
                />
              </div>
            ))}
          </InfiniteScroll>
          {!hasMore && posts.length !== 0 ? (
            <div style={{ textAlign: "center", marginTop: "3rem" }}>
              There is nothing more
            </div>
          ) : null}
        </>
      )}
      <EditPost
        handleClose={handleCloseEdit}
        open={openEdit}
        post={post}
        setPost={setPost}
        setPosts={setPosts}
      />
    </>
  );
}
