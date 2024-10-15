import style from "./ItemList.module.css";

import { useEffect, useState } from "react";
import ConfirmItemModal from "../Modals/ConfirmItem";
import { Item } from "../../types";

const capitalizeFirstLetter = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const ItemList = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | undefined>(undefined);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch(
        "https://dcjxtfwogo54re36b263h2fyhm0cvfku.lambda-url.eu-west-1.on.aws/items",
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setItems(data);
    };

    fetchItems();
  }, []);

  //const items = request.then((response) => response.json());

  return (
    <div style={{ marginBottom: "5em" }}>
      <h2>Present lista</h2>
      <p>Här är en lista med presenter som vi önskar oss</p>
      <div className={style.ItemListContainer}>
        {/* All info of items show on a single row*/}
        {items.map((item) => (
          <div key={item.sk} className={style.Item}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span>
                <img
                  className={style.ItemImageBox}
                  src={
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
              defaultChecked={item.claimed}
              onClick={() => {
                setSelectedItem(item);
                setShowModal(true);
              }}
            />
            {showModal && (
              <ConfirmItemModal
                setShowModal={setShowModal}
                item={selectedItem}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
