<script setup lang="ts">
import { useReducedMotion, useScroll } from 'motion-v'

const wrapperRef = ref<HTMLElement | null>(null)
const prefersReducedMotion = useReducedMotion()

const { scrollYProgress } = useScroll({
  target: wrapperRef,
  offset: ['start start', 'end start'],
})

const pointer = reactive({ x: 0, y: 0 })

function onPointerMove(event: PointerEvent) {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1
  pointer.y = (event.clientY / window.innerHeight) * 2 - 1
}

if (import.meta.client) {
  useEventListener(window, 'pointermove', onPointerMove)
}
</script>

<template>
  <div ref="wrapperRef" class="absolute inset-0">
    <TresCanvas alpha :clear-alpha="0" :dpr="[1, 2]">
      <HeroSceneContent
        :pointer="pointer"
        :reduced-motion="prefersReducedMotion"
        :scroll-y-progress="scrollYProgress"
      />
    </TresCanvas>
  </div>
</template>
