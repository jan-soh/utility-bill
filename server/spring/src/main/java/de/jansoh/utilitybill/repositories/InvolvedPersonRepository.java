package de.jansoh.utilitybill.repositories;

import de.jansoh.utilitybill.entities.InvolvedPerson;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface InvolvedPersonRepository extends JpaRepository<InvolvedPerson, UUID> {
}
