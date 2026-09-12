package de.jansoh.utilitybill.services;

import de.jansoh.utilitybill.entities.InvolvedPerson;
import de.jansoh.utilitybill.mappers.InvolvedPersonMapper;
import de.jansoh.utilitybill.model.InvolvedPersonDTO;
import de.jansoh.utilitybill.repositories.InvolvedPersonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicReference;

@Service
@RequiredArgsConstructor
public class InvolvedPersonServiceImpl implements InvolvedPersonService {

    private final InvolvedPersonRepository repository;
    private final InvolvedPersonMapper mapper;

    @Override
    public List<InvolvedPersonDTO> listInvolvedPersons() {
        return repository.findAll().stream().map(mapper::toDto).toList();
    }

    @Override
    public Optional<InvolvedPersonDTO> getInvolvedPersonById(UUID id) {
        return Optional.ofNullable(mapper.toDto(repository.findById(id).orElse(null)));
    }

    @Override
    public InvolvedPersonDTO saveNewPerson(InvolvedPersonDTO involvedPersonDTO) {
        return mapper.toDto(repository.save(mapper.toEntity(involvedPersonDTO)));
    }

    @Override
    public Optional<InvolvedPersonDTO> updateInvolvedPersonById(UUID id, InvolvedPersonDTO involvedPersonDTO) {

        AtomicReference<Optional<InvolvedPersonDTO>> optionalInvolvedPersonDTO = new AtomicReference<>();

        repository.findById(id).ifPresent(involvedPerson -> {

            involvedPerson.setName(involvedPersonDTO.getName());
            involvedPerson.setStartOfInvolvement(involvedPersonDTO.getStartOfInvolvement());
            involvedPerson.setEndOfInvolvement(involvedPersonDTO.getEndOfInvolvement());

            optionalInvolvedPersonDTO.set(Optional.of(mapper.toDto(repository.save(involvedPerson))));
        });

        return optionalInvolvedPersonDTO.get();
    }

    @Override
    public Boolean deleteInvolvedPersonById(UUID id) {

        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }

        return false;
    }
}
