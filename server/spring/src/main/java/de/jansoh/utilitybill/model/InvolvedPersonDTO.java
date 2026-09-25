package de.jansoh.utilitybill.model;

import de.jansoh.utilitybill.model.validation.ValidDateRange;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@ValidDateRange
public class InvolvedPersonDTO implements DateRange {

    @Nullable
    private UUID id;
    @NotBlank
    private String name;
    @NotNull
    private LocalDate startOfInvolvement;
    private LocalDate endOfInvolvement;
    private List<UtilityCostPaymentDTO> utilityCostPaymentHistory = new ArrayList<>();

    @Override
    public LocalDate getStartDate() {
        return startOfInvolvement;
    }

    @Override
    public LocalDate getEndDate() {
        return endOfInvolvement;
    }
}
