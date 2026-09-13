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

@Service
@RequiredArgsConstructor
public class InvolvedPersonServiceImpl implements InvolvedPersonService {

    private final InvolvedPersonRepository repository;
    private final InvolvedPersonMapper involvedPersonMapper;

    @Override
    public List<InvolvedPersonDTO> listInvolvedPersons() {
        return repository.findAll().stream().map(involvedPersonMapper::toDto).toList();
    }

    @Override
    public Optional<InvolvedPersonDTO> getInvolvedPersonById(UUID id) {
        return repository.findById(id).map(involvedPersonMapper::toDto);
    }

    @Override
    public InvolvedPersonDTO saveNewPerson(InvolvedPersonDTO involvedPersonDTO) {
        InvolvedPerson newInvolvedPerson = involvedPersonMapper.toEntity(involvedPersonDTO);
        if (newInvolvedPerson.getUtilityCostPaymentsPerMonthHistory() != null) {
            newInvolvedPerson.getUtilityCostPaymentsPerMonthHistory().forEach(payment -> payment.setInvolvedPerson(newInvolvedPerson));
        }
        return involvedPersonMapper.toDto(repository.save(newInvolvedPerson));
    }

    @Override
    public Optional<InvolvedPersonDTO> updateInvolvedPersonById(UUID id, InvolvedPersonDTO involvedPersonDTO) {
        return repository.findById(id).map(involvedPerson -> {
            InvolvedPerson updatedEntity = involvedPersonMapper.toEntity(involvedPersonDTO);
            involvedPerson.setName(updatedEntity.getName());
            involvedPerson.setStartOfInvolvement(updatedEntity.getStartOfInvolvement());
            involvedPerson.setEndOfInvolvement(updatedEntity.getEndOfInvolvement());

            involvedPerson.getUtilityCostPaymentsPerMonthHistory().clear();
            if (updatedEntity.getUtilityCostPaymentsPerMonthHistory() != null) {
                updatedEntity.getUtilityCostPaymentsPerMonthHistory().forEach(involvedPerson::addUtilityCostPayment);
            }

            return involvedPersonMapper.toDto(repository.save(involvedPerson));
        });
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
