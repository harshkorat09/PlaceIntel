const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

async function handleResponse(res: Response) {
  const json = await res.json().catch(() => null);
  if (!res.ok) {
    const errorMsg = json?.error?.message || json?.message || res.statusText;
    const error = new Error(errorMsg);
    (error as any).status = res.status;
    (error as any).code = json?.error?.code;
    throw error;
  }
  return json?.data !== undefined ? json.data : json;
}

export const apiClient = {
  async get(endpoint: string) {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    });
    return handleResponse(res);
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
    return handleResponse(res);
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
    return handleResponse(res);
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
    return handleResponse(res);
  }
};
