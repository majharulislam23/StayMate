package com.webapp.domain.user.dto;

import com.webapp.domain.user.enums.RoleName;
import lombok.Data;

import java.util.Set;

@Data
public class UserUpdateDto {
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String bio;
    private String address;
    private String city;
    private Set<RoleName> roles;
    private Boolean enabled;
}
