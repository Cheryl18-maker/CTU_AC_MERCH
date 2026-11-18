async function request(path, options = {}) {
  const res = await fetch(`/api${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.message || 'Something went wrong')
  return data
}

export const api = {
  register: (universityId, birthday) =>
    request('/auth/register', { method: 'POST', body: JSON.stringify({ universityId, birthday }) }),
  login: (universityId, birthday) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ universityId, birthday }) }),
  me: (id) => request(`/users/${id}`),
  products: () => request('/products'),
  vouchers: () => request('/vouchers'),
  createOrder: (payload) => request('/orders', { method: 'POST', body: JSON.stringify(payload) }),
  getOrder: (orderNo) => request(`/orders/${orderNo}`),
}