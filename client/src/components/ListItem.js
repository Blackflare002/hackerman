import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
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
          <StyledItemName>{item.name.length < 50 ? item.name : item.name.slice(0, 50) + "..."}</StyledItemName>
          <StyledItemPrice>{item.price}</StyledItemPrice>
          {item.numInStock === 0 && <OOSRibbon>Sold out</OOSRibbon>}
          </div>
              {showButton  &&
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
              }
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
  font-size: 1.1rem;
  position: relative;
  text-decoration: underline;
  text-underline-offset: 5px;
  text-shadow: 0 0 7px #ff0066, 0 0 3px #ff0066, 0 0 12px #ff0066;
  top: -19%;
  left: 1%;
  width: fit-content;
  transform: rotate(-6deg);
  margin: 0;
  padding: 0;
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
    justify-content: flex-start;
    gap: 25px;

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

  :hover {
    /* height: 300px; */
    transition: box-shadow 0.5s ease-in-out;
    /* transform: scale(1.1); */
    box-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #0fa, 0 0 42px #0fa;
    /* ,0 0 82px #0fa, 0 0 92px #0fa, 0 0 102px #0fa, 0 0 151px #0fa; */
  }
`;

const StyledImg = styled.img`
  height: 80px;
  border-radius: 25px;
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
