import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "./AppContext";
import { fontFamily } from "./GlobalStyles";

import styled from "styled-components";
import background from "../assets/grid.jpg";

const Item = () => {
  // retrieving item ID from params
  const { id } = useParams();
  // using App context
  const {
    actions: { addItemToCart, setStatusError },
  } = useContext(AppContext);
  // initializing Items data state
  const [itemData, setItemData] = useState();
  // initializing Companies data state
  const [companyData, setCompanyData] = useState();

  useEffect(() => {
    // fetching and updating Item data state
    fetch(`/items/${id}`)
      .then((res) => res.json())
      .then((data) => setItemData(data.singleItem))
      .catch((err) => setStatusError(err));
  }, []);

  useEffect(() => {
    // fetching and updating Company data state
    if (itemData) {
      // only fetch company by ID if itemData exists
      fetch(`/companies/${itemData.companyId}`)
        .then((res) => res.json())
        .then((data) => setCompanyData(data.singleCompanies))
        .catch((err) => setStatusError(err));
    }
  }, [itemData]); // will fire useEffect when itemData gets updated

  const handleAddToCart = () => {
    addItemToCart(itemData);
  };

  return (
    // rendering Items and Company info
    <Wrapper>
      {itemData && companyData && (
        <>
          <ItemWrapper>
            <ItemImage>
              <Image src={itemData.imageSrc} />
            </ItemImage>
            <ItemInfo>
              <ItemDescription>
                <ItemName>{itemData.name}</ItemName>
                <Category>Category: Cyber-{itemData.category}</Category>
                <BodyLocation>
                  Fan of Hackerman?<br></br>Suit-up with this perfect fit for
                  your {itemData.body_location}
                </BodyLocation>
              </ItemDescription>
              <PurchaseSection>
                <ItemAvailability>                  
                  {itemData.numInStock < 5 && itemData.numInStock > 1 ? ( // displaying an alert if stock runs lower than 5
                    <Stock>
                      {`Items in Stock: ${itemData.numInStock} (Hurry-up!)`}{" "}
                    </Stock>
                  ) : (
                    <Stock>{`Items in Stock: ${itemData.numInStock}`} </Stock>
                  )}
                </ItemAvailability>
                <ItemPrice>
                  <Price>{itemData.price}</Price>
                </ItemPrice>
              </PurchaseSection>
              <CompanyInfoWrapper>
                <CompanyInfo href={companyData.url}>
                  <CompanyName>{companyData.name}</CompanyName>
                  <Country>{companyData.country}</Country>
                </CompanyInfo>
                <Cartbutton>
                  {itemData.numInStock  != 0  ? ( // disabling the button if no item left in stock
                  <Button onClick={handleAddToCart}>ADD TO CART</Button> 
                  ) : (
                  <Button disabled={true}>OUT OF STOCK</Button>
                  )}
                </Cartbutton>
              </CompanyInfoWrapper>
            </ItemInfo>
          </ItemWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default Item;

// styled components
const Wrapper = styled.div`
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: black;
  background-image: url(${background});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

const ItemWrapper = styled.div`

  position: absolute;
  top: 200px;
  width: 100%;
  max-width: 1000px;
  height: 500px;
  display: flex;
  gap: 30px;
  align-items: center;
  background-color: var(--realDarkGrey);
  border-radius: 10px;
  padding: 30px;
  color: #fff;
  box-shadow: 0 0 0.2rem #fff, 0 0 0.2rem #fff, 0 0 2rem #bc13fe,
    0 0 0.8rem #bc13fe, 0 0 2.8rem #bc13fe, inset 0 0 1.3rem #bc13fe;
`;

const ItemImage = styled.div`

  display: flex;
  justify-content: center;
  width: 400px;
  height: 400px;
  padding: 10px;
  align-items: center;
`;

const Image = styled.img`

  width: 350px;
  height: 350px;
  border-radius: 10px;
  box-shadow: 0 3px 10px whitesmoke;
`;

const ItemInfo = styled.div`

  width: 75%;
  height: 300px;
`;

const ItemDescription = styled.div`  
  
  width: 100%;
  display: grid;  
  margin-bottom: 50px;
  align-items: center;
  gap: 20px;
`;

const ItemName = styled.p`

  margin: 0px;
  font-family: ${fontFamily};
  font-size: 32px;
  color: lightgrey;
`;

const Category = styled.p`

  margin: 0px;
  font-family: ${fontFamily};
  font-size: 18px;
  font-style: italic;
  color: lightgrey;
`;
const BodyLocation = styled.p`

  margin: 0px;
  font-family: ${fontFamily};
  color: lightgrey;
`;
const Stock = styled.p`

  margin: 0px;
  font-family: ${fontFamily};
  font-size: 16px;
  color: lightgrey;
`;
const Price = styled.p`

  margin: 0px;
  font-family: ${fontFamily};
  font-size: 32px;
  text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa,
    0 0 82px #0fa, 0 0 92px #0fa, 0 0 102px #0fa, 0 0 151px #0fa;
`;

const PurchaseSection = styled.div`

  display: grid;
  grid-template-columns: auto auto;
  align-items: center;
  justify-content: flex-start;
  gap: 190px;
  margin-bottom: 50px;
`;

const ItemAvailability = styled.div`

  width: 150px;
  color: lightgrey;
`;

const ItemPrice = styled.div``;

const Cartbutton = styled.div``;

const CompanyInfoWrapper = styled.div`

  display: flex;
  align-items: center;
  gap: 150px;
`;
const CompanyInfo = styled.a`

  text-align: center;
  text-decoration: none;
  color: whitesmoke;
  width: 150px;
  min-width: 150px;
  border: solid white 1px;
  padding: 10px;
  box-shadow: 0 3px 10px whitesmoke;
  border-radius: 10px; ;
`;
const CompanyName = styled.p`

  margin: 0px;
  font-family: ${fontFamily};
  font-size: 20px;
`;
const Country = styled.p`

  margin: 0px;
  font-family: ${fontFamily};
  font-style: italic;
`;

const Button = styled.button`

  width: 150px;
  height: 50px;
  font-size: 16px;
  font-family: ${fontFamily};
  border-radius: 10px;
  color: #bc13fe;
  box-shadow: 0 0 0.2rem #fff, 0 0 0.2rem #fff, 0 0 2rem #bc13fe,
    0 0 0.8rem #bc13fe, 0 0 2.8rem #bc13fe, inset 0 0 1.3rem #bc13fe;
  text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa,
    0 0 82px #0fa, 0 0 92px #0fa, 0 0 102px #0fa, 0 0 151px #0fa;

  :hover {
    cursor: pointer;
    color: #0fa;
    transition: box-shadow 0.5s ease-in-out;
    box-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa,
      0 0 82px #0fa, 0 0 92px #0fa, 0 0 102px #0fa, 0 0 151px #0fa;
  }
  :active {
    transform: translateY(4px);
  }
  :disabled {
    cursor: pointer;
    color: orange;
    background-color: black;
    border: solid orange 1px;
    transition: box-shadow 0.5s ease-in-out;
    text-shadow: 0 0 7px red, 0 0 10px red, 0 0 21px red, 0 0 42px red,
      0 0 82px red, 0 0 92px red, 0 0 102px red, 0 0 151px red;
    box-shadow: 0 0 7px red, 0 0 10px red, 0 0 21px red, 0 0 42px red,
      0 0 82px red, 0 0 92px red, 0 0 102px red, 0 0 151px red;
  }
`;
