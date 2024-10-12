//Will show up when claiming a gift

//Will show the name of the item and the name of the person who is claiming it
//Options to confirm or cancel
type ModalProps = {
  setShowModal: (value: boolean) => void;
  itemName: string;
};

const ConfirmItemModal = ({ setShowModal, itemName }: ModalProps) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Bekräfta din present</h2>
        <p>Bekräfta att du vill köpa {itemName} till de blivande föräldarna.</p>
        <div>
          <button onClick={() => setShowModal(false)}>Confirm</button>
          <button onClick={() => setShowModal(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmItemModal;
