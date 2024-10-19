import style from "./Navbar.module.css";
import { useNameContext } from "../../contexts/name-context";
import EnterNameModal from "../Modals/EnterName";

import babySvg from "../../../baby.svg";
import { useState } from "react";

const Navbar = () => {
  const { name } = useNameContext();
  const [showModal, setShowModal] = useState(false);

  return (
    <header className={style.navbarContainer}>
      <nav>
        <div>
          <a href="/">
            <img src={babySvg} alt="Email logo" />
          </a>
        </div>
        <p
          onClick={() => {
            setShowModal(true);
          }}
        >
          Your name: {name.name}
        </p>
      </nav>
      {showModal && <EnterNameModal setShowModal={setShowModal} />}
    </header>
  );
};

export default Navbar;
