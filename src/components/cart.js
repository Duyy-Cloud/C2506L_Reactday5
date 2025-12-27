import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchCartProducts = async () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(cart);

    if (cart.length > 0) {
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        const cartProducts = response.data.filter((product) =>
          cart.includes(product.id)
        );
        setProducts(cartProducts);
      } catch (error) {
        console.error("Error fetching products for cart:", error);
      }
    }
  };

  useEffect(() => {
    fetchCartProducts();
  }, []);

  const totalAmount = products.reduce((acc, product) => acc + product.price, 0);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      {products.length > 0 ? (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{product.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    ${product.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>No items in cart.</Typography>
      )}
      <Typography variant="h6" gutterBottom>
        Total: ${totalAmount.toFixed(2)}
      </Typography>
    </Container>
  );
};

export default Cart;
