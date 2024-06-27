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
  // State to manage the new item being added
  const [newItem, setNewItem] = useState({ title: "", description: "" });

  // Function to handle adding a new item
  const handleAdd = () => {
    // Validate that the title is not empty
    if (newItem.title === "") {
      return alert("Please enter a title");
    }
    // Call the onAdd function passed via props to add the new item
    onAdd(newItem);
    // Reset the newItem state to clear the input fields
    setNewItem({ title: "", description: "" });
  };

  return (
    <div className="w-full md:w-1/3 bg-gray-200 p-4 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {/* Show input fields for adding a new item only if the column title is "New" */}
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
            rows={4}
          />
          <button
            onClick={handleAdd}
            className="bg-slate-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      )}
      {/* Render the list of TodoItem components */}
      {items.map((item, index) => (
        <TodoItem
          key={index}
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
