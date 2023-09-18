import { IMailService } from './interfaces/IMailService'
import nodemailer, { Transporter } from 'nodemailer'

export class MailService implements IMailService {
  private client: Transporter | null = null

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

  async send(to: string, subject: string, body: string): Promise<void> {
    if (this.client) {
      const message = await this.client.sendMail({
        to,
        from: 'Etec Auth <etec@auth.com.br>',
        subject,
        text: body,
        html: body,
      })

      console.log('Message sent: %s', message.messageId)
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
    }
  }
}
