// * styling

// * Components
import { useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import AddTask from "./Components/AddTask";
import TaskItem from "./Components/TaskItem";
import axios from "axios";
import Pagination from "./Components/Pagination";

function App() {
  const {
    isOpen: iSOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  const [isTaskUpdated, setIsTaskUpdated] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  console.log("currentPage: ", currentPage);
  const [totalPage, setTotalPage] = useState(1);

  const [tasks, setTasks] = useState([]);

  async function getDate() {
    try {
      let res = await axios.get(
        `http://localhost:3000/task?_page=${currentPage}`
      );

      setTasks(res.data.data);
      setTotalPage(Math.ceil(res.data.data.length / 10));
    } catch (error) {
      console.log(error);
    }
  }
  async function getSortedDate(e) {
    // Assuming you want to update the state with sorted tasks
    console.log(tasks);
    try {
      let res = await axios(
        `http://localhost:3000/task?IsCompleted=${e.target.value}`
      );
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function filterbyDateAndTime(e) {
    if (e.target.value == "desc") {
      try {
        let res = await axios.get(`http://localhost:3000/task?_sort=Date`);
        setTasks(res.data);
      } catch (error) {
        console.log("error: ", error);
      }
    } else {
      getDate();
    }
  }

  useEffect(() => {
    getDate();
  }, [isTaskUpdated, currentPage]);

  console.log(tasks);
  return (
    <>
      <div className="  w-[90vw]  max-w-[1200px] mt-8 m-auto sm:w-[80vw]">
        <div>
          <nav className="bg-red-400 h-10 sm:h-12 rounded-md flex justify-center items-center w-full">
            <h1 className="font-mono  text-xl sm:text-3xl lg:text-4xl">
              TODO APP
            </h1>
          </nav>
        </div>

        <div className="flex flex-col sm:flex-row mt-2">
          <div className="flex-1 flex  gap-2 sm:gap-4 flex-col sm:flex-row mb-2 sm:mb-4 text-sm sm:text-base lg:text-lg">
            <select
              name="SortByDate"
              className="h-10  bg-blue-200 outline-none rounded-[6px]"
              onChange={(e) => filterbyDateAndTime(e)}
            >
              <option value="">Sort by Date and time</option>
              <option value="asc">Newest First</option>
              <option value="desc">Oldest first</option>
            </select>
            <select
              onChange={(e) => getSortedDate(e)}
              name="CompleteStatus"
              className="h-10  bg-blue-200 outline-none rounded-[6px]"
            >
              <option value="">Filter by Complete Status</option>
              <option value="true">Completed</option>
              <option value="false">Pending</option>
            </select>
          </div>

          <div className="text-sm sm:text-base lg:text-lg">
            <button
              className="h-10   bg-blue-300 w-full  px-2 outline-none rounded-[6px]"
              onClick={onOpenModal}
            >
              Add task <AddIcon />
            </button>
          </div>
        </div>
        <AddTask
          onClose={onCloseModal}
          isOpen={iSOpenModal}
          isTaskUpdated={isTaskUpdated}
          setIsTaskUpdated={setIsTaskUpdated}
        />
        {tasks.map((task) => {
          return (
            <TaskItem
              key={task.id}
              {...task}
              setIsTaskUpdated={setIsTaskUpdated}
            />
          );
        })}
      </div>
      <Pagination
        setTotalPage={setTotalPage}
        totalPage={totalPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
}

export default App;
