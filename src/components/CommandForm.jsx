import { useState, useRef, useEffect } from 'react'
import { createCommand } from '../api/client'

export default function CommandForm({ onCreated, nextOrder, commandListRef }) {
  const [command, setCommand] = useState('')
  const [loading, setLoading] = useState(false)
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('commandHistory')
    return saved ? JSON.parse(saved) : []
  })
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef(null)
  const isAtBottomRef = useRef(true)

  useEffect(() => {
    localStorage.setItem('commandHistory', JSON.stringify(history))
  }, [history])

  function handleKeyDown(e) {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setCommand(history[history.length - 1 - newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setCommand(history[history.length - 1 - newIndex])
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setCommand('')
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!command.trim()) return

    setLoading(true)
    try {
      // Add to history if not already the last command
      if (history.length === 0 || history[history.length - 1] !== command.trim()) {
        const newHistory = [...history, command.trim()]
        setHistory(newHistory)
      }

      // Check if scrolled to bottom before submission
      const wasAtBottom = commandListRef?.current?.isAtBottom?.() ?? false
      isAtBottomRef.current = wasAtBottom

      await createCommand(command.trim(), nextOrder)
      setCommand('')
      setHistoryIndex(-1)
      onCreated()

      // Scroll to bottom if was at bottom
      setTimeout(() => {
        if (isAtBottomRef.current && commandListRef?.current?.scrollToBottom) {
          commandListRef.current.scrollToBottom()
        }
      }, 0)
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
        ref={inputRef}
        className="form-input"
        type="text"
        placeholder="command"
        value={command}
        onChange={e => {
          setCommand(e.target.value)
          setHistoryIndex(-1)
        }}
        onKeyDown={handleKeyDown}
        disabled={loading}
        autoComplete="off"
      />
      <button className="form-btn" type="submit" disabled={loading}>
        {loading ? '...' : 'send'}
      </button>
    </form>
  )
}
