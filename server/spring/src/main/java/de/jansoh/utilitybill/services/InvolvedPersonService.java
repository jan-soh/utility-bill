package de.jansoh.utilitybill.services;

import de.jansoh.utilitybill.model.InvolvedPersonDTO;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface InvolvedPersonService {

    List<InvolvedPersonDTO> listInvolvedPersons();
    Optional<InvolvedPersonDTO> getInvolvedPersonById(UUID id);
    InvolvedPersonDTO saveNewPerson(InvolvedPersonDTO involvedPersonDTO);
    Optional<InvolvedPersonDTO> updateInvolvedPersonById(UUID id, InvolvedPersonDTO involvedPersonDTO);
    Boolean deleteInvolvedPersonById(UUID id);
}
