import data from "../../../dummyData.json";

const ItemList = () => {
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div>
      <h2>Present lista</h2>
      <p>Här är en lista med presenter som vi önskar oss</p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0px",
          alignItems: "start",
          marginLeft: "5em",
          marginRight: "5em",
        }}
      >
        {/* All info of items show on a single row*/}
        {data.items.map((item) => (
          <div
            key={item.name}
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <p>
              <b> {capitalizeFirstLetter(item.name)}</b>
            </p>
            {/* If the item is claimed, showed it as grayed out */}
            <p>Inköpt: {item.claimed ? "✅" : "❌"}</p>
            {item.claimed ? <p>Inköpt av: {item.claimer}</p> : null}
            {/* On Click should open the confirm modal. For now there will be no support for unclicking :P */}
            <input type="checkbox" defaultChecked={item.claimed} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
