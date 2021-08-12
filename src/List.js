import React from "react";
import { FaEdit, FaCheck } from "react-icons/fa";
const List = ({ items, removeItem, editItem }) => {
  return (
    <div className="todo-list">
      {items.map((item) => {
        const { id, title } = item;
        return (
          <article key={id} className="todo-item">
            <p className="title">{title}</p>
            <div className="btn-container">
              <button
                type="button"
                className="edit-btn"
                onClick={() => editItem(id)}
              >
                <FaEdit />
              </button>

              <button
                type="button"
                className="delete-btn"
                onClick={() => removeItem(id)}
              >
                <FaCheck />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
