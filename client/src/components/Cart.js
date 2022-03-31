import { useContext } from "react";
import { AppContext } from "./AppContext";

const Cart = () => {
  const {
    cart,
    cart: { items, size, total },
    actions: {
      removeItemFromCart
    }
  } = useContext(AppContext);

  const handleRemoveFromCart = (_id) => {
    removeItemFromCart(_id);
  }

  return (
    <div>
      <div>This is the shopping cart page.</div>
      <ul>
        {cart &&
          items.map((item) => (
            <li>
              <p>{item.name}</p>
              <p>{item.price}</p>
              <button onClick={() => handleRemoveFromCart(item._id)}>Delete</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Cart;
