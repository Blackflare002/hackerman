import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Cart from "./Cart";
import Confirm from "./Confirm";
import GlobalStyles from "./GlobalStyles";
import Header from "./Header";
import Homepage from "./Homepage";
import Item from "./Item";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/confirmed" element={<Confirm />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/item/:id" element={<Item />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
