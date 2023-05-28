import { Button, Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { ProductI } from "../models/product";
import { useState } from "react";

type ShoppingCartProps = {
  isOpen: boolean;
  products: ProductI[];
  cartQuantity: number;
};

export function ShoppingCart({
  isOpen,
  products,
  cartQuantity,
}: ShoppingCartProps) {
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
    requestOptions.map((option) => {
      fetch(addSaleUrl, option)
        .then((res) => res.json())
        .then((d) => setSale(d));
    });
    //TODO: CLEAN UP CART
  }

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
          <div className="ms-auto fw-bold fs-5">Total </div>
        </Stack>
        <Button variant="primary" size="lg" onClick={() => addSale()}>
          Complete purchase
        </Button>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
