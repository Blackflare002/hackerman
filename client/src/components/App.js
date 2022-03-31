import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Cart from "./Cart";
import Header from "./Header";
import Homepage from "./Homepage";
import Item from "./Item";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/item/:id" element={<Item />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
