"use client";

import { LockKeyhole } from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);

    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: formData.get("password") })
    });

    setPending(false);

    if (!response.ok) {
      setError("Неверный пароль.");
      return;
    }

    router.refresh();
  }

  return (
    <main className="login-screen">
      <form className="login-box form" onSubmit={submit}>
        <div>
          <span className="eyebrow">Админ-панель</span>
          <h1 style={{ margin: "8px 0 6px" }}>Вход ГазСнаб</h1>
          <p className="muted" style={{ margin: 0 }}>
            Введите пароль администратора.
          </p>
        </div>
        {error && <p className="error">{error}</p>}
        <label className="field">
          <span>Пароль</span>
          <input className="input" name="password" type="password" required autoFocus />
        </label>
        <button className="button" disabled={pending} type="submit">
          <LockKeyhole size={18} />
          {pending ? "Проверяем..." : "Войти"}
        </button>
      </form>
    </main>
  );
}
