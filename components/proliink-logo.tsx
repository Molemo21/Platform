import Link from "next/link"

interface ProLiinkLogoProps {
  className?: string
}

export function ProLiinkLogo({ className = "" }: ProLiinkLogoProps) {
  return (
    <Link href="/" className={`text-xl font-bold ${className}`}>
      Prol<span className="text-blue-500">i</span>ink
    </Link>
  )
}
