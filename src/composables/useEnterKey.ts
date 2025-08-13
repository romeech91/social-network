import { onMounted, onUnmounted } from "vue";

export function useEnterKey(callback: () => void) {
  const handler = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      callback();
    }
  };

  onMounted(() => {
    window.addEventListener("keydown", handler);
  });

  onUnmounted(() => {
    window.removeEventListener("keydown", handler);
  });
}
