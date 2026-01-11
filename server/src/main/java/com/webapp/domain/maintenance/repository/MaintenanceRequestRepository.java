package com.webapp.domain.maintenance.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.webapp.domain.maintenance.entity.MaintenanceRequest;
import com.webapp.domain.maintenance.entity.MaintenanceRequest.Priority;
import com.webapp.domain.maintenance.entity.MaintenanceRequest.Status;

@Repository
public interface MaintenanceRequestRepository extends JpaRepository<MaintenanceRequest, Long> {

    // For tenants - their requests
    Page<MaintenanceRequest> findByRequesterId(Long requesterId, Pageable pageable);

    // For landlords - requests on their properties
    @Query("SELECT m FROM MaintenanceRequest m WHERE m.property.owner.id = :ownerId")
    Page<MaintenanceRequest> findByPropertyOwnerId(@Param("ownerId") Long ownerId, Pageable pageable);

    // By property
    Page<MaintenanceRequest> findByPropertyId(Long propertyId, Pageable pageable);

    // By status
    Page<MaintenanceRequest> findByStatus(Status status, Pageable pageable);

    // By priority
    Page<MaintenanceRequest> findByPriority(Priority priority, Pageable pageable);

    // Open requests count for a property
    long countByPropertyIdAndStatusIn(Long propertyId, List<Status> statuses);

    // Assigned to a user
    Page<MaintenanceRequest> findByAssignedToId(Long userId, Pageable pageable);

    // Stats for admin
    @Query("SELECT m.status, COUNT(m) FROM MaintenanceRequest m GROUP BY m.status")
    List<Object[]> getStatusCounts();

    @Query("SELECT m.priority, COUNT(m) FROM MaintenanceRequest m WHERE m.status IN ('OPEN', 'IN_PROGRESS') GROUP BY m.priority")
    List<Object[]> getOpenByPriority();

    long countByStatusIn(List<Status> statuses);
}
