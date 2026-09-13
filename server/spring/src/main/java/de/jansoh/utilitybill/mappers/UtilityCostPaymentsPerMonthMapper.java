package de.jansoh.utilitybill.mappers;

import de.jansoh.utilitybill.entities.UtilityCostPaymentsPerMonth;
import de.jansoh.utilitybill.model.UtilityCostPaymentsPerMonthDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface UtilityCostPaymentsPerMonthMapper {

    @Mapping(target = "involvedPersonId", source = "involvedPerson.id")
    UtilityCostPaymentsPerMonthDTO toDto(UtilityCostPaymentsPerMonth utilityCostPaymentsPerMonth);

    @Mapping(target = "involvedPerson", ignore = true)
    UtilityCostPaymentsPerMonth toEntity(UtilityCostPaymentsPerMonthDTO dto);
}
