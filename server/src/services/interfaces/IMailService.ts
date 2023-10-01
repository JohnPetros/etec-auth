import { MessageDTO } from "../../dtos/MessageDTO";

export interface IMailService {
  send({}: MessageDTO): Promise<void>
}
