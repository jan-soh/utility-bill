package de.jansoh.utilitybill.controller;

import de.jansoh.utilitybill.model.UtilityCostPaymentDTO;
import de.jansoh.utilitybill.services.UtilityCostPaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
public class UtilityCostPaymentController {

    public static final String PATH = "/api/v1/utility-cost-payment";
    public static final String PATH_BY_ID = PATH + "/{id}";
    public static final String PATH_HISTORY_BY_INVOLVED_PERSON_ID = PATH + "/history/{involvedPersonId}";

    private final UtilityCostPaymentService service;

    @GetMapping(PATH_HISTORY_BY_INVOLVED_PERSON_ID)
    public List<UtilityCostPaymentDTO> getHistoryByInvolvedPerson(@PathVariable UUID involvedPersonId) {
        return service.list(involvedPersonId);
    }

    @GetMapping(PATH_BY_ID)
    public UtilityCostPaymentDTO getById(@PathVariable UUID id) {
        return service.getById(id).orElseThrow(NotFoundException::new);
    }

    @PostMapping(PATH)
    public UtilityCostPaymentDTO save(@RequestBody UtilityCostPaymentDTO involvedPersonDTO) {
        return service.save(involvedPersonDTO);
    }

    @PutMapping(PATH_BY_ID)
    public UtilityCostPaymentDTO update(@PathVariable UUID id, @RequestBody UtilityCostPaymentDTO involvedPersonDTO) {
        return service.update(id, involvedPersonDTO).orElseThrow(NotFoundException::new);
    }

    @DeleteMapping(PATH_BY_ID)
    public ResponseEntity<Void> delete(@PathVariable UUID id) {

        if (!service.delete(id)) {
            throw new NotFoundException();
        }

        return ResponseEntity.noContent().build();
    }
}
