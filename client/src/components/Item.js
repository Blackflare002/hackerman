import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "./AppContext";

import styled from "styled-components";

const Item = () => {
  const { id } = useParams();
  const {
    actions: { addItemToCart, setStatusError },
  } = useContext(AppContext);
  const [itemData, setItemData] = useState();
  const [companyData, setCompanyData] = useState();

  useEffect(() => {
    fetch(`/items/${id}`)
      .then((res) => res.json())
      .then((data) => setItemData(data.singleItem))
      .catch((err) => setStatusError(err));
  }, []);
  
  useEffect(() => {
    if (itemData) { // only fetch company by ID if itemData exists
      fetch(`/companies/${itemData.companyId}`)
      .then((res) => res.json())
      .then((data) => setCompanyData(data.singleCompanies))
      .catch((err) => setStatusError(err));
    }
  }, [itemData]) // will fire useEffect when itemData gets updated
  
  const handleAddToCart = () => {
    addItemToCart(itemData);
  };

  

  return (
    //Rendering Items info.
    <div>
      {itemData && companyData && (
        <>
          <img src={itemData.imageSrc} />
          <h1>{itemData.name}</h1>
          <p>{itemData.category}</p>
          <p>{itemData.body_location}</p>
          <p>{itemData.price}</p>
          <p>{`Stock: ${itemData.numInStock}`}</p>
          <p>{companyData.name}</p>
          <button onClick={handleAddToCart}>ADD TO CART</button>
        </>
      )}
    </div>
  );
};

export default Item;
