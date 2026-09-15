package de.jansoh.utilitybill.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.annotations.UuidGenerator;
import org.hibernate.type.SqlTypes;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Entity
public class InvolvedPerson {

    @Id
    @GeneratedValue(generator = "UUID")
    @UuidGenerator
    @JdbcTypeCode(SqlTypes.CHAR)
    @Column(length = 36, updatable = false, nullable = false)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private LocalDate startOfInvolvement;

    private LocalDate endOfInvolvement;

    @OneToMany(mappedBy = "involvedPerson", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<UtilityCostPayment> utilityCostPaymentHistory = new ArrayList<>();

    public void addUtilityCostPayment(UtilityCostPayment payment) {
        utilityCostPaymentHistory.add(payment);
        payment.setInvolvedPerson(this);
    }

    public void removeUtilityCostPayment(UtilityCostPayment payment) {
        utilityCostPaymentHistory.remove(payment);
        payment.setInvolvedPerson(null);
    }
}
