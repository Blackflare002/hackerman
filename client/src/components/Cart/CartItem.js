import styled from "styled-components";

const CartItem = ({ item, handleRemoveFromCart }) => {
  return (
    <WrapperLI>
      <div><StyledImg src={item.imageSrc} /></div>
      <p>{item.name}</p>
      <p>{item.price}</p>
      <button onClick={() => handleRemoveFromCart(item._id)}>Delete</button>
    </WrapperLI>
  );
};

export default CartItem;

const StyledImg = styled.img`
  height: 50px;
`

const WrapperLI = styled.li`
  background-color: var(-);
  list-style: none;
`