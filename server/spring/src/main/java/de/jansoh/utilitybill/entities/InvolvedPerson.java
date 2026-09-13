package de.jansoh.utilitybill.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.UuidGenerator;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Entity
public class InvolvedPerson {

    public InvolvedPerson() {

    }

    public InvolvedPerson(UUID id) {
        this.id = id;
    }

    @Id
    @GeneratedValue(generator = "UUID")
    @UuidGenerator
    @Column(length = 36, updatable = false, nullable = false)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private LocalDate startOfInvolvement;

    private LocalDate endOfInvolvement;

    @OneToMany(mappedBy = "involvedPerson")
    private List<UtilityCostPaymentsPerMonth> utilityCostPaymentsPerMonthHistory = new ArrayList<>();
}
