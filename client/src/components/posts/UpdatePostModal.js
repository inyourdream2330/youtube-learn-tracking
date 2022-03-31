import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { PostContext } from "../../contexts/PostContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const UpdatePostModal = () => {
  // context
  const {
    postState: { post },
    showUpdatePostModal,
    setShowUpdatePostModal,
    updatePost,
  } = useContext(PostContext);

  const closeDialog = () => {
    setShowUpdatePostModal(false);
  };
  // state
  const [updatedPost, setUpdatedPost] = useState(post);
  useEffect(() => {
    setUpdatedPost(post);
  }, [post]);

  const { title, description, url, status } = updatedPost;
  const notify = (success, message) =>
    toast.success("Update successfully 😍", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      draggable: true,
      progress: undefined,
    });

  const onChangeUpdatePostForm = (event) => {
    setUpdatedPost({ ...updatedPost, [event.target.name]: event.target.value });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await updatePost(updatedPost);
    notify(success, message);
    closeDialog();
  };

  return (
    <Modal show={showUpdatePostModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Making progress</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group>
          <Form.Label>Title *</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={title}
              onChange={onChangeUpdatePostForm}
              required
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>
          <br />
          <Form.Group>
          <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={description}
              onChange={onChangeUpdatePostForm}
              name="description"
              className="n-resize"
            />
          </Form.Group>
          <br />
          <Form.Group>
          <Form.Label>Youtube URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="Youtube URL"
              name="url"
              value={url}
              onChange={onChangeUpdatePostForm}
            />
          </Form.Group>
          <br />
          <Form.Group>
          <Form.Label>Status *</Form.Label>
            <Form.Control
              as="select"
              value={status}
              name="status"
              onChange={onChangeUpdatePostForm}
            >
              <option value="TO LEARN">NOT LEARN</option>
              <option value="LEARNING">LEARNING</option>
              <option value="LEARNED">LEARNED</option>
            </Form.Control>
          </Form.Group>
          <br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdatePostModal;
