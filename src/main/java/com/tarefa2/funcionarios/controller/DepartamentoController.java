package com.tarefa2.funcionarios.controller;

import com.tarefa2.funcionarios.domain.Departamento;
import com.tarefa2.funcionarios.service.DepartamentoService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin
@RestController //todos os metodos da classe retornam um objeto json
public class DepartamentoController {
    
    //o controler injeta o service (o garçom só fala com o chef)
    private DepartamentoService departamentoService;
    
    //o proprio spring instancia os objetos em java
    @Autowired
    public DepartamentoController(DepartamentoService departamentoService) {
        this.departamentoService = departamentoService;
    }
    
    @GetMapping(path = "/departamento/{id}")
    public Departamento getDepartamento(@PathVariable("id") Integer id) {
        return departamentoService.getDepartamento(id);
    }
    
    @PostMapping(path = "/departamento")
    public void salvar(@RequestBody Departamento departamento) {
        //o funcionamento da função salvar está no service (comando save)
        departamentoService.salvar(departamento);
    }
    
    //listar todos os departamentos
    @GetMapping(path = "/departamento")
    public List<Departamento> listar() {
        //a logica do findAll() está dentro da função listarTodos no service
        List<Departamento> departamentos = departamentoService.listarTodos();
        return departamentos;
    }
    
    //atualizar departamento (caso o id nao exista, cria uma entry)
    @PutMapping(path = "/departamento")
    public void atualizar(@RequestBody Departamento departamento) {
        //a logica do save() está dentro da função atualizar no service
        departamentoService.atualizar(departamento);
    }
    
    //deletar departamento
    @DeleteMapping(path = "/departamento/{id}")
    public void deletar(@PathVariable Integer id) {
        //a logica do delete() está dentro da função deletar no service
        departamentoService.deletar(id);
    } 
}
