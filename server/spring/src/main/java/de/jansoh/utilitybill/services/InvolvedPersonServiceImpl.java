package de.jansoh.utilitybill.services;

import de.jansoh.utilitybill.entities.InvolvedPerson;
import de.jansoh.utilitybill.entities.UtilityCostPaymentsPerMonth;
import de.jansoh.utilitybill.mappers.InvolvedPersonMapper;
import de.jansoh.utilitybill.mappers.UtilityCostPaymentsPerMonthMapper;
import de.jansoh.utilitybill.model.InvolvedPersonDTO;
import de.jansoh.utilitybill.model.UtilityCostPaymentsPerMonthDTO;
import de.jansoh.utilitybill.repositories.InvolvedPersonRepository;
import de.jansoh.utilitybill.repositories.UtilityCostPaymentsPerMonthRepository;
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
    private final InvolvedPersonMapper involvedPersonMapper;
    private final UtilityCostPaymentsPerMonthRepository paymentsRepository;
    private final UtilityCostPaymentsPerMonthMapper paymentsMapper;

    @Override
    public List<InvolvedPersonDTO> listInvolvedPersons() {
        return repository.findAll().stream().map(this::mapToDto).toList();
    }

    @Override
    public Optional<InvolvedPersonDTO> getInvolvedPersonById(UUID id) {
        return repository.findById(id).map(this::mapToDto);
    }

    private InvolvedPersonDTO mapToDto(InvolvedPerson involvedPerson) {

        InvolvedPersonDTO dto = involvedPersonMapper.toDto(involvedPerson);
        List<UtilityCostPaymentsPerMonth> payments = paymentsRepository.findAll().stream()
                .filter(p -> p.getInvolvedPerson() != null && p.getInvolvedPerson().getId().equals(involvedPerson.getId()))
                .toList();
        involvedPerson.setUtilityCostPaymentsPerMonthHistory(payments);

        involvedPerson.getUtilityCostPaymentsPerMonthHistory().forEach(payment -> {

            UtilityCostPaymentsPerMonthDTO paymentDTO = paymentsMapper.toDto(payment);
            paymentDTO.setInvolvedPersonId(involvedPerson.getId());

            dto.getUtilityCostPaymentsPerMonthHistory().add(paymentDTO);
        });

        return dto;
    }

    @Override
    public InvolvedPersonDTO saveNewPerson(InvolvedPersonDTO involvedPersonDTO) {

        InvolvedPerson newInvolvedPerson = involvedPersonMapper.toEntity(involvedPersonDTO);
        InvolvedPerson savedInvolvedPerson = repository.save(newInvolvedPerson);

        involvedPersonDTO.getUtilityCostPaymentsPerMonthHistory().forEach(paymentDTO -> {

            UtilityCostPaymentsPerMonth payments = paymentsMapper.toEntity(paymentDTO);
            payments.setInvolvedPerson(savedInvolvedPerson);
            paymentsRepository.save(payments);
        });

        return repository.findById(savedInvolvedPerson.getId()).map(this::mapToDto).get();
    }

    @Override
    public Optional<InvolvedPersonDTO> updateInvolvedPersonById(UUID id, InvolvedPersonDTO involvedPersonDTO) {

        AtomicReference<Optional<InvolvedPersonDTO>> optionalInvolvedPersonDTO = new AtomicReference<>();

        repository.findById(id).ifPresent(involvedPerson -> {

            involvedPerson.setName(involvedPersonDTO.getName());
            involvedPerson.setStartOfInvolvement(involvedPersonDTO.getStartOfInvolvement());
            involvedPerson.setEndOfInvolvement(involvedPersonDTO.getEndOfInvolvement());

            // Clear existing payments
            List<UtilityCostPaymentsPerMonth> existingPayments = paymentsRepository.findAll().stream()
                    .filter(p -> p.getInvolvedPerson() != null && p.getInvolvedPerson().getId().equals(involvedPerson.getId()))
                    .toList();
            paymentsRepository.deleteAll(existingPayments);

            // Add new payments
            involvedPersonDTO.getUtilityCostPaymentsPerMonthHistory().forEach(paymentDTO -> {
                UtilityCostPaymentsPerMonth payments = paymentsMapper.toEntity(paymentDTO);
                payments.setInvolvedPerson(involvedPerson);
                paymentsRepository.save(payments);
            });

            optionalInvolvedPersonDTO.set(Optional.of(mapToDto(repository.save(involvedPerson))));
        });

        return optionalInvolvedPersonDTO.get();
    }

    @Override
    public Boolean deleteInvolvedPersonById(UUID id) {

        Optional<InvolvedPerson> involvedPersonOpt = repository.findById(id);

        if (involvedPersonOpt.isPresent()) {
            InvolvedPerson involvedPerson = involvedPersonOpt.get();

            List<UtilityCostPaymentsPerMonth> payments = paymentsRepository.findAll().stream()
                    .filter(p -> p.getInvolvedPerson() != null && p.getInvolvedPerson().getId().equals(involvedPerson.getId()))
                    .toList();
            paymentsRepository.deleteAll(payments);

            repository.delete(involvedPerson);

            return true;
        }

        return false;
    }
}
