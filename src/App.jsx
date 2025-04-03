import React, { useState, useEffect } from "react";
import Board from "./Components/Board";
import storageLocal from './Storage/Local';
import Modal from "./Components/Modal"; 
import "./App.css";

const App = () => {
  const [boards, setBoards] = useState([]);
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [isBoardModalOpen, setBoardModalOpen] = useState(false);

  useEffect(() => {
    setBoards(storageLocal.getBoards());
  }, []);

  //  Add a new board using a modal
  const handleAddBoard = () => {
    if (!newBoardTitle.trim()) return;

    const newBoard = {
      id: storageLocal.getListCount() + 1,
      title: newBoardTitle,
      cards: [],
    };

    const updatedBoards = [...boards, newBoard];
    setBoards(updatedBoards);
    storageLocal.setBoards(updatedBoards);
    storageLocal.setListCount(newBoard.id);

    setNewBoardTitle("");
    setBoardModalOpen(false); // Close modal after adding board
  };

  return (
    <div id="app">
      <h1>Trello Clone</h1>

      {/* Add List Button (Opens Modal) */}
      <button onClick={() => setBoardModalOpen(true)} className="btn-add-list">
        Add List
      </button>

      {/* Dashboard */}
      <div id="dashboard">
        <div id="flex-scroll">
          {boards.map((board) => (
            <Board key={board.id} board={board} setBoards={setBoards} boards={boards} />
          ))}
        </div>
      </div>

      {/* Modal for Adding Board */}
      <Modal isOpen={isBoardModalOpen} onClose={() => setBoardModalOpen(false)} title="Add New List">
        <input
          type="text"
          value={newBoardTitle}
          onChange={(e) => setNewBoardTitle(e.target.value)}
          placeholder="Enter list title"
          className="modal-input"
        />
        <button onClick={handleAddBoard} className="modal-btn">
          Create List
        </button>
      </Modal>
    </div>
  );
};

export default App;




