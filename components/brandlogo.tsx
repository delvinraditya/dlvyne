import Image from 'next/image'
import { cn } from '@/lib/utils'

export const BrandLogo = ({ className }: { className?: string }) => {
  return (
    <Image 
      src="/logo.png" 
      alt="dlvyne logo" 
      width={32} 
      height={32} 
      className={cn('relative block', className)} 
      priority 
    />
  )
}