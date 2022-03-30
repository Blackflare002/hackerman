import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  return (
    <Wrapper>
      <Link to={`/`}>
        <h3>Header</h3>
      </Link>
      <Link to={`/cart`}>
        <h3>Shopping Cart</h3>
      </Link>
    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  height: 75px;
  padding: 10px;
  border: solid 2px black;
`;

export default Header;
