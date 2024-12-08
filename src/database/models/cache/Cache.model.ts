import path from 'node:path'
import { QuickDB } from 'quick.db'

export default new QuickDB({
	filePath: path.resolve(__dirname, 'user.sqlite'),
})
