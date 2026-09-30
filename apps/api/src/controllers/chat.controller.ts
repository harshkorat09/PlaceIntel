import type { Request, Response } from 'express';

interface ChatSource {
  notice: string;
  pages: number[];
}

interface ChatbotResponse {
  answer: string;
  sources: ChatSource[];
  session_id?: number | null;
}

interface ChatbotSuccessResponse {
  success: true;
  data: ChatbotResponse;
}

const CHATBOT_URL =
  process.env.CHATBOT_URL ?? 'http://127.0.0.1:8000';

const CHATBOT_TIMEOUT_MS = 30_000;

export const chatWithAssistant = async (
  req: Request,
  res: Response,
) => {
  try {
    const { question, session_id } = req.body;
    // req.user is set by the authenticate middleware
    const user = (req as any).user;

    if (
      typeof question !== 'string' ||
      !question.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: 'Question is required',
      });
    }

    const controller = new AbortController();

    const timeout = setTimeout(() => {
      controller.abort();
    }, CHATBOT_TIMEOUT_MS);

    try {
      const chatbotResponse = await fetch(
        `${CHATBOT_URL}/chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            question: question.trim(),
            user_id: user?.userId,
            session_id: session_id ? Number(session_id) : undefined,
          }),
          signal: controller.signal,
        },
      );

      if (!chatbotResponse.ok) {
        console.error(
          `Chatbot service returned HTTP ${chatbotResponse.status}`,
        );

        return res.status(502).json({
          success: false,
          message: 'Chatbot service is unavailable',
        });
      }

      const data =
        (await chatbotResponse.json()) as ChatbotResponse;

      // Pass session_id back to the frontend so it can reuse the
      // same session on subsequent messages and on remount.
      const response: ChatbotSuccessResponse = {
        success: true,
        data: {
          answer: data.answer,
          sources: data.sources ?? [],
          session_id: data.session_id ?? null,
        },
      };

      return res.json(response);
    } finally {
      clearTimeout(timeout);
    }
  } catch (error) {
    if (
      error instanceof DOMException &&
      error.name === 'AbortError'
    ) {
      console.error('Chatbot service request timed out');

      return res.status(504).json({
        success: false,
        message: 'Chatbot service request timed out',
      });
    }

    console.error(
      'Chatbot service communication error:',
      error,
    );

    return res.status(502).json({
      success: false,
      message: 'Unable to reach chatbot service',
    });
  }
};

// ─────────────────────────────────────────────────────────────────────
// GET /api/chat/history
// Returns the full message history for the authenticated user's most
// recent ChatSession, or for a specific session_id if provided.
// ─────────────────────────────────────────────────────────────────────
export const getChatHistory = async (
  req: Request,
  res: Response,
) => {
  const user = (req as any).user;

  if (!user?.userId) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  const { session_id } = req.query;

  try {
    const { prisma } = await import('../db.js');

    let session;

    if (session_id) {
      // Fetch the requested session — ownership-checked
      session = await prisma.chatSession.findFirst({
        where: {
          id: Number(session_id),
          userId: user.userId,
        },
        include: {
          messages: {
            orderBy: { createdAt: 'asc' },
          },
        },
      });
    } else {
      // Fetch the user's most recent session
      session = await prisma.chatSession.findFirst({
        where: { userId: user.userId },
        orderBy: { updatedAt: 'desc' },
        include: {
          messages: {
            orderBy: { createdAt: 'asc' },
          },
        },
      });
    }

    if (!session) {
      return res.json({ success: true, data: { session_id: null, messages: [] } });
    }

    return res.json({
      success: true,
      data: {
        session_id: session.id,
        messages: session.messages.map((m) => ({
          role: m.role,    // "USER" | "ASSISTANT"
          content: m.content,
          createdAt: m.createdAt,
        })),
      },
    });
  } catch (error) {
    console.error('getChatHistory error:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
