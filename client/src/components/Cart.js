import { useContext } from "react";
import { AppContext } from "./AppContext";
import styled from "styled-components";

const Cart = () => {
  const {
    cart,
    cart: { items, size, totalCost },
    actions: { removeItemFromCart },
  } = useContext(AppContext);

  const handleRemoveFromCart = (_id) => {
    removeItemFromCart(_id);
  };

  return (
    <Wrapper>
      <Title>Shopping Cart</Title>
      <HeaderWrapper></HeaderWrapper>
      <LineBreak></LineBreak>

      <ul>
        {cart &&
          items.map((item) => (
            <li>
              <ProductInfo1>
                <StyledImage src={item.imageSrc} />

                <Info>
                  <Information>{item.name}</Information>
                  <Information>{item.price}</Information>
                  <Category>{item.category}</Category>

                  <StyledButton onClick={() => handleRemoveFromCart(item._id)}>
                    Delete
                  </StyledButton>
                </Info>
              </ProductInfo1>
              <LineBreak></LineBreak>
            </li>
          ))}
        <SubtotalWrapper>
          <p> Subtotal ({size} items) </p>
          <p>Total: ${totalCost}</p>
        </SubtotalWrapper>
      </ul>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  margin-top: 100px;
  border: 2px solid grey;
  border-radius: 9px;
  max-width: 700px;
  box-shadow: 0 0 0.2rem #fff, 0 0 0.2rem #fff, 0 0 2rem #bc13fe,
    0 0 0.8rem #bc13fe, 0 0 2.8rem #bc13fe, inset 0 0 1.3rem #bc13fe;

  margin: 0 auto;
`;
const Title = styled.h1`
  font-size: 40px;
  margin-top: 20px;
  margin-left: 10px;
`;
const LineBreak = styled.div`
  border-bottom: 1px solid grey;
  margin-top: 10px;
`;
const StyledImage = styled.img`
  border-radius: 5px;
  width: 150px;
`;
const HeaderWrapper = styled.div``;
const SubtotalWrapper = styled.div`
  display: flex;
  padding-top: 20px;
  padding-bottom: 20px;
  justify-content: flex-end;
  margin-right: 10px;
`;
const ProductInfo1 = styled.div`
  display: flex;
  align-items: center;
  line-height: 35px;
  margin-left: 10px;
  margin-top: 8px; ;
`;
const Category = styled.span`
  font-style: italic;
  margin-left: 10px;
`;
const StyledButton = styled.button`
  background-color: #ffd633;
  color: white;
  font-weight: bold;
  border-radius: 7px;
  max-width: 65px;
  border: none;
  margin-left: 10px;
  &:hover {
    cursor: pointer;
  }
`;

const Information = styled.span`
  margin-left: 10px;
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
`;
export default Cart;
