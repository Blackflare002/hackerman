import styled from "styled-components";

const CartItem = ({ item, handleRemoveFromCart }) => {
  return (
    <WrapperLI>
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
    </WrapperLI>
  );
};

export default CartItem;

const WrapperLI = styled.li`
  background-color: var(-);
  list-style: none;
`;
const LineBreak = styled.div`
  border-bottom: 1px solid grey;
  margin-top: 10px;
`;

const StyledImage = styled.img`
  border-radius: 5px;
  width: 150px;
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
  background-color: #bc13fe;
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
  padding: 10px;
`;
