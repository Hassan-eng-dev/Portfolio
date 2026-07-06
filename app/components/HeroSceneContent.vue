<script setup lang="ts">
import { useLoop } from '@tresjs/core'
import type { MotionValue } from 'motion-v'

const props = defineProps<{
  pointer: { x: number, y: number }
  reducedMotion: boolean
  scrollYProgress: MotionValue<number>
}>()

const groupRef = ref()
const torusKnotRef = ref()
const icosahedronRef = ref()
const sphereRef = ref()
const ringRef = ref()

const { onBeforeRender } = useLoop()

onBeforeRender(({ delta }) => {
  const reduced = props.reducedMotion

  if (!reduced) {
    if (torusKnotRef.value) {
      torusKnotRef.value.rotation.x += delta * 0.15
      torusKnotRef.value.rotation.y += delta * 0.22
    }
    if (icosahedronRef.value) {
      icosahedronRef.value.rotation.x -= delta * 0.18
      icosahedronRef.value.rotation.y += delta * 0.12
    }
    if (sphereRef.value) {
      sphereRef.value.rotation.y += delta * 0.1
    }
    if (ringRef.value) {
      ringRef.value.rotation.z += delta * 0.2
    }
  }

  if (groupRef.value) {
    const targetRotY = reduced ? 0 : props.pointer.x * 0.25
    const targetRotX = reduced ? 0 : -props.pointer.y * 0.15
    groupRef.value.rotation.y += (targetRotY - groupRef.value.rotation.y) * 0.04
    groupRef.value.rotation.x += (targetRotX - groupRef.value.rotation.x) * 0.04

    const drift = reduced ? 0 : props.scrollYProgress.get()
    groupRef.value.position.y = -drift * 2.5
    groupRef.value.scale.setScalar(1 - drift * 0.15)
  }
})
</script>

<template>
  <TresPerspectiveCamera :position="[0, 0, 8]" :fov="45" />
  <TresAmbientLight :intensity="0.7" />
  <TresDirectionalLight :position="[4, 4, 5]" :intensity="1.1" color="#bfdbfe" />
  <TresPointLight :position="[-4, -2, 3]" :intensity="0.9" color="#2563eb" />

  <TresGroup ref="groupRef">
    <TresMesh ref="torusKnotRef" :position="[3.6, 0.6, -1]">
      <TresTorusKnotGeometry :args="[0.75, 0.25, 128, 16]" />
      <TresMeshStandardMaterial color="#2563eb" :metalness="0.55" :roughness="0.25" />
    </TresMesh>

    <TresMesh ref="icosahedronRef" :position="[5.3, -1.2, -2]">
      <TresIcosahedronGeometry :args="[0.75, 0]" />
      <TresMeshStandardMaterial color="#60a5fa" :metalness="0.35" :roughness="0.35" />
    </TresMesh>

    <TresMesh ref="sphereRef" :position="[2.2, -1.8, -2.6]">
      <TresSphereGeometry :args="[0.45, 32, 32]" />
      <TresMeshStandardMaterial
        color="#93c5fd"
        :metalness="0.2"
        :roughness="0.5"
        emissive="#1d4ed8"
        :emissive-intensity="0.15"
      />
    </TresMesh>

    <TresMesh ref="ringRef" :position="[4.6, 2, -2.4]" :rotation="[0.6, 0.2, 0]">
      <TresTorusGeometry :args="[0.6, 0.05, 16, 64]" />
      <TresMeshStandardMaterial color="#1d4ed8" wireframe />
    </TresMesh>
  </TresGroup>
</template>
