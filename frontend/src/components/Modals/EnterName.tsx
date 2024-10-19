//This will show up on firt visit to the site
// Should be able to click away, but will show up again when claiming a gift

//Person will enter their name and click submit
//Name will be stored in local storage or cookies
import { useState } from "react";
import crypto from "crypto-js";
import { useNameContext } from "../../contexts/name-context";

type ModalProps = {
  setShowModal: (value: boolean) => void;
};

const EnterNameModal = ({ setShowModal }: ModalProps) => {
  const { name, setName } = useNameContext();

  const [inputName, setNameInput] = useState(name?.name ? name.name : "");

  const handleConfirm = () => {
    const nameSha256 = crypto.SHA256(inputName.toLocaleLowerCase()).toString();
    const newName = { name: inputName, nameSha256: nameSha256 };

    localStorage.setItem("name", JSON.stringify(newName));
    setName(newName);
    setShowModal(false);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Skriv in ditt namn</h2>
        <h3>Name: {name.name}</h3>
        <p>
          Ditt namn används för att hantera ditt val av presenter.
          <br />
          De framtida föräldrar kan inte se ditt namn, så presetsen blir en
          överraskning.
        </p>
        <input
          placeholder="Ditt namn"
          value={inputName}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <div>
          <button onClick={handleConfirm}>Confirm</button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EnterNameModal;
