import React, { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton, Button } from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import TimeAgo from "../components/TimeAgo";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { like } from "../api/post";

export default function InfoCard(props) {
  const [likes, setLikes] = useState(props.val.likes);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <Card className="card-container" variant="outlined">
      <div className="edit-post-button">
        {user._id === props.val.user._id ? (
          <Button variant="contained" color="warning">
            Edit
          </Button>
        ) : null}
      </div>
      <CardContent
        className="card-click"
        onClick={() => navigate(`/post/${props.val._id}`)}
      >
        <div className="top-card">
          <Typography>
            {props.val.user.name} {props.val.user.surname}
          </Typography>
          <TimeAgo createdAt={props.val.createdAt} />
        </div>
        <div style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
          {props.val.category}
        </div>
        <div className="card-subject">{props.val.subject}</div>

        <div className="card-content"> {props.val.desc}</div>
      </CardContent>
      <CardActions className="bottom-card">
        <div>
          <IconButton onClick={() => like(props.val._id, user._id, setLikes)}>
            {" "}
            <FavoriteIcon
              sx={{
                color: likes.includes(user._id) ? "red" : "white",
              }}
            />
            <Typography sx={{ color: "white", marginLeft: "0.5rem" }}>
              {likes.length}
            </Typography>
          </IconButton>
        </div>
        <div>
          <IconButton>
            {" "}
            <Typography sx={{ color: "white", marginRight: "0.5rem" }}>
              {props.val.comments?.length}
            </Typography>
            <CommentIcon sx={{ color: "white" }} />{" "}
          </IconButton>
        </div>
      </CardActions>
    </Card>
  );
}
