import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AppContext } from "./AppContext";

const Header = () => {
  const {
    cart: { items, totalCost, size },
  } = useContext(AppContext);

  return (
    <Wrapper>
      <Link to={`/`}>
        <h3>Header</h3>
      </Link>
      <div>
        <Link to={`/cart`}>
          <h3>Shopping Cart</h3>
        </Link>
        <p>{size} items in cart</p>
        <p>
          Total: $
          {totalCost}
        </p>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  height: fit-content;
  padding: 10px;
  border: solid 2px black;
`;

export default Header;
