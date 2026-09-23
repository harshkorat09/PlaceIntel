import { apiClient } from './client';

export interface ChatResponse {
  answer: string;
  source_notice?: string;
}

export const chatService = {
  async askQuestion(question: string): Promise<ChatResponse> {
    try {
      const response = await apiClient.post('/chat', { question });
      
      if (response.success && response.data) {
        return {
          answer: response.data.answer,
          source_notice: response.data.source_notice,
        };
      }
      
      throw new Error(response.message || 'Failed to get a response from the intelligence server.');
    } catch (error) {
      console.error('Chat API Error:', error);
      throw error;
    }
  }
};
