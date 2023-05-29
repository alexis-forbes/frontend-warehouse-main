import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import { ProductI } from "../models/product";

interface StoreI {
  products: ProductI[];
}

export function Store({ products }: StoreI) {
  return (
    <>
      <h1>Store</h1>
      <br />
      <h2>
        List of available products in warehouse and articles in each product:{" "}
      </h2>
      <br />
      <Row md={2} xs={1} lg={7} className="g-3">
        {products.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
}
