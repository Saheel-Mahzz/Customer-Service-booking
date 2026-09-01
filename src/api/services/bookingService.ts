import { delay } from "../client/httpClient";
import { mockServices } from "../mock/serviceData";


export const bookingService = {
  getServices: async () => {
    await delay(300);
    return mockServices;
  },
};
