
export const bookingService = {
 getServices: async () => {
    const res = await fetch('/api/v1/services');
    return await res.json();
  },
};
