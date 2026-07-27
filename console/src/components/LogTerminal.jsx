import { useEffect, useRef, useState } from 'react'

export default function LogTerminal() {
  const [logs, setLogs] = useState([])
  const bottomRef = useRef(null)

  useEffect(() => {
    const proto = location.protocol === 'https:' ? 'wss:' : 'ws:'
    const ws = new WebSocket(`${proto}//${location.host}/ws/logs`)

    ws.onopen = () => setLogs(prev => [...prev, '-- connected --'])
    ws.onmessage = e => setLogs(prev => [...prev.slice(-200), e.data])
    ws.onerror = () => setLogs(prev => [...prev, '-- connection error --'])

    return () => ws.close()
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  return (
    <div className="log-terminal">
      <div className="panel-header">LOGS</div>
      <div className="log-content">
        {logs.map((log, i) => (
          <div key={i} className="log-line">{log}</div>
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
