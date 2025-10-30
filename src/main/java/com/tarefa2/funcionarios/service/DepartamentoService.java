package com.tarefa2.funcionarios.service;

import com.tarefa2.funcionarios.domain.Departamento;
import com.tarefa2.funcionarios.repository.DepartamentoRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

//CHEF DE COZINHA
@Service
public class DepartamentoService {
    
    // 2. O Service INJETA o Repository (O Chef "chama" o Estoquista)
    @Autowired
    private final DepartamentoRepository departamentoRepository = null; //quando usa autowired tem q inicializar como null?
 
    //localizar departamento por id (pegar pedido por id)
    public Departamento getDepartamento(Integer id) {
        // 3. Adiciona lógica: e se não encontrar? Retorna nulo ou lança um erro.
        //    (Aqui estamos usando .orElse(null) por simplicidade)
        return departamentoRepository.findById(id).orElse(null);
    }
    
    //listar todos os departamentos (listar todos os pedidos)
    public List<Departamento> listarTodos() {
        return departamentoRepository.findAll();
    }
    
    //persistir no db.aí o controller vai chamar esse metodo com post
    //transações sempre no service
    @Transactional
    public Departamento salvar(Departamento departamento) {
        // Aqui você poderia adicionar lógicas, ex:
        // if (departamento.getNome() == null) { throw new Exception("Nome é obrigatório"); }
        return departamentoRepository.save(departamento);
    }
    
    //atualizar departamento (atualizar pedido)
    @Transactional
    public Departamento atualizar(Departamento departamento) {
        // Validação: O .save() do Spring serve tanto para criar quanto para
        // atualizar (se o 'id' já existir no 'departamento').
        return departamentoRepository.save(departamento);
    }
    
    //deletar departamento (deletar pedido)
    @Transactional
    public void deletar(Integer id) {
        // Aqui você pode validar, ex:
        // if (!departamentoRepository.existsById(id)) { throw new Exception("ID não existe"); }
        departamentoRepository.deleteById(id);
    }  
}

