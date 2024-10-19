import { useEffect, useState } from "react";
import { useNameContext } from "../../contexts/name-context";
import EnterNameModal from "../Modals/EnterName";

const Hero = () => {
  // Padding to the top and bottom of the hero section
  // The text is centered
  // Background is either a gradient or a photo with a gradient overlay

  // Header with the text "Det blir en tös!!"
  // Text about the event
  // Text about the date and time
  // Text explaing the wish list and how to claim a gift

  const { name } = useNameContext();
  const [showModal, setShowModal] = useState(!name);

  useEffect(() => {
    setShowModal(!name.name);
  }, [name]);

  return (
    <div
      style={{
        marginLeft: "5em",
        marginRight: "5em",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "0.5em",
      }}
    >
      <h1 style={{ fontFamily: "cursive" }}>Det blir en tös!!</h1>
      <p>
        Vi vill fira att det blir en tös och bjud in er till en liten Baby
        Shower för att fira detta.
        <br />
        Det bjuds på tårta och mat. Ni bjuder på er själva och en present.
      </p>
      <p>Lördagen den 30:e November kl 13:00</p>
      {/* Add countdown here :) */}
      <p>
        Här neranför ser ni en lista på saker som vi önskar oss. Om ni vill köpa
        en present så klickar ni på den och bekräftar att ni köper den.
      </p>
      {/* <button onClick={() => setShowModal(true)}>Enter Name</button> */}
      {showModal && <EnterNameModal setShowModal={setShowModal} />}
    </div>
  );
};

export default Hero;
