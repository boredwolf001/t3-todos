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

type formDataType = {
  task: string;
};

const CreateTodo: React.FC = () => {
  const [formData, setFormData] = useState<formDataType>({
    task: "",
  });
  const mutation = api.todos.newTodo.useMutation();
  const onChange: ChangeEventHandler = (e: SyntheticEvent) => {
    const key: string = e.currentTarget.id;

    setFormData((prevData: formDataType) => ({
      ...prevData,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment @typescript-eslint/no-unsafe-assignment
      // @ts-ignore
      [key]: e.target.value,
    }));
  };
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
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
  };

  return (
    <form
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
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
