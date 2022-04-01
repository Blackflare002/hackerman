import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./AppContext";
import ListItem from "./ListItem";
import styled, { keyframes } from "styled-components";

const Homepage = () => {
  const { items, addItemToCart } = useContext(AppContext);
  //
  return (
    <>
      <Hero>
        <div>
          <BigTypography>HACKERMAN</BigTypography>
        </div>
        <div>
          <Tagline>Premium Cyber Gear</Tagline>
        </div>
      </Hero>
      <div>
        <StyledUl>
          <Wrapper>
            {/* maps though the item array and returns a ListItem component for each. */}
            {items &&
              items.map((item) => (
                <ListItem
                  item={item}
                  key={Math.floor(Math.random() * 6942069)}
                ></ListItem>
              ))}
          </Wrapper>
        </StyledUl>
      </div>
    </>
  );
};

const Hero = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 150px;
  gap: 75px;
`;

const Tagline = styled.h1`
  color: white;
  font-size: 40px;
  /* font-weight: bold; */
  font-style: italic;
  text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #4b0082, 0 0 42px #4b0082,
    0 0 82px #4b0082, 0 0 92px #4b0082, 0 0 102px #4b0082, 0 0 151px #4b0082;
`;

const glow = keyframes`
from {
  text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #00cc88, 0 0 42px #00cc88,
    0 0 60px #00cc88, 0 0 50px #00cc88, 0 0 60px #00cc88, 0 0 70px #00cc88;
}
to {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073, 0 0 40px #e60073,
    0 0 50px #e60073, 0 0 60px #e60073, 0 0 70px #e60073;
}
`;

const BigTypography = styled.h1`
  /* text-shadow: 0 0 7px #fff, 0 0 10px #fff, 0 0 21px #fff, 0 0 42px #0fa,
    0 0 82px #0fa, 0 0 92px #0fa, 0 0 102px #0fa, 0 0 151px #0fa; */
  font-size: 145px;
  font-weight: bold;
  color: white;
  font-family: "tronFont";
  animation: ${glow} 2s ease-in-out infinite alternate;
`;

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
