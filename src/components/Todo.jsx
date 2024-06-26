// src/App.js
import { useState } from "react";
import Column from "./Column";

const Todo = () => {
  const [items, setItems] = useState([]);
  const [id, setId] = useState(1);

  const handleAdd = (item) => {
    setItems([...items, { ...item, id: id, status: "New" }]);
    setId(id + 1);
  };

  const handleMove = (itemId, status) => {
    setItems(
      items.map((item) => (item.id === itemId ? { ...item, status } : item))
    );
  };

  const filterItemsByStatus = (status) => {
    return items.filter((item) => item.status === status);
  };

  return (
    <div className="min-h-screen min-w[400px] bg-black p-4">
      <h1 className="text-3xl font-bold text-center text-white mb-4">
        To-do Board
      </h1>

      <div className="flex justify-between gap-4">
        <Column
          title="New"
          items={filterItemsByStatus("New")}
          onAdd={handleAdd}
          onMove={handleMove}
        />
        <Column
          title="Ongoing"
          items={filterItemsByStatus("Ongoing")}
          onAdd={() => {}}
          onMove={handleMove}
        />
        <Column
          title="Done"
          items={filterItemsByStatus("Done")}
          onAdd={() => {}}
          onMove={handleMove}
        />
      </div>
    </div>
  );
};

export default Todo;
