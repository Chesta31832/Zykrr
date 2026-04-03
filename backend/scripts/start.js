import { execSync, spawn } from 'node:child_process'

process.env.DATABASE_URL ||= 'file:./prisma/dev.db'

try {
  execSync('npx prisma db push', {
    stdio: 'inherit',
    env: process.env,
  })
} catch (error) {
  process.exit(error.status || 1)
}

const nodeCommand = process.execPath
const server = spawn(nodeCommand, ['src/index.js'], {
  stdio: 'inherit',
  env: process.env,
})

server.on('exit', (code) => {
  process.exit(code ?? 0)
})