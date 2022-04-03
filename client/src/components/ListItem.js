import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { AppContext } from "./AppContext";

const ListItem = ({ item }) => {
  const [showButton, setShowButton] = useState(false);
  const {
    items,
    actions: { addItemToCart },
  } = useContext(AppContext);
  return (
    <Wrapper
      onMouseOver={() => {
        setShowButton(true);
      }}
      onMouseLeave={() => {
        setShowButton(false);
      }}
    >
      <StyledLi key={Math.floor(Math.random() * 8008135)}>
        <ItemContainer>
          <StyledLink to={`/item/${item._id}`}>
            <ItemInnerBox>
              <div>
                <StyledImg src={item.imageSrc} />
                <StyledItemName>
                  {item.name.length < 65
                    ? item.name
                    : item.name.slice(0, 65) + "..."}
                </StyledItemName>
              </div>
              {item.numInStock === 0 && <OOSRibbon>Sold out</OOSRibbon>}
              <PriceAndBtn>
                <StyledItemPrice>{item.price}</StyledItemPrice>
                {showButton && (
                  <StyledButton
                    onClick={(ev) => {
                      ev.preventDefault();
                      ev.stopPropagation();
                      addItemToCart(item);
                    }}
                    disabled={item.numInStock === 0}
                    isInStock={item.numInStock > 0}
                  >
                    {item.numInStock > 0 ? "Add to Cart" : "Sold out"}
                  </StyledButton>
                )}
              </PriceAndBtn>
            </ItemInnerBox>
          </StyledLink>
        </ItemContainer>
      </StyledLi>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* transition: height 2s ease-in-out; */
`;

const OOSRibbon = styled.div`
  color: #ff5b9d;
  font-family: "RevampedFont";
  font-size: 1.5rem;
  position: relative;
  text-decoration: underline;
  text-underline-offset: 5px;
  text-shadow: 0 0 7px #ff0066, 0 0 3px #ff0066, 0 0 12px #ff0066;
  top: 15%;
  left: 1%;
  width: fit-content;
  transform: rotate(-6deg);
  margin: 0;
  padding: 0;
`;

const PriceAndBtn = styled.div`
  /* display: flex; // already inheriting flex properties
  flex-direction: column; */
  justify-content: space-between;
  height: 70px;
`;

const StyledButton = styled.button`
  background-color: black;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 25px;
  cursor: pointer;
  transition: all 200ms ease-in-out;
  &:hover {
    box-shadow: ${(prop) =>
      prop.isInStock
        ? "0 0 7px #fff, 0 0 3px #0fa, 0 0 12px #0fa"
        : "0 0 7px #fff, 0 0 3px #ff0066, 0 0 12px #ff0066"};
  }
`;

const StyledItemPrice = styled.p`
  font-size: large;
  color: lightgrey;
`;

const StyledItemName = styled.p`
  font-weight: bold;
  color: lightgrey;
  text-align: center;
  line-height: 1.5;
  overflow-wrap: anywhere;
`;

const ItemInnerBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  div {
    align-items: center;
    display: flex;
    flex-direction: column;
  }
`;

const glow = keyframes`
from {
  box-shadow: none;
}
to {
  box-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #0fa, 0 0 42px #0fa;
}
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 250px;
  height: 350px;
  padding: 20px;
  /* border: solid 1px white; */
  background-color: var(--realDarkGrey);
  border-radius: 10px;
  /* transition: all 1s ease-in-out; */
  animation: ${glow} 1s ease-in-out reverse forwards;

  :hover {
    /* height: 300px; */
    /* transform: scale(1.1); */
    /* ,0 0 82px #0fa, 0 0 92px #0fa, 0 0 102px #0fa, 0 0 151px #0fa; */
    /*  */
    /* transition: box-shadow 0.5s ease-in-out; */
    /* box-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #0fa, 0 0 42px #0fa; */
    animation: ${glow} 1s ease-in-out forwards;
  }
`;

const StyledImg = styled.img`
  border-radius: 25px;
  height: 80px;
  margin-bottom: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  height: 100%;
  width: 100%;
`;
const StyledLi = styled.li`
  list-style-type: none;
`;

export default ListItem;
