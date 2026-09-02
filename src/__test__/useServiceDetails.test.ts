import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { bookingService } from '@/api/services/bookingService'
import { useServiceDetails } from '@/features/serviceDetails/hooks/useServiceDetails'

vi.mock('@/api/services/bookingService', () => ({
  bookingService: {
    getServiceById: vi.fn(),
    getServices: vi.fn(),
  },
}))

describe('useServiceDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('skips fetch and sets loading false when serviceId is undefined', () => {
    const { result } = renderHook(() => useServiceDetails(undefined))
    expect(result.current.loading).toBe(false)
    expect(result.current.service).toBe(null)
  })

  it('starts with loading true when serviceId is provided', () => {
    ;(bookingService.getServiceById as any).mockResolvedValue({})
    const { result } = renderHook(() => useServiceDetails('1'))
    expect(result.current.loading).toBe(true)
  })

  it('sets service on success', async () => {
    const mockService = { id: '1', name: 'Plumbing', price: 500 }
    ;(bookingService.getServiceById as any).mockResolvedValue(mockService)

    const { result } = renderHook(() => useServiceDetails('1'))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.service).toEqual(mockService)
    expect(result.current.error).toBe(null)
  })

  it('sets error on failure', async () => {
    ;(bookingService.getServiceById as any).mockRejectedValue(new Error('Service not found'))

    const { result } = renderHook(() => useServiceDetails('1'))

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBe('Service not found')
    expect(result.current.service).toBe(null)
  })
})