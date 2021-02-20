import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, Image, ListGroup, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProductDetails } from "../actions/productsAction";
// import products from "../products";

const ProductScreen = ({ history }) => {
  const [qty, setQty] = useState(1);
  const { id } = useParams();

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [id, dispatch]);

  const addToCartHandler = () => {
    history.push(`/cart/${id}?qty=${qty}`);
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt="" fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  rating={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: ${product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col>Price</Col>
                  <Col>{product.price}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>

              {product.countInStock > 0 && (
                <ListGroup.Item>
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(Number(e.target.value))}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )}

              <ListGroup.Item>
                <Button
                  className="btn btn-block"
                  type="button"
                  onClick={addToCartHandler}
                  disabled={product.countInStock === 0}
                >
                  Add to Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
