package de.jansoh.utilitybill.model.validation;

import de.jansoh.utilitybill.model.DateRange;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class DateRangeValidator implements ConstraintValidator<ValidDateRange, DateRange> {
    @Override
    public boolean isValid(DateRange dto, ConstraintValidatorContext context) {
        if (null == dto.getEndDate()) {
            return true;
        }
        return dto.getEndDate().isAfter(dto.getStartDate());
    }
}