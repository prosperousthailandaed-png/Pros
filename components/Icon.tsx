/* ============================================================
   Icon — ชุดไอคอนเส้น SVG มืออาชีพ (แทน emoji ทั้งเว็บ)
   ใช้ได้ 2 แบบ:
     <Icon name="bolt" />        // ชื่อ canonical
     <Icon name="⚡" />          // ส่ง emoji เดิมมาได้เลย จะถูกแมปให้อัตโนมัติ
   ทุกไอคอนใช้ currentColor + stroke จึงรับสีจาก parent ได้
   ============================================================ */
import type { SVGProps } from 'react'

type Paths = React.ReactNode

const S = {
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

/* ---- registry: ชื่อ canonical → เส้น svg ---- */
const ICONS: Record<string, Paths> = {
  bolt: <path {...S} d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
  heart: <path {...S} d="M12 20s-7-4.5-9.5-9C1 8 2.5 4.5 6 4.5c2 0 3.2 1.2 4 2.3.8-1.1 2-2.3 4-2.3 3.5 0 5 3.5 3.5 6.5C19 15.5 12 20 12 20Z" />,
  pulse: <path {...S} d="M2 12h4l2-6 4 14 3-10 2 2h5" />,
  shield: <><path {...S} d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" /><path {...S} d="m9 12 2 2 4-4" /></>,
  shieldCheck: <><path {...S} d="M12 3 5 6v5c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" /><path {...S} d="m9 12 2 2 4-4" /></>,
  cross: <path {...S} d="M10 3h4v7h7v4h-7v7h-4v-7H3v-4h7V3Z" />,
  aed: <><rect {...S} x="4" y="3" width="16" height="18" rx="2.5" /><path {...S} d="M12 7v4M10 9h4" /><path {...S} d="M8 15h2l1.2-2 1.6 4 1.2-2H16" /></>,
  device: <><rect {...S} x="4" y="3" width="16" height="18" rx="2.5" /><path {...S} d="M8 16h2l1-3 2 5 1-3h2" /><circle {...S} cx="12" cy="7.5" r="1.6" /></>,
  robot: <><rect {...S} x="5" y="8" width="14" height="11" rx="3" /><path {...S} d="M12 4v4M9 13h.01M15 13h.01M9 17h6" /><circle {...S} cx="12" cy="3" r="1.2" /></>,
  waves: <><path {...S} d="M2 8c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2" /><path {...S} d="M2 13c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2" /><path {...S} d="M2 18c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2" /></>,
  swimmer: <><circle {...S} cx="16" cy="6" r="1.8" /><path {...S} d="M5 14c1.5-1.2 3-1.2 4.5 0L13 11l-3-3 4-1.5" /><path {...S} d="M2 19c1.5 0 1.5-1.4 3-1.4s1.5 1.4 3 1.4 1.5-1.4 3-1.4 1.5 1.4 3 1.4 1.5-1.4 3-1.4 1.5 1.4 3 1.4" /></>,
  lifebuoy: <><circle {...S} cx="12" cy="12" r="9" /><circle {...S} cx="12" cy="12" r="3.6" /><path {...S} d="m4.9 4.9 4.5 4.5M14.6 14.6l4.5 4.5M19.1 4.9l-4.5 4.5M9.4 14.6l-4.5 4.5" /></>,
  anchor: <><circle {...S} cx="12" cy="5" r="2" /><path {...S} d="M12 7v13M5 13a7 7 0 0 0 14 0M5 13H3m16 0h2M9 10h6" /></>,
  diving: <><path {...S} d="M3 9a3 3 0 0 1 3-3h7a3 3 0 0 1 3 3v2a3 3 0 0 1-3 3H9l-3 3v-3a3 3 0 0 1-3-3V9Z" /><path {...S} d="M16 10h2a3 3 0 0 1 3 3v0" /></>,
  graduation: <><path {...S} d="M12 4 2 9l10 5 10-5-10-5Z" /><path {...S} d="M6 11v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5v-4" /><path {...S} d="M22 9v5" /></>,
  stethoscope: <><path {...S} d="M5 3v5a4 4 0 0 0 8 0V3" /><path {...S} d="M5 3H3m4 0H7M13 3h-2m4 0h0M9 16v1a5 5 0 0 0 10 0v-2" /><circle {...S} cx="19" cy="12" r="2" /></>,
  dumbbell: <><path {...S} d="M6.5 6.5 17.5 17.5M3 8l3-3M5 16l-3 3m0 0 1 1m-1-1-1-1m18-13-1-1m1 1 1 1m-3 11 3 3" /><path {...S} d="m4 12 8-8 8 8-8 8-8-8Z" opacity="0" /><path {...S} d="M4.5 4.5 7 7M17 17l2.5 2.5" /></>,
  bell: <><path {...S} d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" /><path {...S} d="M10 19a2 2 0 0 0 4 0" /></>,
  star: <path {...S} d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.8 6.8 19.2l1-5.8L3.5 9.2l5.9-.9L12 3Z" />,
  globe: <><circle {...S} cx="12" cy="12" r="9" /><path {...S} d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" /></>,
  document: <><path {...S} d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" /><path {...S} d="M14 3v5h5M9 13h6M9 17h6" /></>,
  receipt: <><path {...S} d="M5 3h14v18l-2.5-1.5L14 21l-2-1.5L10 21l-2.5-1.5L5 21V3Z" /><path {...S} d="M9 8h6M9 12h6" /></>,
  refresh: <><path {...S} d="M21 12a9 9 0 0 1-15.5 6.3L3 16" /><path {...S} d="M3 12a9 9 0 0 1 15.5-6.3L21 8" /><path {...S} d="M21 4v4h-4M3 20v-4h4" /></>,
  medal: <><circle {...S} cx="12" cy="14" r="5" /><path {...S} d="M12 11.5 13 14h-2l1-2.5ZM8 3l2 6M16 3l-2 6" /></>,
  building: <><path {...S} d="M4 21V5l8-3 8 3v16" /><path {...S} d="M4 21h16M9 9h.01M15 9h.01M9 13h.01M15 13h.01M10 21v-4h4v4" /></>,
  landmark: <><path {...S} d="M3 21h18M5 21V10m4 11V10m6 11V10m4 11V10M12 3 3 8h18l-9-5Z" /></>,
  hospital: <><path {...S} d="M4 21V7l8-4 8 4v14" /><path {...S} d="M4 21h16M12 8v5M9.5 10.5h5M9 21v-4h6v4" /></>,
  school: <><path {...S} d="M3 10 12 5l9 5-9 5-9-5Z" /><path {...S} d="M7 12v4c0 1 2.2 2 5 2s5-1 5-2v-4M21 10v5" /></>,
  tent: <><path {...S} d="M12 4 3 20h18L12 4Z" /><path {...S} d="M12 4v16M12 12l-5 8M12 12l5 8" /></>,
  phone: <path {...S} d="M5 4h3l1.5 4-2 1.5a11 11 0 0 0 5 5l1.5-2 4 1.5V18a2 2 0 0 1-2.2 2A16 16 0 0 1 4 6.2 2 2 0 0 1 6 4" />,
  chat: <path {...S} d="M4 5h16v11H8l-4 3V5Z" />,
  mail: <><rect {...S} x="3" y="5" width="18" height="14" rx="2" /><path {...S} d="m3 7 9 6 9-6" /></>,
  clock: <><circle {...S} cx="12" cy="12" r="9" /><path {...S} d="M12 7v5l3 2" /></>,
  pin: <><path {...S} d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11Z" /><circle {...S} cx="12" cy="10" r="2.5" /></>,
  search: <><circle {...S} cx="11" cy="11" r="7" /><path {...S} d="m20 20-3.5-3.5" /></>,
  check: <path {...S} d="m4 12 5 5L20 6" />,
  checkCircle: <><circle {...S} cx="12" cy="12" r="9" /><path {...S} d="m8 12 3 3 5-6" /></>,
  arrowRight: <path {...S} d="M5 12h14M13 6l6 6-6 6" />,
  users: <><circle {...S} cx="9" cy="8" r="3" /><path {...S} d="M3 20c0-3.3 2.7-5 6-5s6 1.7 6 5" /><path {...S} d="M16 5.5a3 3 0 0 1 0 5.5M21 20c0-2.6-1.4-4.2-4-4.8" /></>,
  award: <><circle {...S} cx="12" cy="9" r="5" /><path {...S} d="m8.5 13-1.5 8 5-3 5 3-1.5-8" /></>,
  clipboard: <><rect {...S} x="6" y="4" width="12" height="17" rx="2" /><path {...S} d="M9 4a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 4v1H9V4ZM9 11h6M9 15h6" /></>,
  briefcase: <><rect {...S} x="3" y="7" width="18" height="13" rx="2" /><path {...S} d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18" /></>,
  spark: <path {...S} d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />,
}

/* ---- emoji เดิม → ชื่อไอคอน ---- */
const EMOJI_MAP: Record<string, string> = {
  '⚡': 'bolt', '🏊': 'swimmer', '🏊‍♂️': 'swimmer', '🎓': 'graduation',
  '🏨': 'building', '🏛️': 'landmark', '🏛': 'landmark', '🏫': 'school',
  '🏢': 'building', '🏥': 'hospital', '🎪': 'tent', '🛟': 'lifebuoy',
  '🤖': 'robot', '🏋️': 'dumbbell', '🏋': 'dumbbell', '🩺': 'stethoscope',
  '🌊': 'waves', '🤿': 'diving', '⚓': 'anchor', '❤️': 'heart', '❤': 'heart',
  '🧾': 'receipt', '✅': 'checkCircle', '✓': 'check', '🔄': 'refresh',
  '⭐': 'star', '🌍': 'globe', '🌏': 'globe', '📑': 'document', '📄': 'document',
  '🛎️': 'bell', '🛎': 'bell', '🥈': 'medal', '🥇': 'award', '🥉': 'medal',
  '📞': 'phone', '☎': 'phone', '☎️': 'phone', '💬': 'chat', '📧': 'mail',
  '✉': 'mail', '✉️': 'mail', '🕐': 'clock', '📍': 'pin', '🔍': 'search',
  '✛': 'cross', '➕': 'cross', '👥': 'users', '🏆': 'award', '📋': 'clipboard',
  '💼': 'briefcase',
}

export function resolveIcon(name: string): string {
  if (ICONS[name]) return name
  if (EMOJI_MAP[name]) return EMOJI_MAP[name]
  // ลองตัด variation-selector ของ emoji
  const stripped = name.replace(/\uFE0F/g, '')
  if (EMOJI_MAP[stripped]) return EMOJI_MAP[stripped]
  return 'spark'
}

export default function Icon({
  name,
  ...props
}: { name: string } & SVGProps<SVGSVGElement>) {
  const key = resolveIcon(name)
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" {...props}>
      {ICONS[key]}
    </svg>
  )
}

/* IconChip — ไอคอนในกรอบสี่เหลี่ยมมุมโค้ง (ใช้แทน emoji ก้อนใหญ่) */
export function IconChip({
  name,
  size = 'md',
  variant = 'default',
  className = '',
}: {
  name: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'on-dark' | 'solid'
  className?: string
}) {
  const sizeCls = size === 'md' ? '' : size
  const varCls = variant === 'default' ? '' : variant
  return (
    <span className={`icon-chip ${sizeCls} ${varCls} ${className}`.trim()}>
      <Icon name={name} />
    </span>
  )
}
