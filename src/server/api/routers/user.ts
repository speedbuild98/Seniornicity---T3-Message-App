import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getAllUsers: protectedProcedure.query(async ({ ctx }) => {
    const users = await ctx.db.user.findMany({
      where: { id: { not: ctx.session.user.id } },
    });
    return users;
  }),

  getUserById: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: input.userId },
      });

      if (!user) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User not found",
        });
      }

      return user;
    }),
});
