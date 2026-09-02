import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ServiceList } from '@/features/services/components/serviceList'


vi.mock('../ServiceCard', () => ({
  ServiceCard: ({ service }: any) => <div>{service.name}</div>,
}))

const mockServices = [
  { id: '1', name: 'Plumbing' },
  { id: '2', name: 'Electrician' },
]

// Helper: sabai render call ma Router wrap garna
const renderWithRouter = (ui: React.ReactElement) => {
  return render(<MemoryRouter>{ui}</MemoryRouter>)
}

describe('ServiceList', () => {
  it('shows loading skeletons when isLoading is true', () => {
    renderWithRouter(<ServiceList services={[]} isLoading={true} />)
    const skeletons = document.querySelectorAll('.h-\\[200px\\]')
    expect(skeletons.length).toBe(3)
  })

  it('shows empty message when services list is empty and not loading', () => {
    renderWithRouter(<ServiceList services={[]} isLoading={false} />)
    expect(screen.getByText('No services available right now.')).toBeInTheDocument()
  })

  it('renders service cards on success (data available)', () => {
    renderWithRouter(<ServiceList services={mockServices as any} isLoading={false} />)
    expect(screen.getByText('Plumbing')).toBeInTheDocument()
    expect(screen.getByText('Electrician')).toBeInTheDocument()
  })
})