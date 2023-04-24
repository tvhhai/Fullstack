package com.example.server.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Table(name = "role")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Role extends BaseEntity {
    @Enumerated(EnumType.STRING)
    @Column(name = "name", nullable = false)
    private ERole name;

    @ManyToMany(mappedBy = "roles")
    private Set<User> users;

    public Role(String name) {
        this.name = ERole.valueOf(name);
    }
}
