import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AppContext } from "./AppContext";
import ListItem from "./ListItem";

const Homepage = () => {
  const { items } = useContext(AppContext);
  //
  return (
    <div>
      <StyledUl>
        <Wrapper>
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
