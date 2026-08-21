"use client";

import { AuthDialog } from "@/components/auth/AuthButton";

export function EntrarClient() {
  return <AuthDialog modoInicial="entrar" onClose={() => undefined} />;
}
