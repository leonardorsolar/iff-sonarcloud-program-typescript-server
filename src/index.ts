import { Usuario } from './Usuario'

console.log('IFF')
// Variável declarada, mas nunca usada
const mensagem = 'hello world'
const mensagem1 = 'hello world'
//Uso de variável antes da declaração (hoisting problem)
//console.log(idade) // erro: 'idade' is used before it is defined
//const idade = 30

// Função sem retorno  explícito ou retorno inconsistente
export function sum(a: number, b: number) {
  if (a > 0) {
    return a + b
  }
  // falta return aqui
}

const usuario = new Usuario(1, 'leo', 'meo@gmail.com')
