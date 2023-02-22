import { Todo } from "@prisma/client";
import React from "react";

import { api } from "../utils/api";

type Props = { todos: Todo[] };

const TodoList: React.FC<Props> = ({ todos }: Props) => {
    const markDone = () => {

    }

  return (
    <>
      {todos.map((todo) => (
        <div key={todo.id} className="mt-10 w-96 bg-base-100 p-5 shadow-xl">
          <div className="flex items-center gap-4">
              <input type="checkbox" onChange={markDone} checked={todo.done} className="checkbox" />
            <h2 className="card-title font-medium">{todo.task}</h2>
          </div>
        </div>
      ))}
    </>
  );
};

export default TodoList;
