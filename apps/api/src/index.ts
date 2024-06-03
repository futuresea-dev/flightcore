import http from 'http'

import express, { type ErrorRequestHandler } from 'express'
import { Server } from 'socket.io'

import helmet from 'helmet'
import PinoHTTPLogger from 'pino-http'

import { logger } from './log'

logger.trace('Setup')

const app = express()

const httpLogger = PinoHTTPLogger({
  logger,
})

const httpServer = http.createServer(app)
const socket = new Server(httpServer)

socket.on('connection', (io) => {
  logger.trace(`Session ${io.id} starts`)
})

app.use(helmet())
app.use(httpLogger)

app.use(function errorHandler(err, _, res, __) {
  logger.error(err)
  res.status(500).send('Server error')
} as ErrorRequestHandler)

httpServer.listen(3000)

logger.trace(`Server starts at 3000 port`)
