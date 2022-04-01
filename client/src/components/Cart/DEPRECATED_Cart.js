import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { AppContext } from "../AppContext";
import CartItem from "./CartItem";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cart,
    cart: { items, size, totalCost },
    actions: { clearCart, saveOrder, removeItemFromCart, setStatusError },
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
        saveOrder(cart); // save order to completedOrder state to display in /confirmed route
        clearCart(); // clear cart state on successful purchase
        navigate("/confirmed");
      })
      .catch((err) => {
        setStatusError(err);
      });
  };

  return (
    <Wrapper>
      <div>Your Cart</div>
      <p>{size} items in cart</p>
      <ul>
        {cart &&
          items.map((item) => (
            <CartItem handleRemoveFromCart={handleRemoveFromCart} item={item} />
          ))}
      </ul>
      <p>Total: ${totalCost}</p>
      <ConfirmBtn onClick={handleConfirmPurchase}>Confirm Purchase</ConfirmBtn>
    </Wrapper>
  );
};

export default Cart;

const ConfirmBtn = styled.button`
  background-color: none;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  padding: 10px 20px;
  cursor: pointer;
  &:hover,
  :active {
    background-color: darkgray;
    color: white;
  }
  &:active {
    background-color: grey;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;
