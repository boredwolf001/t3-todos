import React, {
  ChangeEventHandler,
  Dispatch,
  FormEventHandler,
  SetStateAction,
  SyntheticEvent,
  useState,
} from "react";
import { api } from "../utils/api";
import { toast } from "react-toastify";
import { Todo } from "@prisma/client";

type Props = {};

const CreateTodo: React.FC<Props> = ({}) => {
  const [formData, setFormData] = useState<{
    task: string;
  }>({
    task: "",
  });
  const mutation = api.todos.newTodo.useMutation();
  const onChange: ChangeEventHandler = (e: SyntheticEvent) => {
    const key = e.currentTarget.id;
    //@ts-ignore
    setFormData((prevData) => ({ ...prevData, [key]: e.target.value }));
  };
  const onSubmit: FormEventHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    const todo = await toast.promise(
      mutation.mutateAsync({
        task: formData.task,
      }),
      {
        pending: "Creating the post",
        success: "Created the post",
        error: "Error occured",
      }
    );
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
