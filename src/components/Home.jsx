import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/products?sort=rating');
        setProducts(response.data.slice(0, 3)); // Get top 3 rated products
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <Row className="mb-4">
        <Col>
          <div className="text-center py-5 bg-light rounded">
            <h1>Welcome to E-Commerce Store</h1>
            <p className="lead">
              Discover amazing products at great prices. Shop with confidence!
            </p>
            <Link to="/products">
              <Button variant="primary" size="lg">
                Shop Now
              </Button>
            </Link>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <h2>Featured Products</h2>
        </Col>
      </Row>

      <Row>
        {loading ? (
          <Col>Loading...</Col>
        ) : (
          products.map(product => (
            <Col key={product._id} sm={12} md={6} lg={4} className="mb-3">
              <Card className="h-100">
                <Card.Img
                  variant="top"
                  src={product.image}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    {product.description.substring(0, 100)}...
                  </Card.Text>
                  <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="h5 mb-0">${product.price}</span>
                      <span className="text-muted">
                        ⭐ {product.rating} ({product.numReviews} reviews)
                      </span>
                    </div>
                    <Link to={`/product/${product._id}`}>
                      <Button variant="outline-primary" className="w-100">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </div>
  );
};

export default Home; 