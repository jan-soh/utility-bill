package de.jansoh.utilitybill.services;

import de.jansoh.utilitybill.entities.InvolvedPerson;
import de.jansoh.utilitybill.entities.UtilityCostPaymentsPerMonth;
import de.jansoh.utilitybill.model.InvolvedPersonDTO;
import de.jansoh.utilitybill.model.UtilityCostPaymentsPerMonthDTO;
import de.jansoh.utilitybill.repositories.InvolvedPersonRepository;
import de.jansoh.utilitybill.repositories.UtilityCostPaymentsPerMonthRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
public class InvolvedPersonServiceImplTest {

    @Autowired
    InvolvedPersonService involvedPersonService;

    @Autowired
    InvolvedPersonRepository involvedPersonRepository;

    @Autowired
    UtilityCostPaymentsPerMonthRepository paymentsRepository;

    @Test
    void testSaveNewPersonWithPayments() {
        InvolvedPersonDTO personDTO = new InvolvedPersonDTO();
        personDTO.setName("Test Person");
        personDTO.setStartOfInvolvement(LocalDate.now());

        UtilityCostPaymentsPerMonthDTO paymentDTO = new InvolvedPersonServiceImplTest().createPaymentDTO();
        personDTO.getUtilityCostPaymentsPerMonthHistory().add(paymentDTO);

        InvolvedPersonDTO savedPerson = involvedPersonService.saveNewPerson(personDTO);

        assertThat(savedPerson.getUtilityCostPaymentsPerMonthHistory()).hasSize(1);
    }

    @Test
    void testListInvolvedPersonsWithPayments() {
        InvolvedPerson person = new InvolvedPerson();
        person.setName("Test Person 2");
        person.setStartOfInvolvement(LocalDate.now());

        UtilityCostPaymentsPerMonth payment = new UtilityCostPaymentsPerMonth();
        payment.setAmount(new BigDecimal("100.00"));
        payment.setValidFrom(LocalDate.now());
        person.addUtilityCostPayment(payment);

        involvedPersonRepository.save(person);

        List<InvolvedPersonDTO> persons = involvedPersonService.listInvolvedPersons();

        assertThat(persons).isNotEmpty();
        InvolvedPersonDTO personDTO = persons.stream()
                .filter(p -> p.getName().equals("Test Person 2"))
                .findFirst()
                .orElseThrow();

        assertThat(personDTO.getUtilityCostPaymentsPerMonthHistory()).hasSize(1);
    }

    private UtilityCostPaymentsPerMonthDTO createPaymentDTO() {
        UtilityCostPaymentsPerMonthDTO dto = new UtilityCostPaymentsPerMonthDTO();
        dto.setAmount(new BigDecimal("100.00"));
        dto.setValidFrom(LocalDate.now());
        return dto;
    }
}
