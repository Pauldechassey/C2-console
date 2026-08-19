import { useState } from 'react'
import AgentStatus from './AgentStatus'

export default function CommandResult({ command, lastSeen }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    if (!command?.output) return
    await navigator.clipboard.writeText(command.output)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="command-result">
      <div className="panel-header panel-header-row">
        <span>OUTPUT</span>
        <span className="panel-header-actions">
          {command?.output && (
            <button className="copy-btn" onClick={handleCopy}>{copied ? 'copied' : 'copy'}</button>
          )}
          <AgentStatus lastSeen={lastSeen} />
        </span>
      </div>
      <div className="result-content">
        {!command && <span className="dim">select a command</span>}
        {command && !command.output && <span className="dim">no output yet</span>}
        {command?.output && <pre>{command.output}</pre>}
      </div>
    </div>
  )
}
