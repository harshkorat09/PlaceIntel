import { apiClient } from './client';

export interface ChatSource {
  notice: string;
  pages: number[];
}

export interface ChatResponse {
  answer: string;
  sources: ChatSource[];
  session_id: number | null;
}

export interface HistoryMessage {
  role: 'USER' | 'ASSISTANT';
  content: string;
  createdAt: string;
}

export interface ChatHistoryResponse {
  session_id: number | null;
  messages: HistoryMessage[];
}

export const chatService = {
  /**
   * Send a question to the AI assistant.
   * Pass the current session_id so the backend reuses the same
   * ChatSession instead of creating a new one every time.
   */
  async askQuestion(
    question: string,
    sessionId: number | null,
  ): Promise<ChatResponse> {
    try {
      const response = await apiClient.post('/chat', {
        question,
        session_id: sessionId ?? undefined,
      });

      if (response.success && response.data) {
        return {
          answer: response.data.answer,
          sources: response.data.sources ?? [],
          session_id: response.data.session_id ?? null,
        };
      }

      throw new Error(
        response.message ||
          'Failed to get a response from the intelligence server.',
      );
    } catch (error) {
      console.error('Chat API Error:', error);
      throw error;
    }
  },

  /**
   * Load the persisted conversation history for the authenticated user.
   * Optionally scoped to a specific session_id.
   * Used on chatbot component mount to restore the previous conversation.
   */
  async getHistory(sessionId?: number | null): Promise<ChatHistoryResponse> {
    try {
      const query = sessionId ? `?session_id=${sessionId}` : '';
      const response = await apiClient.get(`/chat/history${query}`);

      if (response.success && response.data) {
        return {
          session_id: response.data.session_id ?? null,
          messages: response.data.messages ?? [],
        };
      }

      return { session_id: null, messages: [] };
    } catch (error) {
      console.error('Chat history load error:', error);
      return { session_id: null, messages: [] };
    }
  },
};