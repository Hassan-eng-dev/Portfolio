// Subtly pulls an element toward the cursor on hover ("magnetic button").
// Disabled on touch devices and when the user prefers reduced motion.
export function useMagnetic(strength = 0.35) {
  const target = ref<HTMLElement | null>(null)

  function onMove(event: PointerEvent) {
    const el = target.value
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = event.clientX - (rect.left + rect.width / 2)
    const y = event.clientY - (rect.top + rect.height / 2)
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }

  function onLeave() {
    const el = target.value
    if (!el) return
    el.style.transform = 'translate(0, 0)'
  }

  onMounted(() => {
    const el = target.value
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    if (prefersReducedMotion || isTouch) return

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)

    onBeforeUnmount(() => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    })
  })

  return target
}
