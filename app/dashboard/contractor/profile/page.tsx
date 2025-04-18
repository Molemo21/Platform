"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, Camera, CheckCircle, MapPin, Phone, Mail, Globe, FileText, Star } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ContractorProfilePage() {
  const [isEditing, setIsEditing] = useState(false)

  // Mock data - in a real app, this would come from your database
  const [profile, setProfile] = useState({
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+27 78 123 4567",
    address: "123 Main Street, Cape Town",
    bio: "Professional plumber with over 10 years of experience in residential and commercial plumbing. Specializing in repairs, installations, and maintenance.",
    services: ["Plumbing", "Pipe Installation", "Drain Cleaning"],
    hourlyRate: "R600",
    availability: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false,
    },
    workingHours: "8:00 AM - 5:00 PM",
    rating: 4.8,
    reviewCount: 56,
    completedJobs: 78,
    verificationStatus: "Verified",
    joinDate: "January 2024",
    serviceArea: "Cape Town and surrounding areas (50km radius)",
    certifications: ["Master Plumber License", "Certified Pipe Fitter", "Occupational Health and Safety Certificate"],
  })

  const handleSaveProfile = () => {
    // In a real app, you would save the profile to your database here
    setIsEditing(false)
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">My Profile</h1>
        <Button onClick={() => setIsEditing(!isEditing)}>{isEditing ? "Cancel" : "Edit Profile"}</Button>
      </div>

      {profile.verificationStatus !== "Verified" && (
        <Alert className="mb-6 border-amber-500 bg-amber-500/10">
          <AlertCircle className="h-4 w-4 text-amber-500" />
          <AlertTitle className="text-amber-500">Verification Pending</AlertTitle>
          <AlertDescription>
            Your profile is under review. Complete verification to access all features.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Summary */}
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader className="text-center pb-2">
            <div className="relative mx-auto mb-4">
              <Avatar className="w-24 h-24 border-4 border-primary">
                <AvatarImage src="/placeholder.svg?height=96&width=96" alt={profile.name} />
                <AvatarFallback>
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              {isEditing && (
                <Button size="icon" className="absolute bottom-0 right-0 rounded-full bg-primary h-8 w-8">
                  <Camera className="h-4 w-4" />
                </Button>
              )}
            </div>
            <CardTitle className="text-2xl">{profile.name}</CardTitle>
            <div className="flex items-center justify-center mt-1">
              <Badge variant={profile.verificationStatus === "Verified" ? "default" : "outline"} className="mr-2">
                {profile.verificationStatus === "Verified" ? (
                  <CheckCircle className="mr-1 h-3 w-3" />
                ) : (
                  <AlertCircle className="mr-1 h-3 w-3" />
                )}
                {profile.verificationStatus}
              </Badge>
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm">
                  {profile.rating} ({profile.reviewCount} reviews)
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{profile.address}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{profile.serviceArea}</p>
                </div>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                <p className="text-sm text-gray-700 dark:text-gray-300">{profile.phone}</p>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                <p className="text-sm text-gray-700 dark:text-gray-300">{profile.email}</p>
              </div>
              <div className="flex items-center">
                <Globe className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                <p className="text-sm text-gray-700 dark:text-gray-300">{profile.workingHours}</p>
              </div>
              <div className="flex items-center">
                <FileText className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                <p className="text-sm text-gray-700 dark:text-gray-300">Member since {profile.joinDate}</p>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Services Offered</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.services.map((service, index) => (
                    <Badge key={index} variant="secondary">
                      {service}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-2">Certifications</h3>
                <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
                  {profile.certifications.map((cert, index) => (
                    <li key={index}>{cert}</li>
                  ))}
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Detailed Information */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="details">Profile Details</TabsTrigger>
              <TabsTrigger value="availability">Availability</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            <TabsContent value="details">
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle>Profile Details</CardTitle>
                  <CardDescription>
                    {isEditing ? "Edit your profile information" : "Your professional information"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {isEditing ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={profile.name}
                            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={profile.phone}
                            onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="hourlyRate">Hourly Rate</Label>
                          <Input
                            id="hourlyRate"
                            value={profile.hourlyRate}
                            onChange={(e) => setProfile({ ...profile, hourlyRate: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          value={profile.address}
                          onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="serviceArea">Service Area</Label>
                        <Input
                          id="serviceArea"
                          value={profile.serviceArea}
                          onChange={(e) => setProfile({ ...profile, serviceArea: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          rows={4}
                          value={profile.bio}
                          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="services">Services (comma separated)</Label>
                        <Input
                          id="services"
                          value={profile.services.join(", ")}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              services: e.target.value.split(",").map((s) => s.trim()),
                            })
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="certifications">Certifications (comma separated)</Label>
                        <Input
                          id="certifications"
                          value={profile.certifications.join(", ")}
                          onChange={(e) =>
                            setProfile({
                              ...profile,
                              certifications: e.target.value.split(",").map((s) => s.trim()),
                            })
                          }
                        />
                      </div>

                      <Button onClick={handleSaveProfile} className="w-full">
                        Save Changes
                      </Button>
                    </>
                  ) : (
                    <>
                      <div>
                        <h3 className="text-lg font-medium mb-2">About Me</h3>
                        <p className="text-gray-700 dark:text-gray-300">{profile.bio}</p>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-medium mb-2">Professional Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Hourly Rate</p>
                            <p className="font-medium">{profile.hourlyRate}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Completed Jobs</p>
                            <p className="font-medium">{profile.completedJobs}</p>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="text-lg font-medium mb-2">Stats</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
                            <p className="text-2xl font-bold">{profile.rating}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Rating</p>
                          </div>
                          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
                            <p className="text-2xl font-bold">{profile.reviewCount}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Reviews</p>
                          </div>
                          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
                            <p className="text-2xl font-bold">{profile.completedJobs}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Jobs</p>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="availability">
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle>Availability</CardTitle>
                  <CardDescription>Set your working days and hours</CardDescription>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        {Object.entries(profile.availability).map(([day, isAvailable]) => (
                          <div key={day} className="flex items-center justify-between">
                            <Label htmlFor={`availability-${day}`} className="capitalize">
                              {day}
                            </Label>
                            <Switch
                              id={`availability-${day}`}
                              checked={isAvailable}
                              onCheckedChange={(checked) =>
                                setProfile({
                                  ...profile,
                                  availability: { ...profile.availability, [day]: checked },
                                })
                              }
                            />
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="workingHours">Working Hours</Label>
                        <Input
                          id="workingHours"
                          value={profile.workingHours}
                          onChange={(e) => setProfile({ ...profile, workingHours: e.target.value })}
                        />
                      </div>

                      <Button onClick={handleSaveProfile} className="w-full">
                        Save Changes
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-7 gap-2">
                        {Object.entries(profile.availability).map(([day, isAvailable]) => (
                          <div
                            key={day}
                            className={`p-3 rounded-lg text-center ${
                              isAvailable
                                ? "bg-primary/10 text-primary dark:bg-primary/20"
                                : "bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500"
                            }`}
                          >
                            <p className="text-xs uppercase">{day.slice(0, 3)}</p>
                            <p className="mt-1">
                              {isAvailable ? (
                                <CheckCircle className="h-5 w-5 mx-auto" />
                              ) : (
                                <span className="text-lg">-</span>
                              )}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Working Hours</p>
                        <p className="font-medium">{profile.workingHours}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents">
              <Card className="bg-white dark:bg-gray-800">
                <CardHeader>
                  <CardTitle>Documents & Verification</CardTitle>
                  <CardDescription>Upload your certifications and identification documents</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                        <div className="mb-4">
                          <FileText className="h-10 w-10 text-gray-400 mx-auto" />
                        </div>
                        <h3 className="font-medium mb-2">ID Document</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                          Upload a copy of your ID or passport
                        </p>
                        {isEditing ? (
                          <Button variant="outline" size="sm">
                            Upload Document
                          </Button>
                        ) : (
                          <Badge variant="outline">Verified</Badge>
                        )}
                      </div>

                      <div className="border border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                        <div className="mb-4">
                          <FileText className="h-10 w-10 text-gray-400 mx-auto" />
                        </div>
                        <h3 className="font-medium mb-2">Professional License</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                          Upload your professional license or certification
                        </p>
                        {isEditing ? (
                          <Button variant="outline" size="sm">
                            Upload Document
                          </Button>
                        ) : (
                          <Badge variant="outline">Verified</Badge>
                        )}
                      </div>
                    </div>

                    <div className="border border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
                      <h3 className="font-medium mb-2">Additional Certifications</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                        Upload any additional certifications or qualifications
                      </p>
                      {isEditing ? (
                        <Button variant="outline" size="sm">
                          Upload Documents
                        </Button>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                          {profile.certifications.map((cert, index) => (
                            <div key={index} className="bg-gray-100 dark:bg-gray-700 p-2 rounded text-sm">
                              {cert}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
