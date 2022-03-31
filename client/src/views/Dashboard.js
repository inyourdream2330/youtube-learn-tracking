import React, { useEffect } from "react";
import { PostContext } from "../contexts/PostContext";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import SinglePost from "../components/posts/SinglePost";
import AddPostModal from "../components/posts/AddPostModal";
import addIcon from "../assets/plus-circle-fill.svg";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdatePostModal from "../components/posts/UpdatePostModal";
import WatchVideoModal from "../components/posts/WatchVideoModal";
const Dashboard = () => {
  // Context
  const {
    authState: {
      user: { username },
    },
  } = useContext(AuthContext);

  const {
    postState: { posts, postLoading, post, isPostVideo },
    getPosts,
    setShowAddPostModal,
  } = useContext(PostContext);
  // Start: get all posts
  useEffect(() => getPosts(), []);

  let body = null;
  if (postLoading) {
    body = (
      <div className="spinner-containter">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (posts.length === 0) {
    body = (
      <>
        <Card className="text-center">
          <Card.Header as="h1">Hi {username}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to my website</Card.Title>
            <Card.Text>
              Click the below button to track your first course to learn
            </Card.Text>
            <Button
              variant="primary"
              onClick={setShowAddPostModal.bind(this, true)}
            >
              Tracking now
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <br></br>
        <Row className="row-cols-1  g-4 mx-auto mt-3 post-layout">
          {posts.map((post) => (
            <Col key={post._id} className="my-2">
              <SinglePost post={post} />
            </Col>
          ))}
        </Row>
        {/* Open add  Post modal */}
        <OverlayTrigger placement="left" overlay={<Tooltip>Add new</Tooltip>}>
          <Button
            className="btn-floating"
            onClick={setShowAddPostModal.bind(this, true)}
          >
            <img src={addIcon} alt="add-post" className="app-logo-60" />
          </Button>
        </OverlayTrigger>
      </>
    );
  }
  return (
    <>
      {body}
      {post !== null && !isPostVideo && <UpdatePostModal />}
      <WatchVideoModal />
      <ToastContainer />
      <AddPostModal />
    </>
  );
};

export default Dashboard;
