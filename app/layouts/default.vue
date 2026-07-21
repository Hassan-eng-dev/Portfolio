<script setup lang="ts">
import { motion, useScroll } from 'motion-v'

const { scrollYProgress } = useScroll()
const { localeProperties } = useI18n()
</script>

<template>
  <div class="flex min-h-dvh flex-col">
    <motion.div
      class="fixed start-0 top-0 z-50 h-[3px] w-full bg-brand-600"
      :style="{ scaleX: scrollYProgress, transformOrigin: localeProperties.dir === 'rtl' ? 'right' : 'left' }"
      aria-hidden="true"
    />
    <SiteHeader />
    <main class="flex-1">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
