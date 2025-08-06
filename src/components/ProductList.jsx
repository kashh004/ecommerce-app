import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('');

  const { addToCart } = useCart();

  const categories = ['All', 'Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Other'];

  useEffect(() => {
    fetchProducts();
  }, [search, category, sort]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (category !== 'All') params.append('category', category);
      if (sort) params.append('sort', sort);

      const response = await axios.get(`/products?${params}`);
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  const renderProducts = () => {
    if (loading) {
      return (
        <Col xs={12} className="text-center py-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </Col>
      );
    }

    if (products.length === 0) {
      return (
        <Col xs={12} className="text-center py-5">
          <h4>No products found</h4>
          <p className="text-muted">Try adjusting your search or filter criteria.</p>
        </Col>
      );
    }

    return products.map(product => (
      <Col key={product._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
        <Card className="h-100 product-card">
          <Card.Img
            variant="top"
            src={product.image}
            style={{ height: '200px', objectFit: 'cover' }}
            alt={product.name}
          />
          <Card.Body className="d-flex flex-column">
            <Card.Title className="h6 mb-2">{product.name}</Card.Title>
            <Card.Text className="small text-muted flex-grow-1">
              {product.description.length > 80 
                ? `${product.description.substring(0, 80)}...` 
                : product.description
              }
            </Card.Text>
            <div className="mt-auto">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="h6 mb-0 text-primary">${product.price}</span>
                <span className="text-muted small">
                  ⭐ {product.rating} ({product.numReviews})
                </span>
              </div>
              <div className="d-grid gap-2">
                <Link to={`/product/${product._id}`}>
                  <Button variant="outline-primary" size="sm" className="w-100">
                    View Details
                  </Button>
                </Link>
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                >
                  {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Col>
    ));
  };

  return (
    <div>
      <Row className="mb-4">
        <Col>
          <h2>Products {category !== 'All' && `- ${category}`}</h2>
          {products.length > 0 && (
            <p className="text-muted">{products.length} product{products.length !== 1 ? 's' : ''} found</p>
          )}
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4}>
          <InputGroup>
            <Form.Control
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={3}>
          <Form.Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Sort by</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating</option>
          </Form.Select>
        </Col>
      </Row>

      <Row>
        {renderProducts()}
      </Row>
    </div>
  );
};

export default ProductList; 