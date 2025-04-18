"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [step, setStep] = useState(1)
  const [code, setCode] = useState(["", "", "", "", ""])
  const router = useRouter()

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the authentication code
    console.log(`Sending authentication code to ${email}`)
    setStep(2)
  }

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically verify the authentication code
    console.log(`Verifying code: ${code.join("")}`)
    // If verification is successful, redirect to password reset page
    router.push("/reset-password")
  }

  const handleCodeChange = (index: number, value: string) => {
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    // Move to next input if value is entered
    if (value && index < 4) {
      const nextInput = document.getElementById(`code-${index + 1}`) as HTMLInputElement
      if (nextInput) nextInput.focus()
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-primary to-secondary p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{step === 1 ? "Forgot Password" : "Enter Authentication Code"}</CardTitle>
        </CardHeader>
        <CardContent>
          {step === 1 ? (
            <form onSubmit={handleSendCode} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email or Phone Number</Label>
                <Input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email or phone number"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Send Authentication Code
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Enter 5-digit Code</Label>
                <div className="flex justify-between">
                  {code.map((digit, index) => (
                    <Input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeChange(index, e.target.value)}
                      className="w-12 text-center"
                      required
                    />
                  ))}
                </div>
              </div>
              <Button type="submit" className="w-full">
                Verify Code
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
