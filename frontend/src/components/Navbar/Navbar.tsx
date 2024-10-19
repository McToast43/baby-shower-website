import style from "./Navbar.module.css";
import { useNameContext } from "../../contexts/name-context";
import EnterNameModal from "../Modals/EnterName";
import CreateItemModal from "../Modals/CreateItem";

import babySvg from "../../../baby.svg";
import { useState } from "react";

const Navbar = () => {
  const { name } = useNameContext();
  const [showNameModal, setshowNameModal] = useState(false);
  const [showCreateItemModal, setShowCreateItemModal] = useState(false);

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
            setshowNameModal(true);
          }}
        >
          Your name: {name.name}
        </p>
        {name.name === "Ben" || name.name === "Arlene" ? (
          <button
            onClick={() => {
              setShowCreateItemModal(true);
            }}
          >
            Lägga till present
          </button>
        ) : (
          <></>
        )}
      </nav>
      {showNameModal && <EnterNameModal setShowModal={setshowNameModal} />}
      {showCreateItemModal && (
        <CreateItemModal setShowModal={setShowCreateItemModal} />
      )}
    </header>
  );
};

export default Navbar;
