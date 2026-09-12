package de.jansoh.utilitybill.mappers;

import de.jansoh.utilitybill.entities.InvolvedPerson;
import de.jansoh.utilitybill.model.InvolvedPersonDTO;
import org.mapstruct.Mapper;

@Mapper
public interface InvolvedPersonMapper {
    InvolvedPersonDTO toDto(InvolvedPerson involvedPerson);
    InvolvedPerson toEntity(InvolvedPersonDTO involvedPersonDTO);
}
