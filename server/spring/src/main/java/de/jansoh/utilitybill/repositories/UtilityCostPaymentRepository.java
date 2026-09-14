package de.jansoh.utilitybill.repositories;

import de.jansoh.utilitybill.entities.UtilityCostPayment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface UtilityCostPaymentRepository extends JpaRepository<UtilityCostPayment, UUID> {

    @Query("select p from UtilityCostPayment p join p.involvedPerson ip where ip.id = :involvedPersonId")
    List<UtilityCostPayment> findByInvolvedPersonId(@Param("involvedPersonId") UUID involvedPersonId);
}
