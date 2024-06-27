import { useEffect, useState } from "react";
import Column from "./Column";

const Todo = () => {
  const [items, setItems] = useState(
    localStorage.getItem("items")
      ? JSON.parse(localStorage.getItem("items"))
      : []
  );
  const [id, setId] = useState(1);

  const handleAdd = (item) => {
    setItems([...items, { ...item, id: id, status: "New", dueDate: null }]);
    setId(id + 1);
  };

  const handleMove = (itemId, status) => {
    setItems(
      items.map((item) => (item.id === itemId ? { ...item, status } : item))
    );
  };

  const handleDueDate = (itemId, dueDate) => {
    setItems(
      items.map((item) => (item.id === itemId ? { ...item, dueDate } : item))
    );
  };

  const filterItemsByStatus = (status) => {
    return items.filter((item) => item.status === status);
  };

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <div className="min-h-screen min-w[400px] bg-blue-950 p-4">
      <h1 className="text-3xl font-bold text-center text-white mb-4">
        To-do Board
      </h1>

      <div className="flex flex-col md:flex-row justify-between gap-4">
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
          onSetDueDate={handleDueDate}
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
