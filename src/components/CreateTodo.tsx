import type {
  ChangeEventHandler,
  FormEventHandler,
  SyntheticEvent,
} from "react";
import React, { useState } from "react";
import { api } from "../utils/api";
import { toast } from "react-toastify";

type formDataType = {
  task: string;
};

const CreateTodo: React.FC = () => {
  const [formData, setFormData] = useState<formDataType>({
    task: "",
  });
  const mutation = api.todos.newTodo.useMutation();
  const onChange: ChangeEventHandler = (e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    setFormData((prevData: formDataType) => ({
      ...prevData,
      task: target.value,
    }));
  };
  const onSubmit: FormEventHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    await toast.promise(
      mutation.mutateAsync({
        task: formData.task,
      }),
      {
        pending: "Creating the post",
        success: "Created the post",
        error: "Error occured",
      }
    );
    formData.task = "";
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-96 items-center justify-center gap-4"
    >
      <div className="form-control w-full max-w-xs">
        <input
          onChange={onChange}
          type="text"
          id="task"
          placeholder="Todo.."
          value={formData.task}
          className="input-bordered input max-w-xs flex-grow"
        />
      </div>

      <button className="btn-outline btn">Create</button>
    </form>
  );
};

export default CreateTodo;
