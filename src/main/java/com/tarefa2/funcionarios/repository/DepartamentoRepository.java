package com.tarefa2.funcionarios.repository;

import com.tarefa2.funcionarios.domain.Departamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

//GELADEIRA/ ESTOQUE
//contem logica de acesso a dados
@Repository
public interface DepartamentoRepository extends JpaRepository<Departamento, Integer> {
    // Aqui você pode adicionar métodos de busca customizados (ex: findByNome)
    // Mas para o CRUD básico, não precisa de nada.
    //@Query("select d from Departamento d where d.id = ?1")
    //public Departamento findDepartamentoById(Integer id);
}
