import style from "./Navbar.module.css";
import babySvg from "../../../baby.svg";

const Navbar = () => {
  return (
    <header className={style.navbarContainer}>
      <nav>
        <div>
          <a href="/">
            <img src={babySvg} alt="Email logo" />
          </a>
        </div>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a
              href="https://github.com/bejo-geshdo/temporary-email-service"
              target="_blank"
            >
              About
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
