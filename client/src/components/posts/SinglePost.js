import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import ActionButtons from "./ActionButtons";
const SinglePost = ({ post: { _id, status, title, description, url } }) => {
  return (
    <Card
      className="shadow h-13 mw-post"
      border={
        status === "LEARNED"
          ? "success"
          : status === "LEARNING"
          ? "warning"
          : "danger"
      }
    >
      <Card.Body>
        <Card.Title>
          <Row>
            <Col>
              <p
                className="post-title ov-el"
                data-toggle="tooltip"
                data-placement="top"
                title={title}
              >
                {title}
              </p>
            </Col>
          </Row>
          <Row>
            <Col className="text-right">
              <Badge
                pill
                bg={
                  status === "LEARNED"
                    ? "success"
                    : status === "LEARNING"
                    ? "warning"
                    : "danger"
                }
              >
                {status}
              </Badge>
              <ActionButtons url={url} _id={_id} />
            </Col>
          </Row>
        </Card.Title>
        <Card.Text className="text-p">{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SinglePost;
