import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AppContext } from "./AppContext";

const Homepage = () => {
  const { items } = useContext(AppContext);

  return (
    <div>
      <div>This is a page.</div>
      <ul>
        {items && items.map((item) => (
          <li>
            <Link to={`/item/${item._id}`}>
              {item.name}: ${item.price}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Homepage;
