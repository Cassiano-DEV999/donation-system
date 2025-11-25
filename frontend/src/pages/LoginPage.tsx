import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-6">
      <LoginForm className="w-full max-w-4xl" />
    </div>
  )
}
