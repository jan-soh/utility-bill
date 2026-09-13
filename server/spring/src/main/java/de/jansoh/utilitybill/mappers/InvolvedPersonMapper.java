package de.jansoh.utilitybill.mappers;

import de.jansoh.utilitybill.entities.InvolvedPerson;
import de.jansoh.utilitybill.model.InvolvedPersonDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface InvolvedPersonMapper {

    @Mapping(target = "utilityCostPaymentsPerMonthHistory", source = "utilityCostPaymentsPerMonthHistory")
    InvolvedPersonDTO toDto(InvolvedPerson involvedPerson);


    @Mapping(target = "utilityCostPaymentsPerMonthHistory", source = "utilityCostPaymentsPerMonthHistory")
    InvolvedPerson toEntity(InvolvedPersonDTO involvedPersonDTO);
}
