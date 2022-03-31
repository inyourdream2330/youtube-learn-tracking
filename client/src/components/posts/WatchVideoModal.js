import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "react-toastify/dist/ReactToastify.css";
import { PostContext } from "../../contexts/PostContext";
import VideoEmbbed from "./VideoEmbbed";

const AddPostModal = () => {
  // print

  // context
  const {
    setShowVideoModal,
    showVideoModal,
    closePostVideo,
    lightOn,
    lightOff,
    postState: { videoLight },
  } = useContext(PostContext);

  const closeDialog = () => {
    setShowVideoModal(false);
    closePostVideo();
  };
  // state

  return (
    <Modal
      show={showVideoModal}
      onHide={closeDialog}
      centered={true}
      fullscreen={true}
    >
      <Modal.Header
        className={`d-table text-center ${videoLight ? "bg-light-off" : ""}`}
      >
        <Modal.Title>Happy Watching ^^</Modal.Title>
      </Modal.Header>
      <Modal.Body
        className={videoLight ? "bg-light-off" : ""}
        id="video-player"
      >
        <VideoEmbbed />
      </Modal.Body>
      <Modal.Footer className={videoLight ? "bg-light-off" : ""}>
        <Button variant="warning" onClick={videoLight ? lightOff : lightOn}>
          Light {videoLight ? "On" : "Off"}
        </Button>
        <Button variant="secondary" onClick={closeDialog}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddPostModal;
