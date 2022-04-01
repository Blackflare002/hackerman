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
      <HeaderWrapper>
      <Header />      
      <RoutesWrapper>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/confirmed" element={<Confirm />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="/item/:id" element={<Item />} />
      </RoutesWrapper>
      </HeaderWrapper>
    </BrowserRouter>
  );
}

export default App;


const HeaderWrapper = styled.div`

  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`

const RoutesWrapper = styled(Routes)`

  flex: 1;
`