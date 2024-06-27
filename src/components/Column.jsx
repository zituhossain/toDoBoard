/* eslint-disable react/prop-types */

import { useState } from "react";
import TodoItem from "./TodoItem";

const Column = ({
  title,
  items,
  onAdd,
  onMove,
  onSetDueDate,
  handleDelete,
}) => {
  const [newItem, setNewItem] = useState({ title: "", description: "" });

  const handleAdd = () => {
    if (newItem.title === "") {
      return alert("Please enter a title");
    }
    onAdd(newItem);
    setNewItem({ title: "", description: "" });
  };

  return (
    <div className="w-full md:w-1/3 bg-gray-200 p-4 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {title === "New" && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Title"
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
            className="block w-full mb-2 p-2 border rounded-lg"
          />
          <textarea
            placeholder="Description"
            value={newItem.description}
            onChange={(e) =>
              setNewItem({ ...newItem, description: e.target.value })
            }
            className="block w-full mb-2 p-2 border rounded-lg resize-none overflow-hidden"
            rows={4} // Adjust the number of rows as needed
          />
          <button
            onClick={handleAdd}
            className="bg-slate-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      )}
      {items.map((item) => (
        <TodoItem
          key={item.id}
          item={item}
          onMove={onMove}
          onSetDueDate={onSetDueDate}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default Column;
