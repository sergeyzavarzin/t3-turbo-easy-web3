import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  all: publicProcedure.query(({ ctx }) => {
    console.log({ ctx })
    return [];
  }),
  byId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    console.log({ ctx, input })
    return { id: '1' };
  }),
  create: publicProcedure
    .input(z.object({ title: z.string().min(1), content: z.string().min(1) }))
    .mutation(({ ctx, input }) => {
      console.log({ ctx, input })
      return { id: '2' };
    }),
  delete: publicProcedure.input(z.string()).mutation(({ ctx, input }) => {
    console.log({ ctx, input })
    return { ok: true };
  }),
});
