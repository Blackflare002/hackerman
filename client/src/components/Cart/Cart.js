import { useContext } from "react";
import { AppContext } from "../AppContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
    cart: { items, size, totalCost },
    actions: {
      clearCart,
      saveOrder,
      removeItemFromCart,
      setStatusError,
      updateSingleItem,
    },
  } = useContext(AppContext);

  const handleRemoveFromCart = (_id) => {
    removeItemFromCart(_id);
  };

  const handleConfirmPurchase = () => {
    fetch(`/cart/update-stock`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart: items }),
    })
      .then((res) => res.json())
      .then((data) => {
        // after updating the DB, fetch DB for updated items
        const itemIds = cart.items.map((item) => Number(item._id));
        fetch("/many-items", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ itemIds }),
        })
          .then((res) => res.json())
          .then(({ data }) => {
            data.forEach((item) => updateSingleItem(item));
          })
          .catch((err) => setStatusError(err));

          saveOrder(cart); // save order to completedOrder state to display in /confirmed route
          clearCart(); // clear cart state on successful purchase
        navigate("/confirmed");
      })
      .catch((err) => {
        setStatusError(err);
      });
  };

  const findNumInCart = (itemId) => {
    const foundIndex = cart.items.findIndex((item) => item._id === itemId);
    return cart.items[foundIndex].numPurchased;
  };

  return (
    <Wrapper>
      <Title>Shopping Cart</Title>
      <HeaderWrapper></HeaderWrapper>
      <LineBreak></LineBreak>

      <ul>
        {cart &&
          items.map((item) => (
            <CartItem numInCart={findNumInCart(item._id)} item={item} />
          ))}
        {cart.size > 0 && (
          <SubtotalWrapper>
            <p> Subtotal ({size} items) </p>
            <p>Total: ${totalCost}</p>
            <ConfirmBtn onClick={handleConfirmPurchase}>
              Confirm Purchase
            </ConfirmBtn>
          </SubtotalWrapper>
        )}
        {cart.size === 0 && (
          <EmptyCartBox>
            <p>Your cart is empty.</p>
          </EmptyCartBox>
        )}
      </ul>
    </Wrapper>
  );
};

const EmptyCartBox = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const Wrapper = styled.div`
  padding: 30px;
  padding-top: 5%;
  border: 2px solid grey;
  border-radius: 9px;
  max-width: 700px;
  box-shadow: 0 0 0.2rem #fff, 0 0 0.2rem #fff, 0 0 2rem #bc13fe,
    0 0 0.8rem #bc13fe, 0 0 2.8rem #bc13fe, inset 0 0 1.3rem #bc13fe;

  margin: 0 auto;
`;
const Title = styled.h1`
  font-size: 40px;
  text-align: center;
  margin-top: 20px;
`;
const LineBreak = styled.div`
  border-bottom: 1px solid grey;
  margin-top: 10px;
`;

const HeaderWrapper = styled.div``;
const SubtotalWrapper = styled.div`
  display: flex;
  padding-top: 20px;
  padding-bottom: 20px;
  justify-content: flex-end;
  margin-right: 10px;
  align-items: center;
`;

const Category = styled.span`
  font-style: italic;
  margin-left: 10px;
`;
const StyledButton = styled.button`
  margin-left: 5px;
  margin-right: 5px;
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
const ConfirmBtn = styled.button`
  margin-left: 10px;
  background-color: #bc13fe;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  padding: 10px 20px;
  cursor: pointer;
  &:hover,
  :active {
    background-color: #9513fe;
    color: white;
  }
  &:active {
    background-color: grey;
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
