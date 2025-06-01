import Usuario from '../Usuario'

describe('Classe usuario', () => {
  test('Deve criar uma usuario com nome, email e senha', () => {
    // Given: O contexto inicial ou configuração necessária para o teste
    // Aqui você deve criar qualquer configuração necessária para o teste.
    const usuario = new Usuario(1, 'leonardo', 'leonardo@gmail.com')

    // When: A ação ou evento que ocorre no teste
    // Aqui você deve realizar a ação ou evento que está sendo testado.
    const nome = usuario.getNome()

    // Then: O resultado esperado ou efeito da ação
    // Aqui você deve verificar se o resultado é o esperado.
    expect(nome).toBe('leonardo')
  })
})
