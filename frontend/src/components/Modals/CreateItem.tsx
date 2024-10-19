import { useState } from "react";
import { useItemsContext } from "../../contexts/items-context";
import { ItemNew, Item } from "../../types";

type ModalProps = {
  setShowModal: (value: boolean) => void;
};

const CreateItemModal = ({ setShowModal }: ModalProps) => {
  const { items, setItems } = useItemsContext();
  const [formData, setFormData] = useState<ItemNew>({
    name: "",
    url: "",
    imgUrl: "",
  });
  const [subbmitting, setSubmitting] = useState(false);

  const createItem = async (item: ItemNew) => {
    try {
      const response = await fetch(
        `https://dcjxtfwogo54re36b263h2fyhm0cvfku.lambda-url.eu-west-1.on.aws/items/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        }
      );

      if (response.status !== 202) {
        throw new Error(await response.json());
      }

      const parsed = (await response.json()) as { message: string; item: Item };
      return parsed;
    } catch (error) {
      console.error(error);
      alert("Failed to claim item. Error: " + error);
      throw error;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setSubmitting(true);
    e.preventDefault();
    const newItem = await createItem(formData);
    setItems([...items, newItem.item]);
    setShowModal(false);
    setSubmitting(false);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Lägg till present</h2>

        {subbmitting ? (
          <>
            <p>Submitting...</p>
            <span className="spinner"></span>
          </>
        ) : (
          <>
            <p>
              Fyll i fälten nedan för att lägga till en present till listan.
            </p>
            <form onSubmit={handleSubmit} className="modal-form">
              <div>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="url">URL:</label>
                <input
                  type="url"
                  id="url"
                  name="url"
                  value={formData.url}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="imgUrl">Image URL:</label>
                <input
                  type="url"
                  id="imgUrl"
                  name="imgUrl"
                  value={formData.imgUrl}
                  onChange={handleChange}
                />
              </div>
              <span>
                <p>Image Preview</p>
                {formData.imgUrl ? (
                  <img src={formData.imgUrl} alt={formData.name} />
                ) : (
                  <span
                    style={{ height: "72px", display: "inline-block" }}
                  ></span>
                )}
              </span>
              <span>
                <button type="submit">Add Item</button>
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
              </span>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateItemModal;
