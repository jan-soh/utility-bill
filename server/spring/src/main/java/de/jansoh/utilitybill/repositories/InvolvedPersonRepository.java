package de.jansoh.utilitybill.repositories;

import de.jansoh.utilitybill.entities.InvolvedPerson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface InvolvedPersonRepository extends JpaRepository<InvolvedPerson, UUID> {

    @Query("select distinct ip from InvolvedPerson ip left join fetch ip.utilityCostPaymentsPerMonthHistory")
    List<InvolvedPerson> findAllWithUtilityCostPaymentsPerMonthHistory();

    @Query("select ip from InvolvedPerson ip left join fetch ip.utilityCostPaymentsPerMonthHistory where ip.id = :id")
    Optional<InvolvedPerson> findByIdWithUtilityCostPaymentsPerMonthHistory(@Param("id") UUID id);
}
