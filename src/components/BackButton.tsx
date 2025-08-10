import Link from 'next/link'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'

interface BackButtonProps {
  href: string
  label: string
}

export default function BackButton({ href, label }: BackButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
    >
      <ArrowLeftIcon className="h-4 w-4 mr-1" />
      {label}
    </Link>
  )
