import { http, HttpResponse } from 'msw';

const mockServices = [
  { id: '1', name: 'Plumbing Repair', price: 500 },
  { id: '2', name: 'Electrical Repair', price: 800 }
];

export const handlers = [
  http.get('/api/v1/services', () => {
    return HttpResponse.json(mockServices);
  }),

  http.get('/api/v1/services/:id', ({ params }) => {
    const service = mockServices.find(s => s.id === params.id);
    return HttpResponse.json(service || { error: 'Not found' });
  }),


];