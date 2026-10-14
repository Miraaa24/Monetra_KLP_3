export default function Mascot({ size = 96 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label="Maskot Monetra">
      <path d="M18 40 L24 12 L44 28 Z" fill="#E3A06A" />
      <path d="M82 40 L76 12 L56 28 Z" fill="#E3A06A" />
      <ellipse cx="50" cy="58" rx="38" ry="32" fill="#F6DDBE" />
      <circle cx="37" cy="54" r="4" fill="#2B140C" />
      <circle cx="63" cy="54" r="4" fill="#2B140C" />
      <path d="M42 66 Q50 74 58 66" stroke="#2B140C" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="28" cy="64" rx="6" ry="4" fill="#D67052" opacity="0.7" />
      <ellipse cx="72" cy="64" rx="6" ry="4" fill="#D67052" opacity="0.7" />
    </svg>
  )
}
