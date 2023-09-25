import { File } from '../utils/File'

const file = new File()

export const PUBLIC_FOLDER = file.resolvePath(__dirname, '..', 'public')
