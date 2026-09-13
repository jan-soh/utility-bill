package de.jansoh.utilitybill.repositories;

import de.jansoh.utilitybill.entities.UtilityCostPaymentsPerMonth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface UtilityCostPaymentsPerMonthRepository extends JpaRepository<UtilityCostPaymentsPerMonth, UUID> {

    @Query("select p from UtilityCostPaymentsPerMonth p join p.involvedPerson ip where ip.id = :involvedPersonId")
    List<UtilityCostPaymentsPerMonth> findByInvolvedPersonId(@Param("involvedPersonId") UUID involvedPersonId);
}
