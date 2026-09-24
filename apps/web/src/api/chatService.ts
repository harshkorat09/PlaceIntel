import { apiClient } from './client';

export interface ChatSource {
  notice: string;
  pages: number[];
}

export interface ChatResponse {
  answer: string;
  sources: ChatSource[];
}

export const chatService = {
  async askQuestion(question: string): Promise<ChatResponse> {
    try {
      const response = await apiClient.post('/chat', { question });

      if (response && response.answer) {
        return {
          answer: response.answer,
          sources: response.sources ?? [],
        };
      }

      throw new Error(
        response?.message ||
          'Failed to get a response from the intelligence server.'
      );
    } catch (error) {
      console.error('Chat API Error:', error);
      throw error;
    }
  },
};