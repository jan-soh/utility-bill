package de.jansoh.utilitybill.mappers;

import de.jansoh.utilitybill.entities.UtilityCostPayment;
import de.jansoh.utilitybill.model.UtilityCostPaymentDTO;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UtilityCostPaymentMapper {

    UtilityCostPaymentDTO toDto(UtilityCostPayment utilityCostPayment);

    UtilityCostPayment toEntity(UtilityCostPaymentDTO dto);
}
