import React, { useState } from "react";
import "../index.css";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {  useDisclosure, useToast } from "@chakra-ui/react";
import axios from "axios";
import EditTask from "./EditTask";

function TaskItem({
  id,
  title,
  des,
  assignedTo,
  IsCompleted,
  DateAndTime,
  setIsTaskUpdated,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  async function deleteTask() {
    try {
      await axios.delete(`http://localhost:3000/task/${id}`);
      toast({
        title: "Task Deleted.",
        description: "Your task has been Deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setIsTaskUpdated((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  }

  async function toggleTaskCompleted() {
    const patchData = { IsCompleted: !IsCompleted };
    try {
      let req = await axios.patch(
        `http://localhost:3000/task/${id}`,
        patchData
      );
      setIsTaskUpdated((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="  w-[90vw] max-w-[1200px] shadow-xl mt-8 m-auto sm:w-[80vw] h-[180px] border-2 rounded-2xl flex justify-between flex-col py-2 px-5">
        {/* Header and created section */}
        <div className="flex justify-between items-center border-b-2">
          <div className="text-[30px] uppercase font-bold font-mono tracking-tighter ">
            <h1>
              <span className="font-semibold">Title:</span> {title}
            </h1>
          </div>
          <div className="text-sm italic text-gray-400">
            <p>Created on {DateAndTime}</p>
            <p>
              Assigned to <span className=" font-semibold">{assignedTo}</span>
            </p>
          </div>
        </div>

        {/* Description section */}
        <div className="text-xl text-gray-400 py-2 border-b-2">
          <p className="truncate-words">{des}</p>
        </div>

        {/* Mark completed , Edit and Delete Section */}
        <div
          className={`flex justify-between items-center ${
            IsCompleted ? "bg-green-300" : "bg-red-300"
          }  px-2 py-1`}
        >
          {/* isCompleted */}
          <div className=" text-xl ">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                onClick={toggleTaskCompleted}
                className="scale-150 "
              />{" "}
              {IsCompleted ? "Mark Pending" : "Mark completed"}
            </label>
          </div>

          {/* Icons */}
          <div className="flex gap-4 text-2xl">
            {/* Edit */}
            <div onClick={onOpen}>
              <EditIcon />
            </div>

            {/* Delete */}
            <div className="cursor-pointer" onClick={deleteTask}>
              <DeleteIcon />
            </div>
          </div>
        </div>
      </div>
      <EditTask onClose={onClose} isOpen={isOpen} id={id}  setIsTaskUpdated={setIsTaskUpdated} />
    </>
  );
}

export default TaskItem;
