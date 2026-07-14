<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const route = useRoute()
const id = route.params.id as string
</script>

<template>
  <AdminEditProjectPage :id="id" />
</template>
