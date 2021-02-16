import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Image, ListGroup, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Rating from "../components/Rating";
// import products from "../products";

const ProductScreen = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Back
      </Link>
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
            <ListGroup.Item>Description: ${product.description}</ListGroup.Item>
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
            <ListGroup.Item>
              <Button
                className="btn btn-block"
                type="button"
                disabled={product.countInStock === 0}
              >
                Add to Cart
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </>
  );
};

export default ProductScreen;
