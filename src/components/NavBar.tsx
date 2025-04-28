import { Link } from "react-router-dom";

const NavBar = () => {
  const token = localStorage.getItem("token");

  return (
    <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          E-commerce
        </Link>
        <div className="col-md-3 text-end">
          {token && (
            <Link className="btn btn-outline-dark me-2" to="/create-product">
              Create Product
            </Link>
          )}
          {!token && (
            <Link className="btn btn-outline-dark me-2" to="/login">
              Login
            </Link>
          )}
          {!token && (
            <Link className="btn btn-success" to="/signup">
              Sign-up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
