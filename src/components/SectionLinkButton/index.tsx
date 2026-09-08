import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

interface SectionLinkButtonProps {
  to: string
  className?: string
  children: ReactNode
}

export function SectionLinkButton({ to, className, children }: SectionLinkButtonProps) {
  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  )
}
