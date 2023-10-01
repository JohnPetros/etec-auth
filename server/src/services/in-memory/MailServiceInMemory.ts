import { MessageDTO } from '../../dtos/MessageDTO'
import { IMailService } from '../interfaces/IMailService'

export class MailServiceInMemory implements IMailService {
  private messages: MessageDTO[] = []

  async send({ to, subject, path, variables }: MessageDTO): Promise<void> {
    this.messages.push({
      to,
      subject,
      path,
      variables,
    })
  }
}
