export interface IMailService {
  send(
    to: string,
    subject: string,
    path: string,
    variables: Record<string, string>,
  ): Promise<void>
}
