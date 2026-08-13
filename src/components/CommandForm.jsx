import { useState } from 'react'
import { createCommand } from '../api/client'

export default function CommandForm({ onCreated, nextOrder }) {
  const [command, setCommand] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!command.trim()) return
    setLoading(true)
    try {
      await createCommand(command.trim(), nextOrder)
      setCommand('')
      onCreated()
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className="command-form" onSubmit={handleSubmit}>
      <span className="form-prompt">$</span>
      <input
        className="form-input"
        type="text"
        placeholder="command"
        value={command}
        onChange={e => setCommand(e.target.value)}
        disabled={loading}
        autoComplete="off"
      />
      <button className="form-btn" type="submit" disabled={loading}>
        {loading ? '...' : 'send'}
      </button>
    </form>
  )
}
