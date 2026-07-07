"use client";

import { useActionState } from "react";
import { login } from "../actions";

export default function LoginPage() {
  const [state, action, pending] = useActionState(login, undefined);
  return (
    <div className="mx-auto max-w-xs pt-16">
      <h1 className="mb-6 font-mono text-sm text-neutral-500">// backstage</h1>
      <form action={action} className="space-y-3">
        <input
          type="password"
          name="password"
          placeholder="password"
          autoFocus
          className="w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm outline-none focus:border-neutral-500 dark:border-neutral-700"
        />
        {state?.error && <p className="text-sm text-red-600 dark:text-red-400">{state.error}</p>}
        <button
          type="submit"
          disabled={pending}
          className="w-full rounded-md border border-neutral-300 px-3 py-2 font-mono text-sm text-neutral-600 transition-colors hover:border-neutral-500 hover:text-neutral-900 disabled:opacity-50 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-100"
        >
          {pending ? "..." : "enter"}
        </button>
      </form>
    </div>
  );
}
