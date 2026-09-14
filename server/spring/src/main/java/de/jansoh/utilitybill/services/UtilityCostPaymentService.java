package de.jansoh.utilitybill.services;

import de.jansoh.utilitybill.model.UtilityCostPaymentDTO;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UtilityCostPaymentService {

    List<UtilityCostPaymentDTO> list();

    Optional<UtilityCostPaymentDTO> getById(UUID id);

    UtilityCostPaymentDTO save(UtilityCostPaymentDTO dto);

    Optional<UtilityCostPaymentDTO> update(UUID id, UtilityCostPaymentDTO dto);

    Boolean delete(UUID id);
}
