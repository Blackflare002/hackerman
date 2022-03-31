import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AppContext } from "./AppContext";
import { RiShoppingCartLine } from "react-icons/ri";

const Header = () => {
  const {
    cart: { items, totalCost, size },
  } = useContext(AppContext);

  return (
    <Wrapper>
      <StyledLink to={`/`}>
        <h3>Header</h3>
      </StyledLink>
      <div>
        <StyledLink to={`/cart`}>
          <CartBox>
            <span>{size}</span>
            <RiShoppingCartLine />
            <span>Cart</span>
          </CartBox>
        </StyledLink>
        {/* <p>{size} items in cart</p> */}
        {/* <p>Total: ${totalCost}</p> */}
      </div>
    </Wrapper>
  );
};

const CartBox = styled.div`
  display: flex;
  gap: 8px;
  font-size: large;
  padding: 10px;
  border: solid 1px black;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
  padding: 10px 15px;
  margin-bottom: 20px;
  border: solid 1px black;
`;

export default Header;
