package com.healthcare.hospitalms.repo;

import com.healthcare.hospitalms.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepo extends JpaRepository<Room, Integer> {
}
