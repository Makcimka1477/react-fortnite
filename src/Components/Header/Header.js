import './header.scss';
import logo from '../../images/FortniteLogo.png';
import { Link } from "react-router-dom";


const Header = () => {
  return (
    <div className="header padding">
      <div className="header__logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <a className="header__links">github</a>
    </div>
  );
}

export default Header;
