package com.tarefa2.funcionarios.controller;

import com.tarefa2.funcionarios.domain.Funcionario;
import com.tarefa2.funcionarios.service.FuncionarioService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import static org.springframework.data.jpa.domain.AbstractPersistable_.id;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FuncionarioController {
    
    private FuncionarioService funcionarioService;
    
    @Autowired
    public FuncionarioController(FuncionarioService funcionarioService) {
        this.funcionarioService = funcionarioService;
    }
    
    @GetMapping(path = "/funcionario/{id}")
    public Funcionario getFuncionario(@PathVariable("id") Integer id) {
        return funcionarioService.getFuncionario(id);
    }
    
    @PostMapping(path = "/funcionario")
    public void salvar(@RequestBody Funcionario funcionario) {
        funcionarioService.salvar(funcionario);
    }
    
    @GetMapping(path = "/funcionario")
    public List<Funcionario> listar() {
        List<Funcionario> funcionarios = funcionarioService.listarTodos();
        return funcionarios;
    }
    
    @PutMapping(path = "/funcionario")
    public void atualizar (@RequestBody Funcionario funcionario) {
        funcionarioService.atualizar(funcionario);
    }
    
    @DeleteMapping(path = "/funcionario/{id}")
    public void deeletar (@PathVariable Integer id) {
        funcionarioService.deletar(id);
    }
}