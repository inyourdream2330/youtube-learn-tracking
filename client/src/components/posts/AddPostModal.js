import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { PostContext } from "../../contexts/PostContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddPostModal = () => {
  // initial post data 
  const initPost = {
    title: "",
    description: "",
    url: "",
    status: "NOT LEARN",
  }
  // context
  const { showAddPostModal, setShowAddPostModal, addPost, setShowToast } =
    useContext(PostContext);
  const closeDialog = () => {
    resetPostData();
  };
  // state
  const [newPost, setNewPost] = useState(initPost);

  const { title, description, url } = newPost;
  const notify = () =>
    toast.success("Happy learning 😍", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
    });

  const onChangeNewPostForm = (event) => {
    setNewPost({ ...newPost, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await addPost(newPost);
    setShowToast({
      show: true,
      message: message,
      type: success ? "success" : "danger",
    });
    notify();
    resetPostData();
  };

  const resetPostData = () => {
    setNewPost(initPost);
    setShowAddPostModal(false);
  };
  return (
    <Modal show={showAddPostModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>What do you want to learn?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Title *</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={title}
              onChange={onChangeNewPostForm}
              required
            />
          </Form.Group>
          <br />
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={description}
              onChange={onChangeNewPostForm}
              name="description"
              className="n-resize"
            />
          </Form.Group>
          <br />
          <Form.Group>
          <Form.Label>Youtube URL *</Form.Label>
            <Form.Control
              type="text"
              name="url"
              placeholder="Example : https://www.youtube.com/watch?v=Yw9Ra2UiVLw"
              value={url}
              onChange={onChangeNewPostForm}
            />
          </Form.Group>
          <br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Get started !!
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddPostModal;
