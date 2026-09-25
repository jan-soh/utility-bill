package de.jansoh.utilitybill.controller;

import de.jansoh.utilitybill.model.InvolvedPersonDTO;
import de.jansoh.utilitybill.services.InvolvedPersonService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RequiredArgsConstructor
@RestController
public class InvolvedPersonController {

    public static final String PATH = "/api/v1/involved-person";
    public static final String PATH_ID = PATH + "/{id}";

    private final InvolvedPersonService involvedPersonService;

    @GetMapping(PATH)
    public List<InvolvedPersonDTO> listInvolvedPersons() {
        return involvedPersonService.listInvolvedPersons();
    }

    @GetMapping(PATH_ID)
    public InvolvedPersonDTO loadInvolvedPerson(@NotNull @PathVariable UUID id) {
        return involvedPersonService.getInvolvedPersonById(id).orElseThrow(NotFoundException::new);
    }

    @PostMapping(PATH)
    public InvolvedPersonDTO saveNewPerson(@Valid @RequestBody InvolvedPersonDTO involvedPersonDTO) {
        return involvedPersonService.saveNewPerson(involvedPersonDTO);
    }

    @PutMapping(PATH_ID)
    public InvolvedPersonDTO updateInvolvedPerson(@NotNull @PathVariable UUID id, @Valid @RequestBody InvolvedPersonDTO involvedPersonDTO) {
        return involvedPersonService.updateInvolvedPersonById(id, involvedPersonDTO).orElseThrow(NotFoundException::new);
    }

    @DeleteMapping(PATH_ID)
    public ResponseEntity<Void> deleteInvolvedPerson(@NotNull @PathVariable UUID id) {

        if (!involvedPersonService.deleteInvolvedPersonById(id)) {
            throw new NotFoundException();
        }

        return ResponseEntity.noContent().build();
    }
}
