import { useContext, useState } from "react";
import styled from "styled-components";
import { AppContext } from "../AppContext";

const CartItem = ({ item, numInCart }) => {
  const {
    actions: { addItemToCart, removeItemFromCart },
  } = useContext(AppContext);
  const [inputValue, setInputValue] = useState(numInCart);

  const handleInputChange = (e) => {
    let newValue;
    // set minimum number to 1
    if (e.target.value <= 1) {
      newValue = 1;
    }

    // set maximum number to number of items in stock
    else if (e.target.value > item.numInStock) {
      newValue = item.numInStock
    } else {
      // otherwise, continue with input value
      newValue = e.target.value;
    }

    // the following logic checks if input incremented or decremented

    const numChangedBy = newValue - inputValue;

    // add one more of item to cart if input incremented OR set number of items in cart if a number was directly inputed
    if (numChangedBy > 0) {
      for (let i = 1; i <= numChangedBy; i++) {
        addItemToCart(item);
      }
    }
    console.log(!!numChangedBy);
    // reduce count of item in cart by 1 if input incremented OR set number of items in cart if a number was directly inputed
    if (numChangedBy < 0) {
      for (let i = 1; i <= Math.abs(numChangedBy); i++) {
        removeItemFromCart(item._id);
      }
    }

    setInputValue(newValue);
  };

  // remove all of this item from the cart
  const handleDeleteItem = () => {
    for (let i = 1; i <= inputValue; i++) {
      removeItemFromCart(item._id);
    }
  };

  return (
    <WrapperLI>
      <ProductInfo1>
        <StyledImage src={item.imageSrc} />

        <Info>
          <Information>{item.name}</Information>
          {<Information>{item.price}</Information>}
          <Information>
            <NumInput
              value={inputValue}
              onChange={handleInputChange}
              type="number"
              min={1}
              max={item.numInStock}
            />
            {/* item.numPurchased */}
          </Information>
          <Category>{item.category}</Category>

          <StyledButton onClick={handleDeleteItem}>Delete</StyledButton>
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

const NumInput = styled.input`
  background-color: var(--veryDarkGrey);
`;
