import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";
import { loginUser } from "@/services/authService";

export function useLogin() {
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (email: string, password: string) => {
    try {
      setError("");
      const data = await loginUser(email, password);

      const payload = parseJwt(data.access_token);
      login(data.access_token, payload);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return { handleLogin, error };
}

function parseJwt(token: string) {
  try {
    const base64Payload = token.split(".")[1];
    const payload = atob(base64Payload);
    return JSON.parse(payload);
  } catch {
    return null;
  }
}
