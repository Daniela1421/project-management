const API_URL = "http://localhost:8000";

export const loginUser = async (email: string, password: string) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Error al iniciar sesión");
  }

  return data;
};

export const registerUser = async (name: string, email: string, password: string) => {
  const res = await fetch(`${API_URL}/auth/login/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      password,
      role: "developer",
      avatar: "",
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Error al registrar usuario");
  }

  return data;
};
