package com.tarefa2.funcionarios.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.Table;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "departamento")
public class Departamento {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer idDepartamento;
    @Column(name = "nome")
    private String nomeDepartamento;
    @Column(name = "_local")
    private String localDepartamento;
    @Column(name = "descricao")
    private String descricaoDepartamento;
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "departamento") 
    private List<Funcionario> funcionarios;
}
