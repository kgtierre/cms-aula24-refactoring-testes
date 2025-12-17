// Simulação simples de banco de dados em memória
class Database {
  constructor() {
    this.store = new Map();
  }

  get(key) {
    return this.store.get(key) || null;
  }

  set(key, value) {
    this.store.set(key, value);
    return true;
  }

  delete(key) {
    return this.store.delete(key);
  }

  clear() {
    this.store.clear();
  }
}

// Exportar uma instância única (singleton)
module.exports = new Database();
