package de.jansoh.utilitybill.model;

import java.time.LocalDate;

public interface DateRange {
    LocalDate getStartDate();

    LocalDate getEndDate();
}
