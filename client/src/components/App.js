import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import Cart from "./Cart";
import Header from "./Header";
import Homepage from "./Homepage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route exact path="/" element={Homepage} />
      </Routes>
      <Routes>
        <Route exact path="/cart" element={Cart} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
