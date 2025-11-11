import React, { useMemo, useState } from 'react'

const Orders = () => {
  const [search, setSearch] = useState('')
  const [showPaidOnly, setShowPaidOnly] = useState(false)

  // Mock data shaped like your DB columns
  const orders = useMemo(() => ([
    { order_id: 101, employee_id: 1, menu_id: 12, is_paid: 1, order_date: '2025-09-20T10:22:00Z', payment_id: 501 },
    { order_id: 102, employee_id: 2, menu_id: 14, is_paid: 0, order_date: '2025-09-21T12:10:00Z', payment_id: null },
    { order_id: 103, employee_id: 1, menu_id: 15, is_paid: 1, order_date: '2025-09-22T08:05:00Z', payment_id: 502 },
  ]), [])

  const formatDate = (dateString) => {
    if (!dateString) return '-'
    const d = new Date(dateString)
    if (isNaN(d.getTime())) return dateString
    return d.toLocaleString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
  }

  const filtered = orders.filter(o => {
    const term = search.toLowerCase()
    const matches = `${o.order_id} ${o.employee_id} ${o.menu_id} ${o.payment_id ?? ''}`.toLowerCase().includes(term)
    const paidOk = showPaidOnly ? o.is_paid === 1 : true
    return matches && paidOk
  })

  const total = orders.length
  const paid = orders.filter(o => o.is_paid === 1).length
  const unpaid = total - paid

  return (
    <div className="container-fluid py-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="mb-1">Orders</h2>
          <small className="text-muted">Overview of employee meal orders</small>
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="text-muted small">Total Orders</div>
              <div className="h4 mb-0">{total}</div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="text-muted small">Paid</div>
              <div className="h4 mb-0 text-success">{paid}</div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="text-muted small">Unpaid</div>
              <div className="h4 mb-0 text-danger">{unpaid}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-white d-flex flex-column flex-md-row gap-2 gap-md-3 align-items-md-center">
          <h5 className="mb-0">Orders List</h5>
          <div className="ms-md-auto d-flex gap-2 w-100 w-md-auto" style={{maxWidth: 520}}>
            <input
              className="form-control"
              placeholder="Search by order, employee, menu, payment..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="form-check align-self-center">
              <input className="form-check-input" type="checkbox" id="paidOnly" checked={showPaidOnly} onChange={(e) => setShowPaidOnly(e.target.checked)} />
              <label className="form-check-label" htmlFor="paidOnly">Paid only</label>
            </div>
          </div>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive table-responsive-sticky">
            <table className="table table-striped table-hover table-bordered align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th style={{width: 90}}>order_id</th>
                  <th>employee_id</th>
                  <th>menu_id</th>
                  <th style={{width: 110}}>is_paid</th>
                  <th style={{minWidth: 140}}>order_date</th>
                  <th>payment_id</th>
                  <th style={{width: 130}}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length > 0 ? (
                  filtered.map((o) => (
                    <tr key={o.order_id}>
                      <td>#{o.order_id}</td>
                      <td>{o.employee_id}</td>
                      <td>{o.menu_id}</td>
                      <td>
                        <span className={`badge rounded-pill ${o.is_paid === 1 ? 'bg-success-subtle text-success border border-success-subtle' : 'bg-danger-subtle text-danger border border-danger-subtle'}`}>
                          {o.is_paid === 1 ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td>{formatDate(o.order_date)}</td>
                      <td>{o.payment_id ?? '-'}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <button className="btn btn-outline-primary btn-sm">View</button>
                          <button className="btn btn-outline-secondary btn-sm">Receipt</button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center text-muted py-5">No orders found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders
