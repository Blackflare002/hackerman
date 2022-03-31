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
    // rendering Items and Company info
    <Wrapper>
      {itemData && companyData && (
        <>
          <ItemImage>
            <Image src={itemData.imageSrc} />
            </ItemImage>
            <ItemInfo>
              <ItemDescription>
                <ItemName>{itemData.name}</ItemName>
                <Category>{itemData.category}</Category>                
                <BodyLocation>{itemData.body_location}</BodyLocation>                
              </ItemDescription>
              <PurchaseSection>
                <ItemAvailability>
                  <Stock>{`Stock: ${itemData.numInStock}`}</Stock>
                </ItemAvailability>
                <ItemPrice>
                  <Price>{itemData.price}</Price>
                </ItemPrice>                
              </PurchaseSection>
              <CompanyInfoWrapper>
                <CompanyInfo>        
                  <CompanyName>{companyData.name}</CompanyName>
                  <Country>{companyData.country}</Country>
                  <CompanyLink to={companyData.url}>{companyData.url}</CompanyLink>
                </CompanyInfo>
                <Cartbutton>
                  <button onClick={handleAddToCart}>ADD TO CART</button>
                </Cartbutton>
              </CompanyInfoWrapper>
            </ItemInfo>

        </>
      )}
    </Wrapper>
  );
};

export default Item;

const Wrapper = styled.div`
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  height: 100vh;
  background-color: ${colors.itemsBackground};
  
`



const ItemImage = styled.div`
  
  display: flex;
  justify-content: center;
  width: 25%;
  height: 25%;
`
const Image = styled.img`
  
  
  


`

const ItemInfo = styled.div`

  
  width: 75%;

`

const ItemDescription = styled.div`

  display: grid;
  grid-template-columns: auto auto;
  
  

`
const ItemName = styled.p`
  margin: 0px;
  font-family: ${fontFamily};
  
  
`

const Category = styled.p`
  margin: 0px;
  font-family: ${fontFamily};
  
`
const BodyLocation = styled.p`
  margin: 0px;
  font-family: ${fontFamily};
  

`
const Stock = styled.p`
  margin: 0px;
  font-family: ${fontFamily};
  
`
const Price = styled.p`
  margin: 0px;
  font-family: ${fontFamily};
  
`

const PurchaseSection = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;  
  align-items: center;
`

const ItemAvailability = styled.div`


`

const ItemPrice = styled.div`

`

const Cartbutton = styled.div`

`

const CompanyInfoWrapper = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;
`
const CompanyInfo = styled.div`

  text-align: center;
  background-color: black;
  color: whitesmoke;
  width: 25%;
  
`
const CompanyName = styled.p`
  margin: 0px;
  font-family: ${fontFamily};
`
const Country = styled.p`
  margin: 0px;
  font-family: ${fontFamily};
`
const CompanyLink = styled(Link)`
  margin: 0px;
  font-family: ${fontFamily};
  text-decoration: none;
  color: whitesmoke;
`

