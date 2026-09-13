package de.jansoh.utilitybill.mappers;

import de.jansoh.utilitybill.entities.InvolvedPerson;
import de.jansoh.utilitybill.model.InvolvedPersonDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface InvolvedPersonMapper {

    @Mapping(target = "utilityCostPaymentsPerMonthHistory", ignore = true)
    @Mapping(target = "currentUtilityCostPaymentsPerMonth", ignore = true)
    InvolvedPersonDTO toDto(InvolvedPerson involvedPerson);


    @Mapping(target = "utilityCostPaymentsPerMonthHistory", ignore = true)
    InvolvedPerson toEntity(InvolvedPersonDTO involvedPersonDTO);
}
