import Button from "react-bootstrap/Button";
import playIcon from "../../assets/play-btn.svg";
import editIcon from "../../assets/pencil.svg";
import deleteIcon from "../../assets/trash.svg";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useContext } from "react";
import { PostContext } from "../../contexts/PostContext";

const ActionButtons = ({ url, _id }) => {
  const {
    deletePost,
    getUpdatePost,
    setShowUpdatePostModal,
    setShowVideoModal,
    postState: { isPostVideo },
    getPostVideo,
  } = useContext(PostContext);

  const choosePost = (postId) => {
    getUpdatePost(postId);
    setShowUpdatePostModal(true);
  };

  const chooseVideo = (postId) => {
    getPostVideo(postId);
    setShowVideoModal(true);
  };

  const toastDelete = () =>
    toast.success("Delete success 🗑️", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
    });
  return (
    <>
      <Button
        className="post-button"
        // href={url}
        // target="_blank"
        // rel="noreferrer"
        onClick={chooseVideo.bind(this, _id)}
      >
        <img src={playIcon} alt="play" className="app-logo-32" href={url} />
      </Button>
      <Button className="post-button">
        <img
          src={editIcon}
          alt="edit"
          className="app-logo-24 "
          onClick={choosePost.bind(this, _id)}
        />
      </Button>
      <Button
        className="post-button"
        onClick={() => {
          deletePost(_id);
          toastDelete();
        }}
      >
        <img src={deleteIcon} alt="delete" className="app-logo-24" />
      </Button>
    </>
  );
};

export default ActionButtons;
