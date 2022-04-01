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
      onMouseEnter={() => {
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
              <StyledImg src={item.imageSrc} />
              <StyledItemName>{item.name}</StyledItemName>
              <StyledItemPrice>{item.price}</StyledItemPrice>
              {showButton ? (
                <StyledButton
                  onClick={(ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    addItemToCart(item);
                  }}
                >
                  Add to Cart
                </StyledButton>
              ) : null}
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

const StyledButton = styled.button`
  background-color: black;
  color: white;
  border: none;
  padding: 10px;
  border-radius: 25px;
`;

const StyledItemPrice = styled.p`
  font-size: large;
`;

const StyledItemName = styled.p`
  font-weight: bold;
  text-align: center;
`;

const ItemInnerBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const ItemContainer = styled.div`
  width: 250px;
  height: 300px;
  padding: 10px;
  /* border: solid 1px white; */
  background-color: var(--realDarkGrey);
  border-radius: 10px;
  /* transition: all 1s ease-in-out; */

  :hover {
    /* height: 300px; */
    transition: box-shadow 0.5s ease-in-out;
    /* transform: scale(1.1); */
    box-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa,
      0 0 82px #0fa, 0 0 92px #0fa, 0 0 102px #0fa, 0 0 151px #0fa;
  }
`;

const StyledImg = styled.img`
  height: 80px;
  border-radius: 25px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
const StyledLi = styled.li`
  list-style-type: none;
`;

export default ListItem;
