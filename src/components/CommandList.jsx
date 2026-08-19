import { useState, useRef, forwardRef, useImperativeHandle, useEffect } from 'react'

const CommandList = forwardRef(function CommandList({ commands, selectedId, onSelect, onDelete }, ref) {
  const [openId, setOpenId] = useState(null)
  const containerRef = useRef(null)
  const wasAtBottomRef = useRef(false)

  useEffect(() => {
    // Scroll to bottom if we were at bottom before
    if (wasAtBottomRef.current && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [commands])

  useImperativeHandle(ref, () => ({
    scrollToBottom: () => {
      if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight
      }
    },
    isAtBottom: () => {
      if (!containerRef.current) return false
      const { scrollHeight, scrollTop, clientHeight } = containerRef.current
      return Math.abs(scrollHeight - scrollTop - clientHeight) < 10
    },
    setWasAtBottom: (value) => {
      wasAtBottomRef.current = value
    }
  }))

  function toggleMenu(e, id) {
    e.stopPropagation()
    setOpenId(prev => prev === id ? null : id)
  }

  function handleDelete(e, id) {
    e.stopPropagation()
    setOpenId(null)
    if (window.confirm('Supprimer cette commande ?')) {
      onDelete(id)
    }
  }

  return (
    <div className="command-list" ref={containerRef}>
      <table className="cmd-table">
        <thead>
          <tr>
            <th>#</th>
            <th>COMMAND</th>
            <th>STATUS</th>
            <th>TIME</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {commands.length === 0 && (
            <tr><td colSpan={5} className="empty">no commands</td></tr>
          )}
          {commands.map(cmd => (
            <tr
              key={cmd.id}
              className={`cmd-row ${selectedId === cmd.id ? 'active' : ''}`}
              onClick={() => { setOpenId(null); onSelect(cmd.id) }}
            >
              <td className="dim">{cmd.order}</td>
              <td className="cmd-text">{cmd.command}</td>
              <td><StatusBadge status={cmd.status} /></td>
              <td className="dim">{formatTime(cmd.updated_at)}</td>
              <td className="cmd-menu-cell">
                <button className="menu-dots" onClick={e => toggleMenu(e, cmd.id)}>⋯</button>
                {openId === cmd.id && (
                  <button className="menu-delete" onClick={e => handleDelete(e, cmd.id)}>
                    supprimer
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
})

export default CommandList

function formatTime(iso) {
  if (!iso) return ''
  return new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
}

function StatusBadge({ status }) {
  const cls = { DONE: 'status-done', PENDING: 'status-pending', FAILED: 'status-failed' }[status] ?? ''
  return <span className={`status ${cls}`}>{status}</span>
}
