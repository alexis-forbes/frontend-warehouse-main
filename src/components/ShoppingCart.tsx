import { Button, Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { ProductI } from "../models/product";
import { useState } from "react";

type ShoppingCartProps = {
  isOpen: boolean;
  products: ProductI[];
};

export function ShoppingCart({ isOpen, products }: ShoppingCartProps) {
  const { removeFromCart } = useShoppingCart();
  const { closeCart, cartItems } = useShoppingCart();
  const [sales, setSale] = useState([]);

  const addSaleUrl = `http://localhost:7000/sales/`;

  const requestOptions = cartItems.map((item) => {
    return {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: item.id,
        amountSold: item.quantity,
      }),
    };
  });

  function addSale() {
    if (cartItems.length > 0) {
      requestOptions.forEach((option) => {
        fetch(addSaleUrl, option)
          .then((res) => res.json())
          .then((d) => setSale(d))
          .catch((error) => console.log(error));
      });

      cartItems.forEach((item) => {
        removeFromCart(item.id);
      });
      console.log("You have made a sale!", sales);
    } else {
      closeCart();
    }
  }

  const cartWithItems = cartItems.length > 0;
  const cartWithoutItems = cartItems.length === 0;

  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} products={products} />
          ))}
          <div className="ms-auto fw-bold fs-5">
            {cartWithItems ? "Total" : "Inventory updated!"}
          </div>
          <div>
            {cartWithoutItems && (
              <div className="ms-auto fw-bold fs-8">
                Sale completed! Add more items to register a new sale.
              </div>
            )}
          </div>
        </Stack>
        <br />
        <Button variant="primary" size="lg" onClick={() => addSale()}>
          {cartWithItems ? "Register sale" : "Add items"}
        </Button>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
