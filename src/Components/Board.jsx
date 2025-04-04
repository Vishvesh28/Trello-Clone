import React, { useState } from "react";
import storageLocal from "../Storage/Local";
import "./Board.css";
import Modal from "./Modal"; 

const Board = ({ board, setBoards, boards }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [isTaskModalOpen, setTaskModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isTaskDeleteModalOpen, setTaskDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  //Delete a board with confirmation modal
  const handleDeleteBoard = () => {
    const updatedBoards = boards.filter((b) => b.id !== board.id);
    setBoards(updatedBoards);
    storageLocal.setBoards(updatedBoards);
    setDeleteModalOpen(false); // Close modal after deletion
  };

  //Add a new task using a modal
  const handleAddTask = () => {
    if (!taskTitle.trim()) return;

    const newTask = {
      id: storageLocal.getTaskCount() + 1,
      list_id: board.id,
      title: taskTitle,
      desc: taskDesc,
    };

    const updatedBoards = boards.map((b) => {
      if (b.id === board.id) {
        return { ...b, cards: [...b.cards, newTask] };
      }
      return b;
    });

    setBoards(updatedBoards);
    storageLocal.setBoards(updatedBoards);
    storageLocal.setTaskCount(newTask.id);

    setTaskTitle("");
    setTaskDesc("");
    setTaskModalOpen(false); 
  };

  //Delete a Task (Card)
  const handleDeleteTask = () => {
    if (!taskToDelete) return;

    const updatedBoards = boards.map((b) => {
      if (b.id === board.id) {
        return { ...b, cards: b.cards.filter((task) => task.id !== taskToDelete) };
      }
      return b;
    });

    setBoards(updatedBoards);
    storageLocal.setBoards(updatedBoards);
    setTaskDeleteModalOpen(false); 
  };

  //Drag & Drop handlers
  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("taskId", taskId);
    e.dataTransfer.setData("sourceBoardId", board.id);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const taskId = parseInt(e.dataTransfer.getData("taskId"));
    const sourceBoardId = parseInt(e.dataTransfer.getData("sourceBoardId"));

    if (sourceBoardId === board.id) return; 

    let movedTask;
    const updatedBoards = boards.map((b) => {
      if (b.id === sourceBoardId) {
        movedTask = b.cards.find((task) => task.id === taskId);
        return { ...b, cards: b.cards.filter((task) => task.id !== taskId) };
      }
      return b;
    });

    if (movedTask) {
      const finalBoards = updatedBoards.map((b) => {
        if (b.id === board.id) {
          return { ...b, cards: [...b.cards, movedTask] };
        }
        return b;
      });

      setBoards(finalBoards);
      storageLocal.setBoards(finalBoards);
    }
  };

  return (
    <div className="board" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
      {/* Board Header */}
      <div className="board-header">
        <span className="board-title">{board.title}</span>
        <button onClick={() => setDeleteModalOpen(true)} className="btn-delete-board">×</button>
      </div>

      {/* Task List */}
      <div className="tasks-style">
        {board.cards.map((card) => (
          <div
            key={card.id}
            className="card-style"
            draggable
            onDragStart={(e) => handleDragStart(e, card.id)}
          >
            <div className="card-header">
              <span className="card-title-style">{card.title}</span>
              <button
                onClick={() => {
                  setTaskToDelete(card.id);
                  setTaskDeleteModalOpen(true);
                }}
                className="btn-delete-task"
              >
                🗑
              </button>
            </div>
            <p>{card.desc}</p>
          </div>
        ))}
      </div>

      {/* Add Task Button (Opens Modal) */}
      <button onClick={() => setTaskModalOpen(true)} className="btn-add-task">
        Add Task
      </button>

      {/* Modal for Adding Task */}
      <Modal isOpen={isTaskModalOpen} onClose={() => setTaskModalOpen(false)} title="Add Task">
        <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          placeholder="Task Title"
          className="modal-input"
        />
        <input
          type="text"
          value={taskDesc}
          onChange={(e) => setTaskDesc(e.target.value)}
          placeholder="Task Description"
          className="modal-input"
        />
        <button onClick={handleAddTask} className="modal-btn">
          Create Task
        </button>
      </Modal>

      {/* Modal for Confirming Board Deletion */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setDeleteModalOpen(false)} title="Delete Board?">
        <p>Are you sure you want to delete this board? This action cannot be undone.</p>
        <button onClick={handleDeleteBoard} className="modal-btn-delete">Delete</button>
      </Modal>

      {/* Modal for Confirming Task Deletion */}
      <Modal isOpen={isTaskDeleteModalOpen} onClose={() => setTaskDeleteModalOpen(false)} title="Delete Task?">
        <p>Are you sure you want to delete this task?</p>
        <button onClick={handleDeleteTask} className="modal-btn-delete">Delete</button>
      </Modal>
    </div>
  );
};

export default Board;



