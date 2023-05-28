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
      <Row md={2} xs={1} lg={3} className="g-3">
        {products.map((item) => (
          <Col key={item.id}>
            <StoreItem {...item} />
          </Col>
        ))}
      </Row>
    </>
  );
}
