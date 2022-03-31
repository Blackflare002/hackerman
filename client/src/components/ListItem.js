import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AppContext } from "./AppContext";

const ListItem = ({ item }) => {
  const [showButton, setShowButton] = useState(false);
  return (
    <div>
      <StyledLi key={Math.floor(Math.random() * 8008135)}>
        <ItemContainer>
          <StyledLink to={`/item/${item._id}`}>
            <ItemInnerBox>
              <StyledImg src={item.imageSrc} />
              <StyledItemName>{item.name}</StyledItemName>
              <StyledItemPrice>{item.price}</StyledItemPrice>
            </ItemInnerBox>
          </StyledLink>
        </ItemContainer>
      </StyledLi>
    </div>
  );
};

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
  height: 250px;
  padding: 10px;
  /* border: solid 1px white; */
  background-color: var(--realDarkGrey);
  border-radius: 10px;
  transition: height 0.5s ease-in-out;

  :hover {
    height: 300px;
    transition: height 0.5s ease-in-out;
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
