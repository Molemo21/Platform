"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export default function CardPaymentPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const jobId = searchParams.get("jobId")

  const [job, setJob] = useState(null)
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [name, setName] = useState("")

  useEffect(() => {
    // In a real application, you would fetch the job details from an API
    // For this example, we'll use mock data
    const mockJob = {
      id: jobId,
      service: "Plumbing",
      description: "Fixed leaky faucet",
      contractor: "John Doe",
      totalCost: 750,
    }
    setJob(mockJob)
  }, [jobId])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically process the payment
    // For this example, we'll just show a success message
    toast({
      title: "Payment Successful",
      description: "Your payment has been processed successfully.",
    })
    router.push("/dashboard/client")
  }

  if (!job) {
    return <div>Loading...</div>
  }

  const commission = job.totalCost * 0.1
  const grandTotal = job.totalCost + commission

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-secondary p-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Card Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="service">Service</Label>
              <Input id="service" value={job.service} disabled />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input id="description" value={job.description} disabled />
            </div>
            <div>
              <Label htmlFor="contractor">Contractor</Label>
              <Input id="contractor" value={job.contractor} disabled />
            </div>
            <div>
              <Label htmlFor="cost">Service Cost</Label>
              <Input id="cost" value={`R${job.totalCost.toFixed(2)}`} disabled />
            </div>
            <div>
              <Label htmlFor="commission">Platform Commission (10%)</Label>
              <Input id="commission" value={`R${commission.toFixed(2)}`} disabled />
            </div>
            <div>
              <Label htmlFor="total">Grand Total</Label>
              <Input id="total" value={`R${grandTotal.toFixed(2)}`} disabled />
            </div>
            <div>
              <Label htmlFor="name">Cardholder Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input id="cardNumber" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" value={cvv} onChange={(e) => setCvv(e.target.value)} required />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Pay R{grandTotal.toFixed(2)}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
