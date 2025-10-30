package com.tarefa2.funcionarios.repository;

import com.tarefa2.funcionarios.domain.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface FuncionarioRepository extends JpaRepository<Funcionario, Integer> {
    //@Query("select f from Funcionario f where f.id = ?1")
    //public Funcionario findFuncionarioById(Integer id);
}
