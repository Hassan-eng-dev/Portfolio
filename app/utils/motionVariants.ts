import { stagger } from 'motion-v'

export const heroContainer = {
  hidden: {},
  show: { transition: { delayChildren: stagger(0.12) } },
}
export const heroItem = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
}

export const staggerContainer = {
  hidden: {},
  show: { transition: { delayChildren: stagger(0.08) } },
}
export const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
}
