
export const bookingService = {
getServices: async () => {
    const res = await fetch('/api/v1/services');
    const data = await res.json();
    console.log('Raw fetched data inside service:', data); 
    return data; 
  },
};
