import React, { useState, FC } from "react";
import { useDispatch } from "react-redux";
import ReactDom from "react-dom";
import "./itemModal.scss";

import { addTodos, Todo } from "../../store/todos";

interface ItemModalProps {
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
}

interface payload {
  todo: Todo;
}

const ItemModal: FC<ItemModalProps> = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [checked, setChecked] = useState(false);

  if (!open) return null;

  const handleTodoAdd = () => {
    const payload: payload = {
      todo: {
        name,
        checked,
      },
    };
    dispatch(addTodos(payload));
    setName("");
    setChecked(false);
    onClose();
  };

  const portalDiv = document.getElementById("portal")!;

  return ReactDom.createPortal(
    <>
      <div className="modalOverlay" />
      <div className="itemModal">
        <button onClick={onClose} className="btn-close close__button" />
        <div className="itemModal__container">
          <div className="itemModal__header">
            <p>Add todo</p>
          </div>
          <input
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          ></input>
          <div>
            Checked
            <input
              type="checkbox"
              checked={checked}
              className="itemModal__checkbox"
              onChange={() => setChecked(!checked)}
            ></input>
          </div>
          <button className="btn btn-secondary close" onClick={onClose}>
            Close
          </button>
          <button
            className="btn btn-primary save__button"
            onClick={handleTodoAdd}
          >
            {"Add"}
          </button>
        </div>
      </div>
    </>,
    portalDiv
  );
};

export default ItemModal;
