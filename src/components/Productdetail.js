import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  Box,
  Card,
  CardMedia,
  CardContent,
  Divider,
} from "@mui/material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `https://fakestoreapi.com/products/${productId}`
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product.id);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
    navigate("/cart");
  };

  if (!product)
    return (
      <Typography variant="h5" align="center">
        Loading...
      </Typography>
    );

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card variant="outlined">
            <CardMedia
              component="img"
              height="400"
              image={product.image}
              alt={product.title}
              sx={{ objectFit: "contain" }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box sx={{ padding: 2 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.title}
            </Typography>
            <Typography variant="h6" color="textSecondary" gutterBottom>
              ${product.price}
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail;
