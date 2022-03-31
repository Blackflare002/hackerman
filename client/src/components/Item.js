import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "./AppContext";

const Item = () => {
  const { id } = useParams();
  const {
    actions: { addItemToCart, setErrorStatus },
  } = useContext(AppContext);
  const [itemData, setItemData] = useState();

  useEffect(() => {
    fetch(`/items/${id}`)
      .then((res) => res.json())
      .then((data) => setItemData(data.singleItem))
      .catch((err) => setErrorStatus(err));
  }, []);

  const handleAddToCart = () => {
    addItemToCart(itemData);
  };
  return (
    <div>
      {itemData && (
        <>
          <h1>{itemData.name}</h1>
          <p>{itemData.price}</p>
          <button onClick={handleAddToCart}>ADD TO CART</button>
        </>
      )}
    </div>
  );
};

export default Item;
