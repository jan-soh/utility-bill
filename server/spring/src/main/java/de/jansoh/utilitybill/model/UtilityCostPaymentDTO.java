package de.jansoh.utilitybill.model;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
public class UtilityCostPaymentDTO {

    private UUID id;
    private UUID involvedPersonId;
    private BigDecimal amount;
    private LocalDate validFrom;
    private LocalDate validTo;
}
