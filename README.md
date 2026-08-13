TRIGGER WARNING

This repository contains C2 (Command & Control) console code for security research and authorized penetration testing purposes only.

# C2-Console

Web-based command and control console for managing remote implants.

## Overview

This console allows operators to:
- Monitor connected implants in real-time
- Send commands to remote agents
- View execution results with live logging
- Manage multiple agents simultaneously
- Monitor agent status and health

## Features

- **Real-time Dashboard**: Live agent status monitoring
- **Command Execution**: Send commands to remote agents
- **Log Terminal**: View agent output and command results
- **Resizable UI**: Adjustable panels for optimal workspace
- **WebSocket Support**: Real-time bidirectional communication

## Building

```bash
npm install
npm run dev
```

For production:
```bash
npm run build
```

## Configuration

Connect to your C2 server by setting the API endpoint in the configuration.

## Docker

```bash
docker build -t c2-console .
docker run -p 5173:5173 c2-console
```

## Security Notice

This code demonstrates security concepts. Use responsibly and only in authorized contexts.
