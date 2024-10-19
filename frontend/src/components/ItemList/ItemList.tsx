import style from "./ItemList.module.css";

import { useState } from "react";
import { useItemsContext } from "../../contexts/items-context";
import { useNameContext } from "../../contexts/name-context";

import ConfirmItemModal from "../Modals/ConfirmItem";
import { Item } from "../../types";

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const ItemList = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | undefined>(undefined);

  const { items } = useItemsContext();
  const { name } = useNameContext();

  return (
    <div style={{ marginBottom: "5em" }}>
      <h2>Present lista</h2>
      <div className={style.ItemListContainer}>
        {/* All info of items show on a single row*/}
        {items.map((item) => (
          <div key={item.sk} className={style.Item}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span>
                <img
                  className={style.ItemImageBox}
                  src={
                    item?.imgUrl ??
                    "https://image-resizing.booztcdn.com/bloomingville/blo82058139_cbrown.webp?has_grey=1&has_webp=0&size=w144"
                  }
                  alt={item.name}
                />
              </span>
              {item.url ? (
                <a
                  href={item.url}
                  target="blank"
                  style={{
                    color: item.claimed ? "GrayText" : "",
                    textAlign: "left",
                  }}
                >
                  {capitalizeFirstLetter(item.name)}
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
            </div>
            {/* If the item is claimed, showed it as grayed out */}
            <input
              type="checkbox"
              checked={item.claimed}
              disabled={item.claimed && item.claimedBy !== name.nameSha256}
              onClick={() => {
                setSelectedItem(item);
                setShowModal(true);
              }}
            />
            {showModal && (
              <ConfirmItemModal
                setShowModal={setShowModal}
                itemSk={selectedItem?.sk}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
