import type { Service } from "@/features/services/types/service.types";
import { httpGet } from "../client/httpClient";

const MOCK_LATENCY_MS = 400;

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const servicesMock = {
  async fetchAll(): Promise<Service[]> {
    await delay(MOCK_LATENCY_MS);
    return httpGet<Service[]>("/api/v1/services");
  },

  async fetchById(id: string): Promise<Service> {
    await delay(MOCK_LATENCY_MS);
    const services = await httpGet<Service[]>("/api/v1/services");
    const service = services.find((s) => String(s.id) === String(id));

    if (!service) {
      throw new Error("Service not found");
    }

    return service;
  },
};