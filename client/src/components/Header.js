import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Link to={`/`}>
        <h1>Header</h1>
      </Link>
    </div>
  );
};
