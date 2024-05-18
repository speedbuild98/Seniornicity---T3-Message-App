import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const chatRouter = createTRPCRouter({
  sendMessage: protectedProcedure
    .input(z.object({ content: z.string().min(1), receiverId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const receiverId = input.receiverId;

      const conversation = await ctx.db.conversation.findFirst({
        where: {
          AND: [
            { participants: { some: { id: receiverId } } },
            { participants: { some: { id: ctx.session.user.id } } },
          ],
        },
      });

      if (!conversation) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Conversation not found",
        });
      }

      const message = await ctx.db.message.create({
        data: {
          content: input.content,
          senderId: ctx.session.user.id,
          conversationId: conversation.id,
          status: "SENT",
        },
        include: { sender: true },
      });

      return message;
    }),

  getMessages: protectedProcedure.query(async ({ ctx }) => {
    const messages = await ctx.db.message.findMany({
      where: { conversationId: "CONVERSATION_ID" },
      include: { sender: true },
    });

    return messages;
  }),

  getConversations: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session.user.id;

    const conversations = await ctx.db.conversation.findMany({
      where: {
        participants: {
          some: {
            id: userId,
          },
        },
      },
      include: {
        messages: {
          include: {
            sender: {
              select: { id: true, name: true, image: true },
            },
          },
          orderBy: { createdAt: "desc" },
          take: 1,
        },
        participants: {
          where: { id: { not: userId } },
        },
      },
    });

    return conversations;
  }),

  createConversation: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx, input }) => {
      const userId = input.userId;
      const senderId = ctx.session.user.id;

      if (!userId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User not found",
        });
      }

      const existingConversation = await ctx.db.conversation.findFirst({
        where: {
          AND: [
            { participants: { some: { id: userId } } },
            { participants: { some: { id: senderId } } },
          ],
        },
        include: {
          messages: {
            include: { sender: true },
          },
        },
      });

      if (existingConversation) {
        return existingConversation;
      }

      const conversation = await ctx.db.conversation.create({
        data: {
          participants: {
            connect: [{ id: userId }, { id: senderId }],
          },
        },
        include: {
          messages: {
            include: { sender: true },
          },
        },
      });

      return conversation;
    }),

  deleteConversation: protectedProcedure
    .input(z.object({ conversationId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const conversationId = input.conversationId;

      const conversation = await ctx.db.$transaction(async (prisma) => {
        await prisma.message.deleteMany({
          where: { conversationId },
        });

        const deletedConversation = await prisma.conversation.delete({
          where: { id: conversationId },
        });

        return deletedConversation;
      });

      if (!conversation) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Conversation not found",
        });
      }

      return conversation;
    }),

  deleteMessage: protectedProcedure
    .input(z.object({ messageId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const messageId = input.messageId;
      const message = await ctx.db.message.delete({
        where: { id: messageId },
      });

      if (!message) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Message not found",
        });
      }

      return message;
    }),
});
