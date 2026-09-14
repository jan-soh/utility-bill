package de.jansoh.utilitybill.mappers;

import de.jansoh.utilitybill.entities.UtilityCostPayment;
import de.jansoh.utilitybill.model.UtilityCostPaymentDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UtilityCostPaymentMapper {

    @Mapping(target = "involvedPersonId", source = "involvedPerson.id")
    UtilityCostPaymentDTO toDto(UtilityCostPayment utilityCostPayment);

    @Mapping(target = "involvedPerson", ignore = true)
    UtilityCostPayment toEntity(UtilityCostPaymentDTO dto);
}
