package de.jansoh.utilitybill.services;

import de.jansoh.utilitybill.mappers.UtilityCostPaymentMapper;
import de.jansoh.utilitybill.model.UtilityCostPaymentDTO;
import de.jansoh.utilitybill.repositories.UtilityCostPaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicReference;

@Service
@RequiredArgsConstructor
public class UtilityCostPaymentServiceImpl implements UtilityCostPaymentService {

    private final UtilityCostPaymentRepository repository;
    private final UtilityCostPaymentMapper mapper;

    @Override
    public List<UtilityCostPaymentDTO> list(UUID involvedPersonId) {
        return repository.findByInvolvedPersonId(involvedPersonId).stream().map(mapper::toDto).toList();
    }

    @Override
    public Optional<UtilityCostPaymentDTO> getById(UUID id) {
        return repository.findById(id).map(mapper::toDto);
    }

    @Override
    public UtilityCostPaymentDTO save(UtilityCostPaymentDTO dto) {
        return mapper.toDto(repository.save(mapper.toEntity(dto)));
    }

    @Override
    public Optional<UtilityCostPaymentDTO> update(UUID id, UtilityCostPaymentDTO dto) {

        AtomicReference<Optional<UtilityCostPaymentDTO>> optionalDTO = new AtomicReference<>();

        repository.findById(id).ifPresent(payments -> {

            payments.setAmount(dto.getAmount());
            payments.setValidFrom(dto.getValidFrom());
            payments.setValidTo(dto.getValidTo());

            optionalDTO.set(Optional.of(mapper.toDto(repository.save(payments))));
        });

        return optionalDTO.get();
    }

    @Override
    public Boolean delete(UUID id) {

        if (repository.existsById(id)) {
            repository.deleteById(id);
            return true;
        }

        return false;
    }
}
