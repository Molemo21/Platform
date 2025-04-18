import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const blogPosts = [
  {
    title: "10 Tips for Hiring the Right Contractor",
    excerpt: "Learn how to choose the best professional for your home improvement project.",
    date: "2024-03-01",
    author: "John Doe",
    slug: "10-tips-for-hiring-the-right-contractor",
  },
  {
    title: "The Benefits of Regular Home Maintenance",
    excerpt: "Discover why regular home maintenance is crucial for your property's longevity and value.",
    date: "2024-02-15",
    author: "Jane Smith",
    slug: "benefits-of-regular-home-maintenance",
  },
  {
    title: "DIY vs. Professional: When to Call an Expert",
    excerpt: "Find out when it's best to tackle a project yourself and when to hire a professional.",
    date: "2024-01-30",
    author: "Mike Johnson",
    slug: "diy-vs-professional-when-to-call-an-expert",
  },
]

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">ProLiink Connect Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <Card key={post.slug}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-2">
                {post.date} | By {post.author}
              </p>
              <p>{post.excerpt}</p>
            </CardContent>
            <CardFooter>
              <Link
                href={`/blog/${post.slug}`}
                className={cn(buttonVariants())}
              >
                Read More
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
