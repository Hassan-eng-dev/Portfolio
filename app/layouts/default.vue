<script setup lang="ts">
import { motion, useScroll } from 'motion-v'

const { scrollYProgress } = useScroll()
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <motion.div
      class="fixed left-0 top-0 z-50 h-[3px] w-full origin-left bg-brand-600"
      :style="{ scaleX: scrollYProgress }"
      aria-hidden="true"
    />
    <SiteHeader />
    <main class="flex-1">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
