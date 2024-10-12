//This will show up on firt visit to the site
// Should be able to click away, but will show up again when claiming a gift

//Person will enter their name and click submit
//Name will be stored in local storage or cookies

type ModalProps = {
  setShowModal: (value: boolean) => void;
};

const EnterNameModal = ({ setShowModal }: ModalProps) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Skriv in ditt namn</h2>
        <p>
          Ditt namn används för att hantera ditt val av presenter.
          <br />
          De framtida föräldrar kan inte se ditt namn, så presetsen blir en
          överraskning.
        </p>
        <input placeholder="Ditt namn" />
        <div>
          <button onClick={() => setShowModal(false)}>Confirm</button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EnterNameModal;
