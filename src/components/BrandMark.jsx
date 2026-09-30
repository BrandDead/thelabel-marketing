import wordmark from '../assets/thelabel-wordmark-red.webp'

const sizes = {
  header: 'h-7 md:h-8',
  hero: 'h-12 sm:h-16 md:h-20',
  footer: 'h-8',
}

export default function BrandMark({ size = 'header', className = '', decorative = false }) {
  return (
    <img
      src={wordmark}
      alt={decorative ? '' : 'theLABEL'}
      aria-hidden={decorative || undefined}
      className={`tl-brand-wordmark ${sizes[size] ?? sizes.header} ${className}`}
    />
  )
}
