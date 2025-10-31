// 2. A sintaxe para criar o app mudou
const { createApp } = Vue

const app = createApp({
    data() {
        return {
            departamentos: [], // Lista original vinda da API
            departamentoSelecionado: null,
            // Quem está selecionado (null = ninguém)
            // Objeto usado pelo formulário do modal de adicionar
            novoDepartamento: {
                id: null,
                nome: '',
                _local: '',
                descricao: ''
            },
            // atualizar departamento
            departamentoEmEdicao: {
                nome: '', //o que estiver no campo nome do departamento selecionado
                _local: '', //o que estiver no campo local do departamento selecionado
                descricao: '' //o que estiver no campo descricao do departamento selecionado
            },
            funcionarios: [],
            funcionarioSelecionado: null,
            novoFuncionario: {
                id: null,
                nome: '',
                funcao: '',
                registro: '',
                departamento: null
            },
            funcionarioEmEdicao: {
                nome: '', //o que estiver no campo nome do departamento selecionado
                funcao: '', //o que estiver no campo local do departamento selecionado
                registro: '', //o que estiver no campo descricao do departamento selecionado
                departamento: null
            },
            termoBusca: '', // O que está digitado na searchbar
            paginaAtual: 'home' // Controla qual página está sendo exibida
        }
    },
    computed: {
        // Esta é a lista que a tabela vai RENDERIZAR.
        // É uma lista "virtual" que se atualiza sozinha.
        departamentosFiltrados() {
            // Se não há nada na busca, retorna a lista completa
            if (this.termoBusca === '') {
                return this.departamentos;
            }

            // Normaliza o termo de busca (minúsculas)
            const busca = this.termoBusca.toLowerCase();

            // Filtra a lista principal
            return this.departamentos.filter(depto => {
                // Converte tudo para string e minúsculas para buscar em TODOS os campos
                const id = String(depto.id).toLowerCase();
                const nome = depto.nome.toLowerCase();
                const local = depto._local.toLowerCase();
                const desc = depto.descricao.toLowerCase();

                // Retorna true se QUALQUER campo incluir o termo de busca
                return id.includes(busca) ||
                    nome.includes(busca) ||
                    local.includes(busca) ||
                    desc.includes(busca);
            });
        },
        // Esta é a lista que a tabela vai RENDERIZAR.
        // É uma lista "virtual" que se atualiza sozinha.
        funcionariosFiltrados() {
            // Se não há nada na busca, retorna a lista completa
            if (this.termoBusca === '') {
                return this.funcionarios;
            }

            // Normaliza o termo de busca (minúsculas)
            const busca = this.termoBusca.toLowerCase();

            // Filtra a lista principal
            return this.funcionarios.filter(func => {
                // Converte tudo para string e minúsculas para buscar em TODOS os campos
                const id = String(func.id).toLowerCase();
                const nome = func.nome.toLowerCase();
                const funcao = func.funcao.toLowerCase();
                const registro = func.registro.toLowerCase();

                // Retorna true se QUALQUER campo incluir o termo de busca
                return id.includes(busca) ||
                    nome.includes(busca) ||
                    funcao.includes(busca) ||
                    registro.includes(busca);
            });
        }
    },
    methods: {
        // Chamado quando o usuário digita na busca
        desselecionar() {
            this.departamentoSelecionado = null; // Limpa a seleção
            this.funcionarioSelecionado = null; // Limpa a seleção
        },
        // Este método é chamado pelo fetch() quando o app carrega
        carregarDepartamentos() {
            fetch('http://localhost:8080/departamento')
                .then(response => response.json())
                .then(data => {
                    this.departamentos = data; // Guarda os dados na lista principal
                })
                .catch(error => {
                    console.error('Erro ao buscar departamentos:', error)
                });
        },

        // Chamado quando uma <tr> é clicada
        selecionarDepartamento(depto) {
            // Se o usuário clicar na linha que JÁ está selecionada...
            if (this.departamentoSelecionado === depto) {
                this.departamentoSelecionado = null; // ... desmarca (fica nulo).
            } else {
                this.departamentoSelecionado = depto; // ... senão, seleciona.

                // Os bindings do Vue atualizam automaticamente os botões (via :disabled e :class)

            }
        },

        // Chamado pelo botão "Deletar"
        deletarDepartamento() {
            // Verifica se há seleção
            if (!this.departamentoSelecionado) {
                alert('Nenhum departamento selecionado para deletar.');
                return;
            }

            const id = this.departamentoSelecionado.id;

            // Confirmação (boa prática)
            if (!confirm(`Tem certeza que deseja deletar o departamento ID ${id}?`)) {
                return;
            }

            // Chama a API (Ex: DELETE http://localhost:8080/departamento/4)
            fetch(`http://localhost:8080/departamento/${id}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        // Se deu certo, remove o item da lista LOCAL (sem F5)
                        this.departamentos = this.departamentos.filter(d => d.id !== id);
                        this.desselecionar(); // Limpa a seleção
                    } else {
                        alert('Erro ao deletar departamento.');
                    }
                })
                .catch(error => console.error('Erro:', error));
        },

        // Métodos placeholder para os outros botões
        abrirModalAdicionar() {
            // Limpa seleção e prepara o objeto do form
            this.desselecionar();
            this.limparNovoDepartamento();

            // Abre o modal via Bootstrap JS
            const modalEl = document.getElementById('adicionarModal');
            const modal = new bootstrap.Modal(modalEl);
            modal.show();
        },

        limparNovoDepartamento() {
            this.novoDepartamento = { nome: '', _local: '', descricao: '' };
        },

        criarDepartamento() {
            console.log("Entrando no metodo criarDepartamento");
            // Validação simples
            if (!this.novoDepartamento.nome || !this.novoDepartamento.nome.trim()) {
                alert('O campo Nome é obrigatório.');
                return;
            }
            console.log("Enviando para o backend:", JSON.stringify(this.novoDepartamento));

            // Chama a API para criar o departamento
            fetch('http://localhost:8080/departamento', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.novoDepartamento)
            })
                .then(response => {
                    if (response.ok) return response.json();
                    throw new Error('Erro ao criar departamento');
                })
                .then(created => {
                    // Adiciona localmente à lista para atualizar a tabela sem reload
                    this.departamentos.push(created);

                    // Fecha o modal
                    const modalEl = document.getElementById('adicionarModal');
                    const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
                    modal.hide();

                    // Limpa o form
                    this.limparNovoDepartamento();
                })
                .catch(err => {
                    console.error(err);
                    alert('Erro ao criar departamento. Veja o console para mais detalhes.');
                });
        },

        atualizarDepartamento() {
            console.log("Enviando para o backend:", JSON.stringify(this.departamentoEmEdicao));

            // Chama a API para atualizar o departamento
            fetch('http://localhost:8080/departamento', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.departamentoEmEdicao)
            })
                .then(response => {
                    if (response.ok) return response.json();
                    throw new Error('Erro ao atualizar departamento');
                })
                .then(departamentoAtualizadoDoBackend => {
                    // CORREÇÃO: Lógica para SUBSTITUIR o item na lista
                    // 1. Encontra o "índice" (a posição) do item antigo na lista
                    const index = this.departamentos.findIndex(d => d.id === departamentoAtualizadoDoBackend.id);

                    // 2. Se encontrou, substitui o item antigo pelo novo
                    if (index !== -1) {
                        this.departamentos[index] = departamentoAtualizadoDoBackend;
                    }

                    // Fecha o modal
                    const modalEl = document.getElementById('atualizarModal');
                    const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
                    modal.hide();

                    // Limpa o form
                    this.limparNovoDepartamento();
                })
                .catch(err => {
                    console.error(err);
                    alert('Erro ao atualizar departamento. Veja o console para mais detalhes.');
                });
        },

        abrirModalAtualizar() {
            if (!this.departamentoSelecionado) {
                alert('Nenhum departamento selecionado para atualizar.');
                return;
            }

            // CORREÇÃO: Pré-preenche o formulário do modal
            // Usamos '...' (spread operator) para COPIAR o objeto
            this.departamentoEmEdicao = { ...this.departamentoSelecionado };

            // Abre o modal via Bootstrap JS
            const modalEl = document.getElementById('atualizarModal');
            const modal = new bootstrap.Modal(modalEl);
            modal.show();
        },

        //funcionarios
        // Este método é chamado pelo fetch() quando o app carrega
        carregarFuncionarios() {
            fetch('http://localhost:8080/funcionario')
                .then(response => response.json())
                .then(data => {
                    this.funcionarios = data; // Guarda os dados na lista principal
                })
                .catch(error => {
                    console.error('Erro ao buscar funcionarios:', error)
                });
        },

        // Chamado quando uma <tr> é clicada
        selecionarFuncionario(func) {
            // Se o usuário clicar na linha que JÁ está selecionada...
            if (this.funcionarioSelecionado === func) {
                this.funcionarioSelecionado = null; // ... desmarca (fica nulo).
            } else {
                this.funcionarioSelecionado = func; // ... senão, seleciona.

                // Os bindings do Vue atualizam automaticamente os botões (via :disabled e :class)

            }
        },

        // Chamado pelo botão "Deletar"
        deletarFuncionario() {
            // Verifica se há seleção
            if (!this.funcionarioSelecionado) {
                alert('Nenhum funcionario selecionado para deletar.');
                return;
            }

            const id = this.funcionarioSelecionado.id;

            // Confirmação (boa prática)
            if (!confirm(`Tem certeza que deseja deletar o funcionario ID ${id}?`)) {
                return;
            }

            // Chama a API (Ex: DELETE http://localhost:8080/departamento/4)
            fetch(`http://localhost:8080/funcionario/${id}`, {
                method: 'DELETE'
            })
                .then(response => {
                    if (response.ok) {
                        // Se deu certo, remove o item da lista LOCAL (sem F5)
                        this.funcionarios = this.funcionarios.filter(d => d.id !== id);
                        this.desselecionar(); // Limpa a seleção
                    } else {
                        alert('Erro ao deletar funcionario.');
                    }
                })
                .catch(error => console.error('Erro:', error));
        },

        // Métodos placeholder para os outros botões
        abrirModalAdicionarF() {
            // Limpa seleção e prepara o objeto do form
            if (!this.funcionarioSelecionado) {
                alert('Nenhum funcionário selecionado para atualizar.');
                return;
            }

            // 2. Copia os dados do funcionário selecionado para o formulário
            this.funcionarioEmEdicao = { ...this.funcionarioSelecionado };

            // Abre o modal via Bootstrap JS
            const modalEl = document.getElementById('adicionarModalF');
            const modal = new bootstrap.Modal(modalEl);
            modal.show();
        },

        limparNovoFuncionarioF() {
            this.novoFuncionario = { nome: '', funcao: '', registro: '', departamento: null };
        },

        criarFuncionario() {
            console.log("Entrando no metodo criarFuncionario");
            // Validação simples
            if (!this.novoFuncionario.nome || !this.novoFuncionario.nome.trim()) {
                alert('O campo Nome é obrigatório.');
                return;
            }

            if (!this.novoFuncionario.departamento) {
                alert('Você precisa selecionar um departamento.');
                return;
            }

            // Crie um 'payload' (carga útil) limpo para enviar ao backend
            const payload = {
                nome: this.novoFuncionario.nome,
                funcao: this.novoFuncionario.funcao,
                registro: this.novoFuncionario.registro,
                // Embrulha o ID (ex: 1) em um objeto que o Spring/JPA entende
                departamento: {
                    id: this.novoFuncionario.departamento
                }
            };

            console.log("Enviando para o backend:", JSON.stringify(payload));

            // Chama a API para criar o Funcionario
            fetch('http://localhost:8080/funcionario', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
                .then(response => {
                    if (response.ok) return response.json();
                    throw new Error('Erro ao criar funcionario');
                })
                .then(created => {
                    // Adiciona localmente à lista para atualizar a tabela sem reload
                    this.funcionarios.push(created);

                    // Fecha o modal
                    const modalEl = document.getElementById('adicionarModalF');
                    const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
                    modal.hide();

                    // Limpa o form
                    this.limparNovoFuncionarioF();
                })
                .catch(err => {
                    console.error(err);
                    alert('Erro ao criar funcionário. Veja o console para mais detalhes.');
                });
        },

        atualizarFuncionario() {
            console.log("Enviando para o backend:", JSON.stringify(this.funcionarioEmEdicao));

            // Chama a API para atualizar o funcionario
            fetch('http://localhost:8080/funcionario', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.funcionarioEmEdicao)
            })
                .then(response => {
                    if (response.ok) return response.json();
                    throw new Error('Erro ao atualizar funcionario');
                })
                .then(funcionarioAtualizadoDoBackend => {
                    // CORREÇÃO: Lógica para SUBSTITUIR o item na lista
                    // 1. Encontra o "índice" (a posição) do item antigo na lista
                    const index = this.funcionarios.findIndex(d => d.id === funcionarioAtualizadoDoBackend.id);

                    // 2. Se encontrou, substitui o item antigo pelo novo
                    if (index !== -1) {
                        this.funcionarios[index] = funcionarioAtualizadoDoBackend;
                    }

                    // Fecha o modal
                    const modalEl = document.getElementById('atualizarModalF');
                    const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
                    modal.hide();

                    // Limpa o form
                    this.limparNovoFuncionarioF();
                })
                .catch(err => {
                    console.error(err);
                    alert('Erro ao atualizar funcionario. Veja o console para mais detalhes.');
                });
        },

        abrirModalAtualizarF() {
            // 1. Deve checar por 'funcionarioSelecionado'
            if (!this.funcionarioSelecionado) {
                alert('Nenhum funcionário selecionado para atualizar.');
                return;
            }

            // 2. Deve copiar para 'funcionarioEmEdicao'
            this.funcionarioEmEdicao = { ...this.funcionarioSelecionado };

            // 3. Deve abrir o modal 'atualizarModalF'
            const modalEl = document.getElementById('atualizarModalF');
            const modal = new bootstrap.Modal(modalEl);
            modal.show();
        }
    },

    mounted() {
        this.carregarDepartamentos();
        this.carregarFuncionarios();
    }
});
app.mount('#app')