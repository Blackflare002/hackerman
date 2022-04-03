import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "./AppContext";
import { fontFamily } from "./GlobalStyles";

import styled from "styled-components";
import background from "../assets/grid.jpg";

const Item = () => {
  // retrieving item ID from params
  const { id } = useParams();
  const navigate = useNavigate();
  // using App context
  const {
    actions: { addItemToCart, setStatusError },
  } = useContext(AppContext);
  // initializing Items data state
  const [itemData, setItemData] = useState();
  // initializing Companies data state
  const [companyData, setCompanyData] = useState();
  const [numOfItems, setNumOfItems] = useState(1);

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
    // add items to cart X times
    for (let i = 1; i <= numOfItems; i++) {
      addItemToCart(itemData);
    }
    navigate("/cart");
  };
  
  // limit input value to between 1 and item.numInStock inclusively
  const handleInputChange = (e) => {
    let newValue = e.target.value;
    if (e.target.value <= 1) newValue = 1;
    if (e.target.value >= itemData.numInStock) newValue = itemData.numInStock;

    setNumOfItems(newValue);
  }

  const bodyPart = itemData?.body_location;

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
                  your {bodyPart.toLowerCase()}
                </BodyLocation>
              </ItemDescription>
              <PurchaseSection>
                <ItemAvailability>
                  {itemData.numInStock < 5 && itemData.numInStock > 1 ? ( // displaying an alert if stock runs lower than 5
                    <Stock>
                      {`Items in Stock: ${itemData.numInStock} (Hurry up!)`}{" "}
                    </Stock>
                  ) : (
                    <Stock>{`Items in Stock: ${itemData.numInStock}`} </Stock>
                  )}
                </ItemAvailability>
                <ItemPrice>
                  <Price>{itemData.price}</Price>
                  {itemData.numInStock !== 0 && (
                    <SubtotalWrapper>
                      <SubtotalLabel>Subtotal: </SubtotalLabel>
                      <SubtotalInput
                        min={1}
                        max={itemData.numInStock}
                        type="number"
                        value={numOfItems}
                        onChange={handleInputChange}
                      />
                      <SubtotalLabel>
                        <SubtotalPrice>
                          ${Number(numOfItems * Number(itemData.price.slice(1))).toFixed(2)}
                        </SubtotalPrice>
                      </SubtotalLabel>
                    </SubtotalWrapper>
                  )}
                </ItemPrice>
              </PurchaseSection>
              <CompanyInfoWrapper>
                <CompanyInfo href={companyData.url}>
                  <CompanyName>{companyData.name}</CompanyName>
                  <Country>{`(${companyData.country})`}</Country>                  
                </CompanyInfo>
                <Cartbutton>
                  {itemData.numInStock !== 0 ? ( // disabling the button if no item left in stock
                    <Button onClick={handleAddToCart}>Add To Cart</Button>
                  ) : (
                    <Button disabled={true}>Sold Out</Button>
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
`;

const ItemWrapper = styled.div`
  position: absolute;
  top: 200px;
  width: 100%;
  max-width: 1000px;
  height: 500px;
  display: flex;
  gap: 30px;
  align-items: center;
  background-color: black;
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
  height: 60%;  
  display: flex;
  flex-direction: column;  
  align-items: flex-start;
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
  font-size: 18px;
  color: lightgrey;
  
`;
const Price = styled.p`
  text-decoration: underline;
  text-underline-offset: 15px;
  margin: 0px;
  font-family: ${fontFamily};
  font-size: 24px;
  text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa,
    0 0 82px #0fa, 0 0 92px #0fa, 0 0 102px #0fa, 0 0 151px #0fa;
`;

const PurchaseSection = styled.div`  
  height: 80px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;  
`;

const ItemAvailability = styled.div`
  width: 150px;
  height: 100px;
  color: lightgrey;
  display: flex;
  align-items: center;
`;

const ItemPrice = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;  
  gap: 30px;
`;

const Cartbutton = styled.div``;

const CompanyInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100px;
  gap: 140px;
`;

const CompanyInfo = styled.a`
  text-align: center;
  text-decoration: none;
  background-color: var(--realDarkGrey);
  color: whitesmoke;  
  min-width: 150px;
  border: solid white 1px;
  padding: 10px;
  box-shadow: 0 3px 10px whitesmoke;
  border-radius: 10px;
  :hover {    
    transition: box-shadow 0.5s ease-in-out;    
    box-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #0fa, 0 0 42px #0fa;    
  }
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
  width: 200px;
  height: 60px;
  line-height: 20px;
  border: 0px;  
  border-radius: 10px;
  background: transparent;
  font-family: "TronFont";
  font-size: 24px;
  text-shadow: 0 0 2px #0fa, 0 0 3px #0fa, 0 0 5px #0fa, 0 0 5px #0fa,
      0 0 10px #0fa, 0 0 12px #0fa, 0 0 12px #0fa, 0 0 30px #0fa;
  
  :hover {
    cursor: pointer;
    color: whitesmoke;
    transition: text-shadow 0.1s ease-in-out;
    transition: box-shadow 0.1s ease-in-out;
    text-shadow: 0 0 4px whitesmoke, 0 0 6px whitesmoke, 0 0 10px whitesmoke, 0 0 10px #0fa,
      0 0 20px #0fa, 0 0 24px #0fa, 0 0 24px #0fa, 0 0 60px #0fa;  }
  :active {
    transform: translateY(4px);
  }
  :disabled {
    color: #ff5b9d;
    font-family: "RevampedFont";
    font-size: 32px;
    text-decoration: underline;
    text-underline-offset: 5px;    
    text-shadow: 0 0 4px #ff0066, 0 0 6px #ff0066, 0 0 10px #ff0066, 0 0 10px #ff0066,
      0 0 20px #ff0066, 0 0 24px #ff0066, 0 0 24px #ff0066, 0 0 60px #ff0066;      
    padding: 0;
    }
`;

const SubtotalInput = styled.input`
  background-color: var(--realDarkGray);  
  font-size: 1.15rem;
  font-weight: bold;
  border: solid white 2px;
  border-radius: 10px;
  box-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff;
  text-align: center;  
  height: 40px;
  width: 50px;
`;

const SubtotalLabel = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  height: 100px;
`;

const SubtotalPrice = styled.p`
  font-size: 24px;
  text-decoration: underline;
  text-underline-offset: 15px;  
  margin: 0px;
  font-family: ${fontFamily};  
  text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa,
    0 0 82px #0fa, 0 0 92px #0fa, 0 0 102px #0fa, 0 0 151px #0fa;
`;


const SubtotalWrapper = styled.div`
  display: flex;  
  gap: 25px;
  justify-content: space-between;
  align-items: center;
  width: 200px;  
`;
