package de.jansoh.utilitybill.mappers;

import de.jansoh.utilitybill.entities.InvolvedPerson;
import de.jansoh.utilitybill.model.InvolvedPersonDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface InvolvedPersonMapper {

    @Mapping(target = "utilityCostPaymentHistory", source = "utilityCostPaymentHistory")
    InvolvedPersonDTO toDto(InvolvedPerson involvedPerson);


    @Mapping(target = "utilityCostPaymentHistory", source = "utilityCostPaymentHistory")
    InvolvedPerson toEntity(InvolvedPersonDTO involvedPersonDTO);
}
