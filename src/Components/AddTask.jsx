import {
  Modal,
  Button,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

const initialState = {
  title: "",
  des: "",
  assignedTo: "",
  IsCompleted: "false",
  Date: "",
  Time:""
};

const AddTask = ({ onClose, isOpen, setIsTaskUpdated }) => {
  const [taskInput, setTaskInput] = useState(initialState);
  console.log("taskInput: ", taskInput);
  const toast = useToast();

  function handelinputChange(e) {
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };

    const options2 = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "Asia/Kolkata",
    };

    const currentDate = new Date();
    const currentTime = new Date();
    const formattedDate = new Intl.DateTimeFormat("en-IN", options).format(
      currentDate
    );

    const formattedTime = new Intl.DateTimeFormat("en-IN", options2).format(
      currentTime
      );

    const { name, value } = e.target;
    setTaskInput({ ...taskInput, [name]: value, Date: formattedDate ,Time:formattedTime});
  }

  async function handelSubmit(e) {
    e.preventDefault();

    if (
      taskInput.title == "" ||
      taskInput.des == "" ||
      taskInput.assignedTo == ""
    ) {
      toast({ title: "Please fill all the fields" });
      return;
    }

    try {
      // throw new Error("testing error toast");
      await axios.post(`http://localhost:3000/task`, taskInput);
      toast({
        title: "Task added.",
        description: "Your task has been created.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Addind task Failed.",
        description: "Sorry try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setTaskInput(initialState);
      setIsTaskUpdated((prev) => !prev);
    }
  }

  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay data-cy="chakra-modal" />
        <ModalContent>
          <ModalHeader m="0 auto">Add Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handelSubmit}>
              <label>
                <b>Task Title</b>
                <input
                  placeholder="Task"
                  onChange={handelinputChange}
                  name="title"
                  type="text"
                  className="w-full outline-none border-2 h-10 rounded-md px-2 mb-4"
                />
              </label>
              <br />
              <label>
                <b>Description</b>
                <textarea
                  name="des"
                  id=""
                  cols="47"
                  rows="4"
                  onChange={handelinputChange}
                  placeholder="Describe your task......."
                  className="outline-none border-2 rounded-lg italic p-2  box-sizing: border-box mb-4 "
                ></textarea>
              </label>

              <select
                name="assignedTo"
                id=""
                className="w-full mb-6 outline-none border-2 rounded-md h-10"
                onChange={handelinputChange}
              >
                <option value="">Assigned to</option>
                <option value="Roshan">Roshan</option>
                <option value="Raj">Raj</option>
                <option value="Rahul">Rahul</option>
              </select>

              <Button
                colorScheme="blue"
                type="submit"
                w={"full"}
                onClick={onClose}
              >
                Add
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddTask;
