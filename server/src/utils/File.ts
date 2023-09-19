import fs from 'node:fs'
import path from 'node:path'

export class File {
  read(path: string, encoding: BufferEncoding = 'utf-8') {
    return fs.readFileSync(path).toString(encoding)
  }

  resolvePath(...paths: string[]) {
    return path.resolve(...paths)
  }
}
