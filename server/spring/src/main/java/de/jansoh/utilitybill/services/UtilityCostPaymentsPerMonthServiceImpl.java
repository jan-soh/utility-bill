package de.jansoh.utilitybill.services;

import de.jansoh.utilitybill.mappers.UtilityCostPaymentsPerMonthMapper;
import de.jansoh.utilitybill.model.UtilityCostPaymentsPerMonthDTO;
import de.jansoh.utilitybill.repositories.UtilityCostPaymentsPerMonthRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicReference;

@Service
@RequiredArgsConstructor
public class UtilityCostPaymentsPerMonthServiceImpl implements UtilityCostPaymentsPerMonthService {

    private final UtilityCostPaymentsPerMonthRepository repository;
    private final UtilityCostPaymentsPerMonthMapper mapper;

    @Override
    public List<UtilityCostPaymentsPerMonthDTO> list() {
        return repository.findAll().stream().map(mapper::toDto).toList();
    }

    @Override
    public Optional<UtilityCostPaymentsPerMonthDTO> getById(UUID id) {
        return repository.findById(id).map(mapper::toDto);
    }

    @Override
    public UtilityCostPaymentsPerMonthDTO save(UtilityCostPaymentsPerMonthDTO dto) {
        return mapper.toDto(repository.save(mapper.toEntity(dto)));
    }

    @Override
    public Optional<UtilityCostPaymentsPerMonthDTO> update(UUID id, UtilityCostPaymentsPerMonthDTO dto) {

        AtomicReference<Optional<UtilityCostPaymentsPerMonthDTO>> optionalDTO = new AtomicReference<>();

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
