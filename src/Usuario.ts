// src/models/Usuario.ts

export class Usuario {
  private id: number
  private nome: string
  private email: string

  constructor(id: number, nome: string, email: string) {
    this.id = id
    this.nome = nome
    this.email = email
  }

  public getNome(): string {
    return this.nome
  }

  public setNome(nome: string): void {
    this.nome = nome
  }

  public exibirResumo(): string {
    return `Usuário: ${this.nome} <${this.email}>`
  }
}
