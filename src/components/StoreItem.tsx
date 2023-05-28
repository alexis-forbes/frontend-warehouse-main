import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { ArticleI } from "../models/article";

type StoreItemProps = {
  articles: ArticleI[];
  id: string;
  name: string;
};

export function StoreItem({ articles, id, name }: StoreItemProps) {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();
  const quantity = getItemQuantity(id);

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Ikea_logo.svg/1280px-Ikea_logo.svg.png"
        }
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
        </Card.Title>
        <div>
          <>
            {articles.map((article, index) => (
              <div key={`article${index}`}>
                <Card.Subtitle className="d-block justify-content-between align-items-baseline mb-4">
                  <div>
                    <p>{`Article ${index + 1}: `}</p>
                  </div>
                  <span>{article.id}</span>
                  <br />
                  <br />
                  <span>{`Amount required: ${article.amountRequired}`}</span>
                </Card.Subtitle>
              </div>
            ))}
          </>
        </div>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className="w-100" onClick={() => increaseCartQuantity(id)}>
              + Add To Cart
            </Button>
          ) : (
            <div
              className="d-flex align-items-center flex-column"
              style={{ gap: ".5rem" }}
            >
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={() => decreaseCartQuantity(id)}>-</Button>
                <div>
                  <span className="fs-3">{quantity}</span> in cart
                </div>
                <Button onClick={() => increaseCartQuantity(id)}>+</Button>
              </div>
              <Button
                onClick={() => removeFromCart(id)}
                variant="danger"
                size="sm"
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
