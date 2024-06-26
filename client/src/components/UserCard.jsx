import React, { useContext, useState } from "react";
import "./style.css";
import Button from "@mui/material/Button";
import { AuthContext } from "../providers/AuthProvider";
import { followHandler } from "../api/user";
import { useNavigate } from "react-router-dom";
import FollowDialog from "./FollowDialog";
function UserCard(props) {

  // Pobranie aktualnie zalogowanego użytkownika z kontekstu uwierzytelniania
  const { user, setUser } = useContext(AuthContext);

  // Stany
  const [openFollow, setOpenFollow] = useState(false);
  const [followType, setFollowType] = useState(null);
  const [followInfo, setFollowInfo] = useState({
    followers: props.val.followers,
    follows: props.val.follows,
  });
  const [follow, setFollow] = useState({
    data: [],
    limit: 10,
    hasMore: true,
    loading: true,
  });

  // Hook do nawigacji
  const navigate = useNavigate();

  // Funkcja zamykająca dialog follow
  const handleCloseFollow = () => {
    setFollow({ ...follow, data: [], limit: 10, hasMore: true, loading: true });
    setOpenFollow(false);
  };

  return (
    <>
      <div className="user-card-container">
        <div className="user-top-content">
          <div
            className="user-card-click"
            onClick={() => navigate(`/user/${props.val._id}`)}
          >
            <div className="user-avatar">{props.val.name.charAt(0)}</div>
            <span>
              {props.val.name} {props.val.surname}
            </span>
          </div>
          <div className="user-card-info">
            {user._id !== props.val._id ? (
              <Button
                style={{ marginLeft: "2rem" }}
                variant="contained"
                color={
                  user.follows.includes(props.val._id) ? "warning" : "success"
                }
                onClick={() =>
                  followHandler(props.val._id, user, setUser, setFollowInfo)
                }
              >
                <span>
                  {" "}
                  {user.follows.includes(props.val._id) ? "unfollow" : "follow"}
                </span>
              </Button>
            ) : null}
          </div>
        </div>
        <span className="following-info">
          {user._id !== props.val._id
            ? props.val.follows.includes(user._id)
              ? "following you"
              : "not following you"
            : null}
        </span>
        <div className="user-bottom-content">
          <span
            style={{
              cursor: followInfo.followers.length !== 0 ? "pointer" : "default",
            }}
            onClick={() => {
              if (followInfo.followers.length !== 0) {
                setFollowType(1);
                setOpenFollow(true);
              }
            }}
          >
            followers: {followInfo.followers.length}
          </span>
          <span
            style={{
              cursor: followInfo.follows.length !== 0 ? "pointer" : "default",
            }}
            onClick={() => {
              if (followInfo.follows.length !== 0) {
                setFollowType(0);
                setOpenFollow(true);
              }
            }}
          >
            follows:{" "}
            {user._id !== props.val._id
              ? followInfo.follows.length
              : user.follows.length}
          </span>
          <span>
            posts:{" "}
            {user._id === props.val._id
              ? user.posts.length
              : props.val.posts.length}
          </span>
        </div>
      </div>
      <FollowDialog
        handleClose={handleCloseFollow}
        open={openFollow}
        id={props.val._id}
        followType={followType}
        follow={follow}
        setFollow={setFollow}
      />
    </>
  );
}

export default UserCard;
