import { useContext } from "react";
import styled from "styled-components";
import { AppContext } from "./AppContext";

const Confirm = () => {
  const { completedOrder } = useContext(AppContext);
  return (
    <Wrapper>
      {completedOrder && (
        <>
          <div>
            <ul>
              <Item>
                <Title>Order completed</Title>
                <Dashed></Dashed>
                <span>.</span>
              </Item>
              <Item>
                <span>.</span>
                <Dashed></Dashed>
                <span>.</span>
              </Item>
              {completedOrder.items.map((item) => {
                return (
                  <Item>
                    <span>{item.name}</span>
                    {item.numPurchased > 1 && (
                      <span style={{ marginLeft: "1rem", fontWeight: "bold" }}>
                        x{item.numPurchased}
                      </span>
                    )}
                    <Dashed></Dashed>
                    <span>
                      $
                      {(
                        item.numPurchased * Number(item.price.slice(1))
                      ).toFixed(2)}
                    </span>
                  </Item>
                );
              })}
              <Item>
                <span>.</span>
                <Dashed></Dashed>
                <span>.</span>
              </Item>
              <Item>
                <span>.</span>
                <Dashed></Dashed>
                <span style={{ fontSize: "1rem" }}>
                  Total: ${completedOrder.totalCost}
                </span>
              </Item>
            </ul>
          </div>
        </>
      )}
    </Wrapper>
  );
};

export default Confirm;

const Dashed = styled.div`
  margin: 0 5px;
  border-bottom: dashed #a6ffe1 2px;
  box-shadow: 1px 1px 7px #0fa, 0 0 10px #0fa, 0 0 21px #0fa, 0 0 42px #0fa,
    0 0 82px #0fa, 0 0 92px #0fa;
  flex: 1;
  height: 1px;
  position: relative;
  top: 12px;
`;

const Item = styled.li`
  display: flex;
  font-size: 0.6rem;
  justify-content: space-between;
  line-height: 20px;
  margin-bottom: 3px;
  width: 100%;
`;

const Title = styled.span`
  font-size: 1rem;
  /* margin-bottom: 5px; */
`;

const Wrapper = styled.div`
  background-color: #131313;
  border-radius: 12%;
  border: 10px black solid;
  padding: 35px;
  margin-top: 150px;
  align-self: center;
  text-shadow: 0 0 7px #0fa, 0 0 10px #0fa, 0 0 21px #0fa, 0 0 42px #0fa,
    0 0 82px #0fa, 0 0 92px #0fa;
  box-shadow: -5px 5px 5px #00ffaa4c, -5px 6px 8px #00ffaa36, -2px 3px 10px #00ffaa5a;
  * {
    font-family: "Press Start 2P", cursive;
  }

  transform: rotate(8deg) skew(15deg, -8deg);

  width: 40%;
`;
