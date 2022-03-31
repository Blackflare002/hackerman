import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AppContext } from "./AppContext";
import ListItem from "./ListItem";

const Homepage = () => {
  const { items, addItemToCart } = useContext(AppContext);
  //
  return (
    <div>
      <StyledUl>
        <Wrapper>
          {/* maps though the item array and returns a ListItem component for each. */}
          {items && items.map((item) => <ListItem item={item}></ListItem>)}
        </Wrapper>
      </StyledUl>
    </div>
  );
};

const StyledUl = styled.ul`
  padding: 0;
  margin: 0;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

export default Homepage;
