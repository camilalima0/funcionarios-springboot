package com.tarefa2.funcionarios.service;

import com.tarefa2.funcionarios.domain.Funcionario;
import com.tarefa2.funcionarios.repository.FuncionarioRepository;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FuncionarioService {
    
    @Autowired
    private final FuncionarioRepository funcionarioRepository = null;
    
    //localizar funcionario por id
    public Funcionario getFuncionario(Integer id) {
        // 3. Adiciona lógica: e se não encontrar? Retorna nulo ou lança um erro.
        //    (Aqui estamos usando .orElse(null) por simplicidade)
        return funcionarioRepository.findById(id).orElse(null);
    }
    
    //listar todosos funcionarios
    public List<Funcionario> listarTodos() {
        return funcionarioRepository.findAll();
    }
    
    //persistir no db
    @Transactional
    public Funcionario salvar (Funcionario funcionario) {
        // Aqui você poderia adicionar lógicas, ex:
        // if (departamento.getNome() == null) { throw new Exception("Nome é obrigatório"); }
        return funcionarioRepository.save(funcionario);
    }
    
    //atualizar funcionario
    @Transactional
    public Funcionario atualizar (Funcionario funcionario) {
        // Validação: O .save() do Spring serve tanto para criar quanto para
        // atualizar (se o 'id' já existir no 'departamento').
        return funcionarioRepository.save(funcionario);
    }
    
    //deletar funcionario
    @Transactional
    public void deletar(Integer id) {
        funcionarioRepository.deleteById(id);
    }
}