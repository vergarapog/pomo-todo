import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";
import Timer from "./Timer";
import Sound from "react-sound";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // display alert
      showAlert(true, "danger", "Enter a value");
    } else if (name && isEditing) {
      //deal with edit
      setList(
        list.map((item) => {
          if (item.id === editId) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditId(null);
      setIsEditing(false);
      showAlert(true, "success", "to-do changed");
    } else {
      // show alert item added
      // add item
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
      showAlert(true, "success", "to-do added");
    }
  };
  const showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };
  const clearList = () => {
    setList([]);
    showAlert(true, "danger", "To-do list is cleared");
  };
  const removeItem = (id) => {
    const newList = list.filter((item) => {
      return item.id !== id;
    });
    setList(newList);
    showAlert(true, "success", "Item Marked as Done");
  };
  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id);
    setName(specificItem.title);
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);
  return (
    <section className="section-center">
      <section className="section-pomo">
        <Timer />
      </section>

      <form className="todo-form" onSubmit={handleSubmit} action="">
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3 className="title">Pomodoro Timer</h3>
        <div className="form-control">
          <input
            type="text"
            className="todo"
            placeholder="Type your to-do here"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="todo-container">
          <List items={list} removeItem={removeItem} editItem={editItem} />
          <button className="clear-btn" onClick={() => clearList()}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
