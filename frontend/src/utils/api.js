const API_BASE_URL = 'http://localhost:5000/api';

export const apiCall = async (endpoint, options = {}) => {
  const { method = 'GET', body = null, headers = {} } = options;
  
  // Get token from localStorage
  const token = localStorage.getItem('flowdesk_token');

  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  // Add Authorization header if token exists
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    // Handle 401 Unauthorized (token expired or invalid)
    if (response.status === 401) {
      localStorage.removeItem('flowdesk_token');
      // Optional: Redirect to login or trigger a logout event
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const tasksApi = {
  getAll: () => apiCall('/tasks'),
  create: (taskData) => apiCall('/tasks', { method: 'POST', body: taskData }),
  update: (id, taskData) => apiCall(`/tasks/${id}`, { method: 'PUT', body: taskData }),
  delete: (id) => apiCall(`/tasks/${id}`, { method: 'DELETE' }),
};

export const authApi = {
  login: (credentials) => apiCall('/auth/login', { method: 'POST', body: credentials }),
  register: (userData) => apiCall('/auth/register', { method: 'POST', body: userData }),
};
