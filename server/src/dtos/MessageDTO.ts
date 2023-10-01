export type MessageDTO = {
  to: string
  subject: string
  path: string
  variables: Record<string, string>
}
