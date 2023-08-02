package com.temporary.santa;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.temporary.santa.dbmgmt.user.User;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class SecretSantaApplication {

	public static void main(String[] args) {
		SpringApplication.run(SecretSantaApplication.class, args);
	}

}
