import '@/database/index'
import '@/utils/error'
import '@/utils/logger'
import dotenv from 'dotenv'
import bootstrapApp from './app/bootstrap'
import bootstrapServer from './server/bootstrap'

dotenv.config()
bootstrapApp().then(() => bootstrapServer())
