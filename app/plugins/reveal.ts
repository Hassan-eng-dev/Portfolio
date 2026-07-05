// Registers a `v-reveal` directive: adds `.reveal` + toggles `.is-visible`
// (see app/assets/scss/main.scss) when the element scrolls into view.
// Usage: `v-reveal` or `v-reveal="index * 60"` for a staggered delay in ms.
export default defineNuxtPlugin((nuxtApp) => {
  const observed = new WeakMap<Element, IntersectionObserver>()

  nuxtApp.vueApp.directive('reveal', {
    mounted(el: HTMLElement, binding) {
      el.classList.add('reveal')

      const delay = typeof binding.value === 'number' ? binding.value : 0
      if (delay) el.style.transitionDelay = `${delay}ms`

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              el.classList.add('is-visible')
              observer.unobserve(el)
              observed.delete(el)
            }
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -10% 0px' },
      )

      observer.observe(el)
      observed.set(el, observer)
    },
    unmounted(el: HTMLElement) {
      observed.get(el)?.disconnect()
      observed.delete(el)
    },
  })
})
