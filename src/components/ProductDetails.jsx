import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button, Form, Badge } from 'react-bootstrap';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useCart();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/products/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product && quantity > 0 && quantity <= product.stock) {
      addToCart(product, quantity);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Img
              variant="top"
              src={product.image}
              style={{ height: '400px', objectFit: 'cover' }}
            />
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title className="h3">{product.name}</Card.Title>
              <div className="mb-3">
                <Badge bg="secondary" className="me-2">{product.category}</Badge>
                <span className="text-muted">
                  ⭐ {product.rating} ({product.numReviews} reviews)
                </span>
              </div>
              <Card.Text className="h4 text-primary mb-3">
                ${product.price}
              </Card.Text>
              <Card.Text>{product.description}</Card.Text>
              
              <div className="mb-3">
                <strong>Stock:</strong> {product.stock} units
              </div>

              {product.stock > 0 ? (
                <div className="d-flex gap-3 align-items-center mb-3">
                  <Form.Group style={{ width: '100px' }}>
                    <Form.Label>Quantity:</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      max={product.stock}
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    />
                  </Form.Group>
                  <Button
                    variant="success"
                    size="lg"
                    onClick={handleAddToCart}
                    disabled={quantity > product.stock}
                  >
                    Add to Cart
                  </Button>
                </div>
              ) : (
                <Button variant="secondary" size="lg" disabled>
                  Out of Stock
                </Button>
              )}

              <div className="mt-4">
                <Button
                  variant="outline-primary"
                  onClick={() => navigate('/products')}
                >
                  Back to Products
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductDetails; 