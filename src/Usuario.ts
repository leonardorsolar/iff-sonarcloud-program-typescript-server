export default class Usuario {
  private id: number
  private nome: string
  private email: string
  //private idade: number // não utilizada

  constructor(id: number, nome: string, email: string) {
    this.id = id
    this.nome = nome
    this.email = email
  }

  // TODO: adicionar checagem de nome
  public getNome(): string {
    return this.nome
  }

  public setNome(nome: string): void {
    this.nome = nome
  }

  // FIXME: checar email válido
  public exibirResumo(): string {
    return 'Usuário: ' + this.nome + ' <' + this.email + '>' // hardcoded string
  }

  // método vazio
  public metodoVazio(): void {
    // TODO implementar
  }

  // nome pouco descritivo
  public a(): string {
    return this.nome
  }
}
