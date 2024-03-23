// * styling

// * Components
import { useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import AddTask from "./Components/AddTask";
import TaskItem from "./Components/TaskItem";
import axios from "axios";

function App() {
  const {
    isOpen: iSOpenModal,
    onOpen: onOpenModal,
    onClose: onCloseModal,
  } = useDisclosure();

  const [isTaskUpdated, setIsTaskUpdated] = useState(false);

  const [tasks, setTasks] = useState([]);

  async function getDate() {
    try {
      let res = await axios.get(`http://localhost:3000/task`);
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  async function getSortedDate() {
    try {
      let res = await axios(`http://localhost:3000/task`);
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  }

 

  useEffect(() => {
    getDate();
  }, [isTaskUpdated]);

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
            >
              <option value="">Sort by Date and time</option>
              <option value="asc">Newest First</option>
              <option value="desc">Oldest first</option>
            </select>
            <select
              name="CompleteStatus"
              className="h-10  bg-blue-200 outline-none rounded-[6px]"
            >
              <option value="">Filter by Complete Status</option>
              <option value="asc">Completed</option>
              <option value="desc">Pending</option>
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
          return <TaskItem key={task.id} {...task} setIsTaskUpdated={setIsTaskUpdated} />;
        })}
      </div>
    </>
  );
}

export default App;
