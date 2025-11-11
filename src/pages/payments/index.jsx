import React, { useMemo, useState } from 'react'

const Payments = () => {
  const [search, setSearch] = useState('')

  // Mock data shaped like your DB columns
  const payments = useMemo(() => ([
    { payment_id: 501, payment_code: 'PMT-2025-0001', payment_amount: 12.50, employee_id: 1 },
    { payment_id: 502, payment_code: 'PMT-2025-0002', payment_amount: 8.75, employee_id: 1 },
    { payment_id: 503, payment_code: 'PMT-2025-0003', payment_amount: 5.00, employee_id: 2 },
  ]), [])

  const filtered = payments.filter(p => {
    const term = search.toLowerCase()
    return `${p.payment_id} ${p.payment_code} ${p.payment_amount} ${p.employee_id}`.toLowerCase().includes(term)
  })

  const totalAmount = filtered.reduce((sum, p) => sum + Number(p.payment_amount || 0), 0)

  return (
    <div className="container-fluid py-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="mb-1">Payments</h2>
          <small className="text-muted">Records of payments made by employees</small>
        </div>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="text-muted small">Payments (showing)</div>
              <div className="h4 mb-0">{filtered.length}</div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <div className="text-muted small">Total Amount (showing)</div>
              <div className="h4 mb-0">${totalAmount.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-white d-flex flex-column flex-md-row gap-2 gap-md-3 align-items-md-center">
          <h5 className="mb-0">Payments List</h5>
          <div className="ms-md-auto" style={{maxWidth: 420, width: '100%'}}>
            <input
              className="form-control"
              placeholder="Search by id, code, amount, employee..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive table-responsive-sticky">
            <table className="table table-striped table-hover table-bordered align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th style={{width: 110}}>payment_id</th>
                  <th>payment_code</th>
                  <th style={{width: 160}}>payment_amount</th>
                  <th>employee_id</th>
                  <th style={{width: 130}}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length > 0 ? (
                  filtered.map((p) => (
                    <tr key={p.payment_id}>
                      <td>#{p.payment_id}</td>
                      <td className="text-monospace">{p.payment_code}</td>
                      <td>${Number(p.payment_amount).toFixed(2)}</td>
                      <td>{p.employee_id}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <button className="btn btn-outline-primary btn-sm">View</button>
                          <button className="btn btn-outline-secondary btn-sm">Refund</button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-muted py-5">No payments found</td>
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

export default Payments
