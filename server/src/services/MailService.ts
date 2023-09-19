import { File } from '../utils/File'
import { TemplateEngine } from '../utils/TemplateEngine'
import { IMailService } from './interfaces/IMailService'
import nodemailer, { Transporter } from 'nodemailer'

export class MailService implements IMailService {
  private client: Transporter | null = null
  from = 'Etec Auth <etec@auth.com.br>'

  constructor() {
    nodemailer
      .createTestAccount()
      .then((account) => {
        const transporter = nodemailer.createTransport({
          host: account.smtp.host,
          port: account.smtp.port,
          secure: account.smtp.secure,
          auth: {
            user: account.user,
            pass: account.pass,
          },
        })

        this.client = transporter
      })
      .catch((error) => console.error(error))
  }

  async send(
    to: string,
    subject: string,
    path: string,
    variables: Record<string, string>
  ): Promise<void> {
    if (this.client) {
      const file = new File()

      const templateFileContent = file.read(path)

      const templateEngine = new TemplateEngine()

      const templateParse = templateEngine.compile(templateFileContent)

      const templateHTML = templateParse(variables)

      const message = await this.client.sendMail({
        to,
        from: this.from,
        subject,
        html: templateHTML,
      })

      console.log('Message sent: %s', message.messageId)
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
    }
  }
}
