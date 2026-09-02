import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useBookingForm } from "@/features/booking/hooks/useBookingForm";

// vi.hoisted() le yi variable haru pani vi.mock() jasari top ma hoisted garcha
const { createBooking, toastSuccess, toastError } = vi.hoisted(() => ({
  createBooking: vi.fn(),
  toastSuccess: vi.fn(),
  toastError: vi.fn(),
}));

vi.mock("@/features/booking/hooks/useBooking", () => ({
  useBooking: () => ({ createBooking, isLoading: false }),
}));

vi.mock("sonner", () => ({
  toast: { success: toastSuccess, error: toastError },
}));

const service = {
  id: "service-1",
  name: "Plumbing",
  price: 500,
};

describe("booking confirmation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    createBooking.mockResolvedValue({});
  });

  it("does not confirm when required fields are empty", async () => {
    const { result } = renderHook(() =>
      useBookingForm({ service, onSuccess: vi.fn() }),
    );

    await act(async () => {
      await result.current.handleConfirm();
    });

    expect(createBooking).not.toHaveBeenCalled();
    expect(toastError).toHaveBeenCalledWith("Please complete all booking details.");
    expect(result.current.validationErrors.customer_name?.[0]).toBe(
      "This field cannot be left empty",
    );
  });

  it("does not show validation errors before confirmation", () => {
    const { result } = renderHook(() =>
      useBookingForm({ service, onSuccess: vi.fn() }),
    );

    expect(result.current.validationErrors).toEqual({});
  });

  it("confirms a booking with completed fields", async () => {
    const onSuccess = vi.fn();
    const { result } = renderHook(() =>
      useBookingForm({ service, onSuccess }),
    );

    act(() => {
      result.current.handleChange("booking_date", "2026-09-03");
      result.current.handleChange("selected_slot", "10:00 AM");
      result.current.handleChange("customer_name", "Alex Shrestha");
      result.current.handleChange("address", "Baneshwor, Kathmandu");
    });

    await act(async () => {
      await result.current.handleConfirm();
    });

    expect(createBooking).toHaveBeenCalledWith({
      serviceId: "service-1",
      service_name: "Plumbing",
      customer_name: "Alex Shrestha",
      address: "Baneshwor, Kathmandu",
      booking_date: "2026-09-03",
      time_slot: "10:00 AM",
    });
    expect(toastSuccess).toHaveBeenCalledWith("Booking successfully created!");
    expect(onSuccess).toHaveBeenCalled();
  });
});