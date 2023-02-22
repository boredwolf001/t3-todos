import { Todo } from "@prisma/client";
import React, { SyntheticEvent, useState } from "react";

import { api } from "../utils/api";

type Props = { todos: Todo[] };

const TodoList: React.FC<Props> = ({ todos }: Props) => {
  const mutation = api.todos.markDone.useMutation();
  const onChange = (id: string, done: boolean) => {
    mutation.mutate({ id, done });
  };

  return (
    <>
      {todos.map((todo) => (
        <div key={todo.id} className="mt-10 w-96 bg-base-100 p-5 shadow-xl">
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              onChange={(e: SyntheticEvent) => {
                onChange(todo.id, !todo.done);
                todo.done = !todo.done;
              }}
              checked={todo.done}
              className="checkbox"
            />
            <h2 className="font-regular text-lg text-primary">{todo.task}</h2>
          </div>
        </div>
      ))}
    </>
  );
};

export default TodoList;
