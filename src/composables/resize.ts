import { ref, onMounted, onUnmounted } from 'vue'

export function useResize() {
  const width = ref(0)
  const height = ref(0)

  function onResize() {
    width.value = window.innerWidth
    height.value = window.innerHeight
  }

  onMounted(() => {
    window.addEventListener('resize', onResize)
    onResize()
  })
  onUnmounted(() => window.removeEventListener('resize', onResize))

  return { width, height }
}