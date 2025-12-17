const ComentarioManager = require('./src/modules/comentarios-refatorado');

function demonstrarFuncionalidades() {
  console.log('🚀 Demonstração do Módulo de Comentários Refatorado\n');
  
  console.log('1. Adicionando comentários...');
  const resultado1 = ComentarioManager.adicionarComentario('Alice', 'Ótimo post sobre JavaScript!', 101);
  const resultado2 = ComentarioManager.adicionarComentario('Bob', 'Muito útil, obrigado!', 101);
  
  console.log(`   - Comentário 1: ${resultado1.sucesso ? '✅' : '❌'} (ID: ${resultado1.comentario?.id})`);
  console.log(`   - Comentário 2: ${resultado2.sucesso ? '✅' : '❌'} (ID: ${resultado2.comentario?.id})`);
  
  console.log('\n2. Moderando um comentário...');
  const moderacao = ComentarioManager.moderarComentario(resultado1.comentario.id, 'aprovar');
  console.log(`   - Moderação: ${moderacao.sucesso ? '✅' : '❌'} ${moderacao.mensagem || moderacao.erro}`);
  
  console.log('\n3. Comentários do post 101:');
  const comentariosPost101 = ComentarioManager.obterComentariosPorPost(101);
  comentariosPost101.forEach(comentario => {
    console.log(`   - ${comentario.usuario}: "${comentario.texto}" (${comentario.status})`);
  });
  
  console.log('\n✅ Demonstração concluída com sucesso!');
}

if (require.main === module) {
  demonstrarFuncionalidades();
}

module.exports = { ComentarioManager, demonstrarFuncionalidades };
