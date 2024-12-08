import type { Client } from 'discord.js'
import 'fastify'
import type database from '../database'

declare module 'fastify' {
	interface FastifyInstance {
		db: typeof database
	}
}
