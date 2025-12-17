const db = require('./database');

class ComentarioManager {
  constructor() {
    this.comentarios = db.get('comentarios') || [];
  }

  adicionarComentario(usuario, texto, postId) {
    if (!this.validarDadosComentario(usuario, texto, postId)) {
      return { sucesso: false, erro: 'Dados inválidos' };
    }

    const novoComentario = this.criarComentario(usuario, texto, postId);
    this.comentarios.push(novoComentario);
    this.salvarComentarios();

    return { sucesso: true, comentario: novoComentario };
  }

  obterComentariosPorPost(postId, apenasAprovados = true) {
    return this.comentarios.filter((comentario) => {
      const correspondeAoPost = comentario.postId === postId;
      const estaAprovado = !apenasAprovados || comentario.status === 'aprovado';
      return correspondeAoPost && estaAprovado;
    });
  }

  moderarComentario(id, acao) {
    const comentarioIndex = this.encontrarComentarioPorId(id);

    const NOT_FOUND_INDEX = -1;
    if (comentarioIndex === NOT_FOUND_INDEX) {
      return { sucesso: false, erro: 'Comentário não encontrado' };
    }

    if (!this.acaoValida(acao)) {
      return { sucesso: false, erro: 'Ação de moderação inválida' };
    }

    this.aplicarAcaoModeracao(comentarioIndex, acao);
    this.salvarComentarios();

    return { sucesso: true, mensagem: `Comentário ${acao} com sucesso` };
  }

  contarComentariosPorStatus(status) {
    return this.comentarios.reduce((contador, comentario) => {
      return comentario.status === status ? contador + 1 : contador;
    }, 0);
  }

  obterComentariosPendentes() {
    return this.comentarios.filter(
      (comentario) => comentario.status === 'pendente'
    );
  }

  // Métodos privados (convenção com _)
  _gerarNovoId() {
    if (this.comentarios.length === 0) return 1;
    const ultimoId = Math.max(...this.comentarios.map((c) => c.id));
    return ultimoId + 1;
  }

  validarDadosComentario(usuario, texto, postId) {
    const usuarioValido =
      usuario && typeof usuario === 'string' && usuario.trim().length > 0;

    const textoValido =
      texto && typeof texto === 'string' && texto.trim().length > 0;

    const postIdValido = postId && Number.isInteger(postId) && postId > 0;

    return usuarioValido && textoValido && postIdValido;
  }

  criarComentario(usuario, texto, postId) {
    return {
      id: this._gerarNovoId(),
      usuario: usuario.trim(),
      texto: texto.trim(),
      postId,
      data: new Date(),
      status: 'pendente',
    };
  }

  encontrarComentarioPorId(id) {
    return this.comentarios.findIndex((comentario) => comentario.id === id);
  }

  acaoValida(acao) {
    const acoesValidas = ['aprovar', 'rejeitar', 'excluir'];
    return acoesValidas.includes(acao);
  }

  aplicarAcaoModeracao(index, acao) {
    if (acao === 'excluir') {
      this.comentarios.splice(index, 1);
    } else {
      this.comentarios[index].status =
        acao === 'aprovar' ? 'aprovado' : 'rejeitado';
    }
  }

  salvarComentarios() {
    db.set('comentarios', this.comentarios);
  }

  // Método para limpar todos os comentários (apenas para testes)
  limparComentarios() {
    this.comentarios = [];
    this.salvarComentarios();
  }
}

module.exports = new ComentarioManager();
