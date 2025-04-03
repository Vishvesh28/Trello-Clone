const storage = window.localStorage;

export const BOARD_KEY = "board";
export const LIST_COUNT_KEY = "listCount";
export const TASK_COUNT_KEY = "taskCount";

export default {
  getBoards() {
    const boards = JSON.parse(storage.getItem(BOARD_KEY));
    return boards === null ? [] : boards;
  },
  setBoards(data) {
    storage.setItem(BOARD_KEY, JSON.stringify(data));
  },
  setListCount(data) {
    storage.setItem(LIST_COUNT_KEY, data);
  },
  getListCount() {
    return storage.getItem(LIST_COUNT_KEY) ? parseInt(storage.getItem(LIST_COUNT_KEY)) : 0;
  },
  setTaskCount(data) {
    storage.setItem(TASK_COUNT_KEY, data);
  },
  getTaskCount() {
    return storage.getItem(TASK_COUNT_KEY) ? parseInt(storage.getItem(TASK_COUNT_KEY)) : 1000;
  }
};





