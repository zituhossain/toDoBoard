/* eslint-disable react/prop-types */
import { useState } from "react";
import TodoItem from "./TodoItem";

const Column = ({ title, items, onMove, onAdd }) => {
  const [newItem, setNewItem] = useState({ title: "", description: "" });

  const handleAdd = () => {
    onAdd(newItem);
    setNewItem({ title: "", description: "" });
  };

  return (
    <div className="w-1/3 p-4">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {title === "New" && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Title"
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
            className="block w-full mb-2 p-2 border rounded"
          />
          <textarea
            placeholder="Description"
            value={newItem.description}
            onChange={(e) =>
              setNewItem({ ...newItem, description: e.target.value })
            }
            className="block w-full mb-2 p-2 border rounded"
          />
          <button
            onClick={handleAdd}
            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
          >
            Add
          </button>
        </div>
      )}
      {items.map((item) => (
        <TodoItem key={item.id} item={item} onMove={onMove} />
      ))}
    </div>
  );
};

export default Column;
