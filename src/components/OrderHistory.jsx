import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Table, Badge, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const OrderHistory = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchOrders();
  }, [user, navigate]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/orders/myorders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const variants = {
      'Pending': 'warning',
      'Processing': 'info',
      'Shipped': 'primary',
      'Delivered': 'success',
      'Cancelled': 'danger'
    };
    return <Badge bg={variants[status]}>{status}</Badge>;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!user) {
    return null;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Row className="mb-4">
        <Col>
          <h2>My Orders</h2>
        </Col>
      </Row>

      {orders.length === 0 ? (
        <Card>
          <Card.Body className="text-center py-5">
            <h4>No Orders Yet</h4>
            <p>You haven't placed any orders yet.</p>
            <Button variant="primary" onClick={() => navigate('/products')}>
              Start Shopping
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Row>
          {orders.map(order => (
            <Col key={order._id} md={12} className="mb-3">
              <Card>
                <Card.Header>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>Order #{order._id.slice(-6)}</strong>
                      <br />
                      <small className="text-muted">
                        Placed on {formatDate(order.createdAt)}
                      </small>
                    </div>
                    <div className="text-end">
                      <div className="h5 mb-0">${order.totalPrice}</div>
                      {getStatusBadge(order.status)}
                    </div>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.products.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <div className="d-flex align-items-center">
                              <img
                                src={item.productId.image}
                                alt={item.productId.name}
                                style={{ width: '40px', height: '40px', objectFit: 'cover', marginRight: '10px' }}
                              />
                              <div>
                                <strong>{item.productId.name}</strong>
                                <br />
                                <small className="text-muted">{item.productId.category}</small>
                              </div>
                            </div>
                          </td>
                          <td>${item.price}</td>
                          <td>{item.quantity}</td>
                          <td>${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>

                  <Row className="mt-3">
                    <Col md={6}>
                      <h6>Shipping Address:</h6>
                      <p className="mb-1">
                        {order.shippingAddress.address}<br />
                        {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />
                        {order.shippingAddress.country}
                      </p>
                    </Col>
                    <Col md={6}>
                      <h6>Payment Method:</h6>
                      <p className="mb-1">{order.paymentMethod}</p>
                      
                      <h6>Order Status:</h6>
                      <p className="mb-1">{getStatusBadge(order.status)}</p>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default OrderHistory; 