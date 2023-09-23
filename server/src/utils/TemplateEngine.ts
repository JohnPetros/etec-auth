import handlebars from 'handlebars'
import { File } from './File'

export class TemplateEngine {
  compile(fileContent: string) {
    return handlebars.compile(fileContent)
  }

  getTemplatePath(folder: string, fileName: string) {
    const file = new File()

    return file.resolvePath(__dirname, '..', '..', folder, fileName)
  }
}
