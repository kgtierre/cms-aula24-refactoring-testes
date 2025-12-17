const ComentarioManager = require('../modules/comentarios-refatorado');

describe('ComentarioManager', () => {
  beforeEach(() => {
    ComentarioManager.limparComentarios();
  });

  describe('adicionarComentario', () => {
    test('deve adicionar comentário com dados válidos', () => {
      const resultado = ComentarioManager.adicionarComentario(
        'João Silva',
        'Excelente conteúdo!',
        1
      );

      expect(resultado.sucesso).toBe(true);
      expect(resultado.comentario).toMatchObject({
        usuario: 'João Silva',
        texto: 'Excelente conteúdo!',
        postId: 1,
        status: 'pendente',
      });
      expect(resultado.comentario.id).toBeDefined();
      expect(resultado.comentario.data).toBeInstanceOf(Date);
    });

    test('deve falhar ao adicionar comentário com usuário vazio', () => {
      const resultado = ComentarioManager.adicionarComentario(
        '   ',
        'Texto válido',
        1
      );

      expect(resultado.sucesso).toBe(false);
      expect(resultado.erro).toBe('Dados inválidos');
    });
  });

  describe('obterComentariosPorPost', () => {
    test('deve retornar apenas comentários do post especificado', () => {
      ComentarioManager.adicionarComentario('Ana', 'Post 1 - Comentário 1', 1);
      ComentarioManager.adicionarComentario(
        'Bruno',
        'Post 1 - Comentário 2',
        1
      );

      const comentariosPost1 = ComentarioManager.obterComentariosPorPost(
        1,
        false
      );
      const EXPECTED_LENGTH = 2;
      expect(comentariosPost1).toHaveLength(EXPECTED_LENGTH);

      comentariosPost1.forEach((comentario) => {
        expect(comentario.postId).toBe(1);
      });
    });

    test('deve retornar array vazio para post sem comentários', () => {
      const comentariosPost3 = ComentarioManager.obterComentariosPorPost(3);
      const EMPTY_LENGTH = 0;
      expect(comentariosPost3).toHaveLength(EMPTY_LENGTH);
      expect(comentariosPost3).toEqual([]);
    });
  });

  describe('moderarComentario', () => {
    let comentarioId;

    beforeEach(() => {
      const resultado = ComentarioManager.adicionarComentario(
        'Moderador',
        'Comentário para moderar',
        1
      );
      comentarioId = resultado.comentario.id;
    });

    test('deve aprovar comentário com sucesso', () => {
      const resultado = ComentarioManager.moderarComentario(
        comentarioId,
        'aprovar'
      );
      expect(resultado.sucesso).toBe(true);
      expect(resultado.mensagem).toBe('Comentário aprovar com sucesso');
    });
  });
});
