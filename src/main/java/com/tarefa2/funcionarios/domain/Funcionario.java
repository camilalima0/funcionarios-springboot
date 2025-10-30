package com.tarefa2.funcionarios.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "funcionario")
public class Funcionario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer idFuncionario;
    @ManyToOne(fetch = FetchType.LAZY) 
    @JoinColumn(name = "departamento_id") 
    @JsonIgnore 
    private Departamento departamento;
    @Column(name = "nome")
    private String nomeFuncionario;
    @Column(name = "funcao")
    private String funcaoFuncionario;
    @Column(name = "registro")
    private String registroFuncionario;
    
}
