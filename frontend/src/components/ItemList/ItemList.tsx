import data from "../../../dummyData.json";
import style from "./ItemList.module.css";

import { useState } from "react";
import ConfirmItemModal from "../Modals/ConfirmItem";

const ItemList = () => {
  const [showModal, setShowModal] = useState(false);

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div style={{ marginBottom: "5em" }}>
      <h2>Present lista</h2>
      <p>Här är en lista med presenter som vi önskar oss</p>
      <div className={style.ItemListContainer}>
        {/* All info of items show on a single row*/}
        {data.items.map((item) => (
          <div key={item.name} className={style.Item}>
            {item.url ? (
              <a
                href={item.url}
                target="blank"
                style={{
                  color: item.claimed ? "GrayText" : "",
                  textAlign: "left",
                }}
              >
                <b>{capitalizeFirstLetter(item.name)}</b>
              </a>
            ) : (
              <span
                style={{
                  color: item.claimed ? "GrayText" : "",
                  textAlign: "left",
                }}
              >
                <b>{capitalizeFirstLetter(item.name)}</b>
              </span>
            )}
            {/* If the item is claimed, showed it as grayed out */}
            <input
              type="checkbox"
              defaultChecked={item.claimed}
              onClick={() => setShowModal(true)}
            />
            {showModal && (
              <ConfirmItemModal
                setShowModal={setShowModal}
                itemName={item.name}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
