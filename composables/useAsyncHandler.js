export function useAsyncHandler(handler) {
  const loading = ref(false);
  const errors = ref([]);

  async function asyncHandler() {
    loading.value = true;
    errors.value = [];
    try {
      return await handler();
    } catch (err) {
      let message;
      if (err.data?.statusMessage) {
        message = err.data.statusMessage;
      } else {
        message = err.toString();
      }
      errors.value.push(message);
    } finally {
      loading.value = false;
    }
  }

  return { loading, errors, asyncHandler };
}
