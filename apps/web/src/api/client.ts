const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

export const apiClient = {
  async get(endpoint: string) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    });
    return res.json();
  },
  
  async post(endpoint: string, data: any) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify(data)
    });
    return res.json();
  },
  
  async put(endpoint: string, data: any) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async delete(endpoint: string) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    });
    return res.json();
  },

  /**
   * POST multipart/form-data — used for file uploads.
   * Do NOT set Content-Type manually; the browser will add the correct boundary.
   */
  async postFormData(endpoint: string, formData: FormData) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      },
      body: formData
    });
    return res.json();
  }
};
