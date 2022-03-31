import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AppContext } from "./AppContext";

//.get("/items", getItems)
// fetch request
//probably map through the array

const Homepage = () => {
  const { items } = useContext(AppContext);
  //
  return (
    <div>
      <div>This is a page.</div>
      <ul>
        <Wrapper>
          {items &&
            items.map((item) => (
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
            ))}
        </Wrapper>
      </ul>
    </div>
  );
};

const StyledItemPrice = styled.p`
  font-size: larger;
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
`;

const ItemContainer = styled.div`
  width: 250px;
  height: 250px;
  padding: 10px;
  border: solid 1px black;
`;

const StyledImg = styled.img`
  height: 80px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  /* width: 95vw; */
  gap: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
const StyledLi = styled.li`
  list-style-type: none;
`;

export default Homepage;
