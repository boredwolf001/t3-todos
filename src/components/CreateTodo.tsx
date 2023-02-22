import React, {
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
  SyntheticEvent,
  useState,
} from "react";
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
  const onChange: ChangeEventHandler = (e: FormEvent) => {
    const key: string = e.currentTarget.id;

    setFormData((prevData: formDataType) => ({
      ...prevData,
      // eslint-disable-next-line
      // @ts-ignore
      [key as string]: e.currentTarget.value,
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
