package de.jansoh.utilitybill.model;

import jakarta.annotation.Nullable;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class InvolvedPersonDTO {

    @Nullable
    private UUID id;
    private String name;
    private LocalDate startOfInvolvement;
    private LocalDate endOfInvolvement;
    private List<UtilityCostPaymentsPerMonthDTO> utilityCostPaymentsPerMonthHistory = new ArrayList<>();
}
