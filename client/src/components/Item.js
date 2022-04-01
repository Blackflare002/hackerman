import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "./AppContext";
import { colors, fontFamily } from "./GlobalStyles";
import { Link } from "react-router-dom";

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
                  {itemData.numInStock < 5 ? (
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
                <CompanyInfo to={companyData.url}>
                  <CompanyName>{companyData.name}</CompanyName>
                  <Country>{companyData.country}</Country>
                </CompanyInfo>
                <Cartbutton>
                  <Button onClick={handleAddToCart}>ADD TO CART</Button>
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

const Wrapper = styled.div`
  position: absolute;
  top: 200px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: black;
`;

const ItemWrapper = styled.div`
  width: 60%;
  height: 50%;
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
  display: grid;
  margin-bottom: 50px;
  align-items: center;
  gap: 20px;
`;
const ItemName = styled.p`
  margin: 0px;
  font-family: ${fontFamily};
  font-size: 32px;
`;

const Category = styled.p`
  margin: 0px;
  font-family: ${fontFamily};
  font-size: 18px;
  font-style: italic;
`;
const BodyLocation = styled.p`
  margin: 0px;
  font-family: ${fontFamily};
`;
const Stock = styled.p`
  margin: 0px;
  font-family: ${fontFamily};
  font-size: 16px;
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
  gap: 170px;
  margin-bottom: 50px;
`;

const ItemAvailability = styled.div`
  width: 150px;
`;

const ItemPrice = styled.div``;

const Cartbutton = styled.div``;

const CompanyInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 150px;
`;
const CompanyInfo = styled(Link)`
  text-align: center;
  text-decoration: none;
  color: whitesmoke;
  width: 30%;
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
const CompanyLink = styled(Link)`
  margin: 0px;
  font-family: ${fontFamily};
  text-decoration: none;
  color: whitesmoke;
`;

const Button = styled.button`
  width: 300px;
  height: 50px;
  font-size: 16px;
  font-family: ${fontFamily};
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
`;
