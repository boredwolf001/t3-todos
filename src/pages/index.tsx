import { type NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";

import CreateTodo from "../components/CreateTodo";
import { api } from "../utils/api";
import TodoList from "../components/TodoList";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();

  return (
    <>
      <Head>
        <title>TodoFy | More productive lifestyle</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="mb-12 text-4xl font-black text-primary">
          TodoFy | Make your life productive
        </h1>
        {sessionData ? (
          <AuthShowcase />
        ) : (
          <button onClick={() => signIn()} className="btn-secondary btn">
            Sign In
          </button>
        )}
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();
  let { data: todoData } = api.todos.getAll.useQuery();

  return (
    sessionData && (
      <>
        <CreateTodo />
        <TodoList todos={todoData || []} />
      </>
    )
  );
};
