package com.yavuz.book_share;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class BookShareApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(BookShareApiApplication.class, args);
	}

}
