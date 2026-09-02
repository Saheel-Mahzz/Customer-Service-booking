import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { bookingService } from '@/api/services/bookingService'
import { useServices } from '@/features/services/hooks/useServices'

vi.mock('@/api/services/bookingService', () => ({
  bookingService: {
    getServices: vi.fn(),
    getServiceById: vi.fn(),
  },
}))

describe('useServices', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('starts with loading true', () => {
    ;(bookingService.getServices as any).mockResolvedValue([])
    const { result } = renderHook(() => useServices())
    expect(result.current.loading).toBe(true)
  })

  it('sets services on success', async () => {
    const mockData = [{ id: '1', name: 'Plumbing', price: 500 }]
    ;(bookingService.getServices as any).mockResolvedValue(mockData)

    const { result } = renderHook(() => useServices())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.services).toEqual(mockData)
    expect(result.current.error).toBe(null)
  })

  it('sets error on failure', async () => {
    ;(bookingService.getServices as any).mockRejectedValue(new Error('Network error'))

    const { result } = renderHook(() => useServices())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.error).toBe('Network error')
    expect(result.current.services).toEqual([])
  })
})