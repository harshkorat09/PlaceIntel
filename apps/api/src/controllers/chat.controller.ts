import type { Request, Response } from 'express';

interface ChatSource {
  notice: string;
  pages: number[];
}

interface ChatbotResponse {
  answer: string;
  sources: ChatSource[];
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
    // req.user might be defined by authenticate middleware
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
            user_id: user?.id,
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

      const response: ChatbotSuccessResponse = {
        success: true,
        data,
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
