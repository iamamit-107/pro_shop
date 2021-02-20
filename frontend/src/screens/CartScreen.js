import { useParams, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../actions/cartActions";
import Message from "../components/Message";

const CartScreen = ({ history }) => {
  const { id } = useParams();
  const qty = useLocation().search.split("=")[1];

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  console.log(cartItems);

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Row>
      <Col md={8}>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          cartItems.map((item) => (
            <ListGroup key={item.product}>
              <Row>
                <Col md={2}>
                  <Image src={item.image} fluid rounded />
                </Col>
                <Col md={3}>
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                </Col>
                <Col md={2}>${item.price}</Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(addToCart(item.product, Number(e.target.value)))
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    variant="light"
                    onClick={() => removeFromCartHandler(item.product)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup>
          ))
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h4>Subtotal ({cartItems.length}) items</h4>
              <h6>
                $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </h6>
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                className="btn-block"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
