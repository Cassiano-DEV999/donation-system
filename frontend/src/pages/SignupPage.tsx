import { SignupForm } from "@/components/signup-form"

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-6">
      <SignupForm className="w-full max-w-4xl" />
    </div>
  )
}
