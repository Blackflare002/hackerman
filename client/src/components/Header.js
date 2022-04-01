import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AppContext } from "./AppContext";
import { RiShoppingCartLine } from "react-icons/ri";

import logo from "../assets/logo.jpg";

const Header = () => {
  const {
    cart: { items, totalCost, size },
  } = useContext(AppContext);

  return (
    <Glow>
      <Wrapper>
        <StyledLink to={`/`}>
          <HomeWrapper>
            <Logo src={logo} />
            <Title>HACKERMAN</Title>
          </HomeWrapper>
        </StyledLink>
        <CatchPhrase>
          Rage-quit your life, follow me to Cyberspace...
        </CatchPhrase>
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
    </Glow>
  );
};

const Glow = styled.div`
  position: fixed;
  width: 100%;
  z-index: 100;
  background-color: black;
  opacity: 100%;
  color: #fff;
  box-shadow: 0 0 0.2rem #fff, 0 0 0.2rem #fff, 0 0 2rem #bc13fe,
    0 0 0.8rem #bc13fe, 0 0 2.8rem #bc13fe, inset 0 0 1.3rem #bc13fe;
  text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa,
    0 0 82px #0fa, 0 0 92px #0fa, 0 0 102px #0fa, 0 0 151px #0fa;
`;

const CartBox = styled.div`
  display: flex;
  gap: 8px;
  font-size: large;
  padding: 10px;
  border: solid 1px white;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const Title = styled.h3`
  font-family: "TronFont";
  font-size: 24px;
`;

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  padding: 10px 15px;
  //margin-bottom: 20px;
  //border: solid 1px white;
  /* color: #fff;
  text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa,
    0 0 82px #0fa, 0 0 92px #0fa, 0 0 102px #0fa, 0 0 151px #0fa; */
`;

const HomeWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  width: 70px;
  border-radius: 50%;
`;

const CatchPhrase = styled.p`
  font-family: "TronFont";
  font-size: 24px;
`;

export default Header;
