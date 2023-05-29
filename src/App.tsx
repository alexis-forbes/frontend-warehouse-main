import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { Store } from "./pages/Store";
import { Navbar } from "./components/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { useEffect, useState } from "react";

function App() {
  const getProductsUrl = "http://localhost:7000/products/";
  const [products, setProducts] = useState([]);

  const fetchInfo = () => {
    return fetch(getProductsUrl)
      .then((res) => res.json())
      .then((d) => setProducts(d))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    fetchInfo();
    console.log("You have fetched all products from the warehouse!");
  }, []);

  return (
    <ShoppingCartProvider products={products}>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store products={products} />} />
        </Routes>
      </Container>
    </ShoppingCartProvider>
  );
}

export default App;
