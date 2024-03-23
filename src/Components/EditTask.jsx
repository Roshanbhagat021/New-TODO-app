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
import { useEffect, useState } from "react";

const EditTask = ({ onClose, isOpen, id, setIsTaskUpdated }) => {
  const [taskInfo, setTaskInfo] = useState("");
  console.log("taskInfo: ", taskInfo);

  async function getSelectedTaskDate() {
    try {
      let res = await axios.get(`http://localhost:3000/task?id=${id}`);
      setTaskInfo(res.data[0]);
    } catch (error) {
      console.log("error: ", error);
    }
  }

  useEffect(() => {
    getSelectedTaskDate();
  }, []);

  const toast = useToast();

  function handelinputChange(e) {
    const { name, value } = e.target;
    setTaskInfo({ ...taskInfo, [name]: value });
  }

  async function handleEdit(e) {
    e.preventDefault();

    try {
      // throw new Error("testing error toast");
      await axios.patch(`http://localhost:3000/task/${id}`, taskInfo);
      toast({
        title: "Task edited.",
        description: "Your task has been Updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Task Updation Failed.",
        description: "Sorry try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsTaskUpdated((prev) => !prev);
    }
  }

  return (
    <>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay data-cy="chakra-modal" />
        <ModalContent>
          <ModalHeader m="0 auto">Edit Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleEdit}>
              <label>
                <b>Task Title</b>
                <input
                  placeholder="Task"
                  onChange={handelinputChange}
                  name="title"
                  type="text"
                  className="w-full outline-none border-2 h-10 rounded-md px-2 mb-4"
                  value={taskInfo.title}
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
                  value={taskInfo.des}
                  onChange={handelinputChange}
                  placeholder="Describe your task......."
                  className="outline-none border-2 rounded-lg italic p-2  box-sizing: border-box mb-4 "
                ></textarea>
              </label>

              <select
                name="assignedTo"
                className="w-full mb-6 outline-none border-2 rounded-md h-10"
                value={taskInfo.assignedTo}
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
                Edit
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditTask;
