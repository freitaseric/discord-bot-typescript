import Fastify from 'fastify'
import indexRoutes from './routes/index.routes'
import settingsRoutes from './routes/settings.routes'
import statisticsRoutes from './routes/statistics.routes'

export default () => {
	const server = Fastify()

	server.register(indexRoutes)
	server.register(settingsRoutes, { prefix: 'settings' })
	server.register(statisticsRoutes, { prefix: 'statistics' })

	server.listen(
		{ host: process.env.HOST ?? '0.0.0.0', port: process.env.PORT ?? 8080 },
		(err, address) => {
			if (err) {
				console.error(err)
				process.exit(1)
			}

			console.info(`Web server successfully listening on ${address}`)
		},
	)
}
