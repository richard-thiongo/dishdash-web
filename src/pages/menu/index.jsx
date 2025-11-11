import React, { useMemo, useState } from 'react'

const initialMockMenus = [
  {
    menu_id: '1876125f-1fb6-4529-9e8f-7fa2c2b55bc5',
    menu_name: 'Maixe meal',
    restaurant_id: 'dbc6dcbe-5ff7-48dc-9f0d-4499a66e1832',
    menu_description: 'A good meal',
    menu_status: 0,
    menu_photo: 'uploads/colo.png',
    menu_price: 120,
  },
]

const currencyFormat = (value) =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' })
    .format(typeof value === 'number' ? value : Number(value || 0))

const Menu = () => {
  const [menus, setMenus] = useState(initialMockMenus)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all') // all | active | inactive
  const [sortBy, setSortBy] = useState('name-asc') // name-asc | price-asc | price-desc

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [formValues, setFormValues] = useState({
    menu_name: '',
    restaurant_id: '',
    menu_description: '',
    menu_status: 1,
    menu_photo: '',
    menu_price: '',
  })

  const filteredSortedMenus = useMemo(() => {
    let items = [...menus]

    if (search.trim()) {
      const q = search.trim().toLowerCase()
      items = items.filter((m) =>
        [
          m.menu_name,
          m.menu_description,
          m.restaurant_id,
        ]
          .filter(Boolean)
          .some((f) => String(f).toLowerCase().includes(q))
      )
    }

    if (statusFilter !== 'all') {
      const active = statusFilter === 'active'
      items = items.filter((m) => Boolean(m.menu_status) === active)
    }

    if (sortBy === 'name-asc') {
      items.sort((a, b) => a.menu_name.localeCompare(b.menu_name))
    } else if (sortBy === 'price-asc') {
      items.sort((a, b) => Number(a.menu_price) - Number(b.menu_price))
    } else if (sortBy === 'price-desc') {
      items.sort((a, b) => Number(b.menu_price) - Number(a.menu_price))
    }

    return items
  }, [menus, search, statusFilter, sortBy])

  const openCreate = () => {
    setEditingId(null)
    setFormValues({
      menu_name: '',
      restaurant_id: '',
      menu_description: '',
      menu_status: 1,
      menu_photo: '',
      menu_price: '',
    })
    setIsFormOpen(true)
  }

  const openEdit = (menu) => {
    setEditingId(menu.menu_id)
    setFormValues({
      menu_name: menu.menu_name || '',
      restaurant_id: menu.restaurant_id || '',
      menu_description: menu.menu_description || '',
      menu_status: Number(menu.menu_status) || 0,
      menu_photo: menu.menu_photo || '',
      menu_price: String(menu.menu_price ?? ''),
    })
    setIsFormOpen(true)
  }

  const closeForm = () => setIsFormOpen(false)

  const onChangeForm = (e) => {
    const { name, value } = e.target
    setFormValues((prev) => ({ ...prev, [name]: name === 'menu_price' ? value.replace(/[^0-9.]/g, '') : value }))
  }

  const onSubmitForm = (e) => {
    e.preventDefault()
    if (!formValues.menu_name || !formValues.menu_price) {
      console.warn('Menu name and price are required')
      return
    }

    if (editingId) {
      // Update existing (placeholder: console + local state)
      console.log('Update menu', { id: editingId, ...formValues })
      setMenus((prev) =>
        prev.map((m) =>
          m.menu_id === editingId
            ? { ...m, ...formValues, menu_price: Number(formValues.menu_price) }
            : m
        )
      )
    } else {
      // Create new (placeholder: console + local state)
      const newItem = {
        menu_id: crypto.randomUUID(),
        ...formValues,
        menu_price: Number(formValues.menu_price),
      }
      console.log('Create menu', newItem)
      setMenus((prev) => [newItem, ...prev])
    }

    setIsFormOpen(false)
  }

  const onDelete = (id) => {
    console.log('Delete menu', id)
    setMenus((prev) => prev.filter((m) => m.menu_id !== id))
  }

  const onToggleStatus = (id) => {
    setMenus((prev) =>
      prev.map((m) =>
        m.menu_id === id ? { ...m, menu_status: m.menu_status ? 0 : 1 } : m
      )
    )
  }

  const imageSrc = (menu) => {
    if (menu.menu_photo && typeof menu.menu_photo === 'string') return menu.menu_photo
    try {
      return process.env.PUBLIC_URL + '/logo512.png'
    } catch (e) {
      return ''
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.headerRow}>
        <h2 style={styles.title}>Menus</h2>
        <button style={styles.primaryButton} onClick={openCreate}>+ Add Menu</button>
      </div>

      <div style={styles.controlsRow}>
        <input
          style={styles.input}
          placeholder="Search by name, description, restaurant..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select style={styles.select} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <select style={styles.select} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="name-asc">Sort: Name (A-Z)</option>
          <option value="price-asc">Sort: Price (Low-High)</option>
          <option value="price-desc">Sort: Price (High-Low)</option>
        </select>
      </div>

      <div style={styles.grid}>
        {filteredSortedMenus.map((menu) => (
          <div key={menu.menu_id} style={styles.card}>
            <div style={styles.cardImageWrap}>
              <img alt={menu.menu_name} src={imageSrc(menu)} style={styles.cardImage} />
              <span style={{
                ...styles.statusBadge,
                backgroundColor: menu.menu_status ? '#16a34a' : '#b91c1c',
              }}>
                {menu.menu_status ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div style={styles.cardBody}>
              <div style={styles.cardTitleRow}>
                <h3 style={styles.cardTitle}>{menu.menu_name}</h3>
                <span style={styles.priceTag}>{currencyFormat(menu.menu_price)}</span>
              </div>
              <p style={styles.description}>{menu.menu_description}</p>
              <div style={styles.metaRow}>
                <span style={styles.metaLabel}>Restaurant:</span>
                <span style={styles.metaValue}>{menu.restaurant_id}</span>
              </div>
            </div>
            <div style={styles.cardActions}>
              <button style={styles.ghostButton} onClick={() => onToggleStatus(menu.menu_id)}>
                {menu.menu_status ? 'Deactivate' : 'Activate'}
              </button>
              <span style={{ flex: 1 }} />
              <button style={styles.secondaryButton} onClick={() => openEdit(menu)}>Edit</button>
              <button style={styles.dangerButton} onClick={() => onDelete(menu.menu_id)}>Delete</button>
            </div>
          </div>
        ))}
        {filteredSortedMenus.length === 0 && (
          <div style={styles.emptyState}>No menus match your search.</div>
        )}
      </div>

      {isFormOpen && (
        <div style={styles.modalOverlay} onClick={closeForm}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>{editingId ? 'Edit Menu' : 'Create Menu'}</h3>
              <button style={styles.ghostButton} onClick={closeForm}>Close</button>
            </div>
            <form onSubmit={onSubmitForm}>
              <div style={styles.formRow}>
                <label style={styles.label}>Name</label>
                <input style={styles.input} name="menu_name" value={formValues.menu_name} onChange={onChangeForm} placeholder="Menu name" />
              </div>
              <div style={styles.formRow}>
                <label style={styles.label}>Restaurant ID</label>
                <input style={styles.input} name="restaurant_id" value={formValues.restaurant_id} onChange={onChangeForm} placeholder="Restaurant UUID" />
              </div>
              <div style={styles.formRow}>
                <label style={styles.label}>Description</label>
                <textarea style={{ ...styles.input, height: 90 }} name="menu_description" value={formValues.menu_description} onChange={onChangeForm} placeholder="Describe the menu item" />
              </div>
              <div style={styles.formRowInline}>
                <div style={{ flex: 1 }}>
                  <label style={styles.label}>Price</label>
                  <input style={styles.input} name="menu_price" value={formValues.menu_price} onChange={onChangeForm} placeholder="e.g. 120" />
                </div>
                <div style={{ width: 16 }} />
                <div style={{ flex: 1 }}>
                  <label style={styles.label}>Status</label>
                  <select style={styles.select} name="menu_status" value={formValues.menu_status} onChange={(e) => setFormValues((p) => ({ ...p, menu_status: Number(e.target.value) }))}>
                    <option value={1}>Active</option>
                    <option value={0}>Inactive</option>
                  </select>
                </div>
              </div>
              <div style={styles.formRow}>
                <label style={styles.label}>Photo URL</label>
                <input style={styles.input} name="menu_photo" value={formValues.menu_photo} onChange={onChangeForm} placeholder="uploads/colo.png or https://..." />
              </div>
              <div style={styles.formActions}>
                <button type="button" style={styles.ghostButton} onClick={closeForm}>Cancel</button>
                <span style={{ flex: 1 }} />
                <button type="submit" style={styles.primaryButton}>{editingId ? 'Save Changes' : 'Create Menu'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

const styles = {
  page: {
    padding: 24,
    maxWidth: 1200,
    margin: '0 auto',
  },
  headerRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
  },
  title: {
    margin: 0,
    fontSize: 24,
  },
  controlsRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    minWidth: 220,
    padding: '10px 12px',
    borderRadius: 8,
    border: '1px solid #e5e7eb',
    outline: 'none',
  },
  select: {
    minWidth: 180,
    padding: '10px 12px',
    borderRadius: 8,
    border: '1px solid #e5e7eb',
    background: '#fff',
  },
  primaryButton: {
    padding: '10px 14px',
    borderRadius: 8,
    border: '1px solid #2563eb',
    background: '#2563eb',
    color: '#fff',
    cursor: 'pointer',
  },
  secondaryButton: {
    padding: '8px 12px',
    borderRadius: 8,
    border: '1px solid #1f2937',
    background: '#111827',
    color: '#fff',
    cursor: 'pointer',
  },
  dangerButton: {
    padding: '8px 12px',
    borderRadius: 8,
    border: '1px solid #dc2626',
    background: '#dc2626',
    color: '#fff',
    cursor: 'pointer',
  },
  ghostButton: {
    padding: '8px 12px',
    borderRadius: 8,
    border: '1px solid #e5e7eb',
    background: '#fff',
    color: '#111827',
    cursor: 'pointer',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: 16,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    border: '1px solid #e5e7eb',
    borderRadius: 12,
    overflow: 'hidden',
    background: '#fff',
  },
  cardImageWrap: {
    position: 'relative',
    height: 140,
    overflow: 'hidden',
    background: '#f3f4f6',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  statusBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: '4px 8px',
    borderRadius: 9999,
    color: '#fff',
    fontSize: 12,
  },
  cardBody: {
    padding: 12,
  },
  cardTitleRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    marginBottom: 6,
  },
  cardTitle: {
    margin: 0,
    fontSize: 18,
    flex: 1,
  },
  priceTag: {
    fontWeight: 700,
  },
  description: {
    margin: '8px 0',
    color: '#4b5563',
    minHeight: 36,
  },
  metaRow: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
    color: '#6b7280',
    fontSize: 13,
  },
  metaLabel: {
    fontWeight: 600,
  },
  metaValue: {
    fontFamily: 'monospace',
  },
  cardActions: {
    display: 'flex',
    gap: 8,
    padding: 12,
    borderTop: '1px solid #e5e7eb',
    alignItems: 'center',
  },
  emptyState: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    padding: 24,
    color: '#6b7280',
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.35)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    zIndex: 50,
  },
  modal: {
    background: '#fff',
    borderRadius: 12,
    width: 'min(720px, 100%)',
    padding: 16,
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
  },
  modalHeader: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 8,
  },
  modalTitle: {
    margin: 0,
  },
  formRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    margin: '12px 0',
  },
  formRowInline: {
    display: 'flex',
    gap: 12,
    margin: '12px 0',
  },
  label: {
    fontSize: 13,
    color: '#374151',
  },
  formActions: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
  },
}

export default Menu
