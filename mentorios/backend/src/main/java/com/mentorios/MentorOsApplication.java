package com.mentorios;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class MentorOsApplication {

    public static void main(String[] args) {
        SpringApplication.run(MentorOsApplication.class, args);
    }

}
