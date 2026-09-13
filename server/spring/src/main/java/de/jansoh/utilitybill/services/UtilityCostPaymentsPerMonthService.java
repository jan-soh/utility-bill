package de.jansoh.utilitybill.services;

import de.jansoh.utilitybill.model.UtilityCostPaymentsPerMonthDTO;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UtilityCostPaymentsPerMonthService {

    List<UtilityCostPaymentsPerMonthDTO> list();

    Optional<UtilityCostPaymentsPerMonthDTO> getById(UUID id);

    UtilityCostPaymentsPerMonthDTO save(UtilityCostPaymentsPerMonthDTO dto);

    Optional<UtilityCostPaymentsPerMonthDTO> update(UUID id, UtilityCostPaymentsPerMonthDTO dto);

    Boolean delete(UUID id);
}
