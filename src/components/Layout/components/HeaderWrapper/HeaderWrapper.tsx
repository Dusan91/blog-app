import { useNavigate } from "react-router-dom";
import Button from "../../../Button";
import Header from "../../../Header";
import { HeaderLink, SiteName } from "./styles";

const HeaderWrapper: React.FC = (): React.ReactElement => {
  const isAuthenticated = Boolean(localStorage.getItem("user"));
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <Header>
      <SiteName to="/">
        BRAME - <small>blog app</small>
      </SiteName>
      <div>
        {!isAuthenticated ? (
          <HeaderLink to="/login">Login</HeaderLink>
        ) : (
          <>
            <HeaderLink to="/admin">Admin</HeaderLink>
            <Button onClick={handleLogout}>Logout</Button>
          </>
        )}
      </div>
    </Header>
  );
};

export default HeaderWrapper;
