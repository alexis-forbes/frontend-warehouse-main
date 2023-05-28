import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";

import { ProductI } from "../models/product";

type CartItemProps = {
  id: string;
  quantity: number;
  products: ProductI[];
};

export function CartItem({ id, quantity, products }: CartItemProps) {
  const { removeFromCart } = useShoppingCart();

  const item = products.find((i) => i.id === id);
  if (item == null) return null;

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Ikea_logo.svg/1280px-Ikea_logo.svg.png"
        }
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.name}{" "}
          {quantity > 1 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {item.name}
        </div>
      </div>
      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => removeFromCart(item.id)}
      >
        &times;
      </Button>
    </Stack>
  );
}
