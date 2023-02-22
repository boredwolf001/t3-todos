import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const todoRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const todos = await ctx.prisma.todo.findMany({
      where: { userId: ctx.session.user.id },
      orderBy: [{ createdAt: "desc" }],
    });
    return todos;
  }),

  // getSecretMessage: protectedProcedure.query(() => {
  //   return "you can now see this secret message!";
  // }),

  // mutation
  newTodo: protectedProcedure
    .input(z.object({ task: z.string() }))
    .mutation(async ({ input, ctx: { prisma, session } }) => {
      const newTodo = await prisma.todo.create({
        data: {
          task: input.task,
          userId: session.user.id,
        },
      });
      return newTodo;
    }),
    markDone: protectedProcedure
    .input(z.object({ todoId: z.string(), done: z.boolean() }))
    .mutation(async ({ input, ctx: { prisma, session } }) => {
        const updatedTodo = await prisma.todo.update({
            where: {id: input.todoId},
            data: {
                done
            },
        });
        return updatedTodo;
    }),
});
