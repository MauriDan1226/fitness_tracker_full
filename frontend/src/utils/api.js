// Todas las llamadas al servidor pasan por este archivo
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const checkResponse = async (res) => {
  if (res.ok) {
    return res.status === 204 ? null : res.json();
  }

  // el servidor responde siempre con { message } cuando algo falla
  let message = `Error ${res.status}`;
  try {
    const data = await res.json();
    if (data && data.message) message = data.message;
  } catch {
    // si la respuesta no trae JSON se deja el mensaje generico
  }

  const error = new Error(message);
  error.status = res.status;
  throw error;
};

const request = (endpoint, { method = 'GET', body, token } = {}) => {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;

  return fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  }).then(checkResponse);
};

// --- Usuarios ---
export const signup = ({ name, email, password }) =>
  request('/users/signup', { method: 'POST', body: { name, email, password } });

export const signin = ({ email, password }) =>
  request('/users/signin', { method: 'POST', body: { email, password } });

export const getCurrentUser = (token) => request('/users/me', { token });

export const updateProfile = (updates, token) =>
  request('/users/me', { method: 'PATCH', body: updates, token });

// --- Entrenamientos ---
export const getWorkouts = (token) => request('/workouts', { token });

export const createWorkout = (workout, token) =>
  request('/workouts', { method: 'POST', body: workout, token });

export const updateWorkout = (id, updates, token) =>
  request(`/workouts/${id}`, { method: 'PATCH', body: updates, token });

export const deleteWorkout = (id, token) =>
  request(`/workouts/${id}`, { method: 'DELETE', token });

// --- Metas ---
export const getGoals = (token) => request('/goals', { token });

export const createGoal = (goal, token) =>
  request('/goals', { method: 'POST', body: goal, token });

export const updateGoal = (id, updates, token) =>
  request(`/goals/${id}`, { method: 'PATCH', body: updates, token });

export const deleteGoal = (id, token) => request(`/goals/${id}`, { method: 'DELETE', token });

// --- Consejos ---
export const getTips = (token) => request('/tips', { token });
