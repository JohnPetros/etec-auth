import handlebars from 'handlebars'

export class TemplateEngine {
  compile(fileContent: string) {
    return handlebars.compile(fileContent)
  }
}
