package com.yavuz.book_share.book;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

public record BookRequest(
        Integer id,

        @NotNull(message = "Title is required") @NotEmpty(message = "Title cannot be empty") String title,
        @NotNull(message = "Author name is required") @NotEmpty(message = "Author name cannot be empty") String authorName,
        @NotNull(message = "Synopsis is required") @NotEmpty(message = "Synopsis cannot be empty") String synopsis,
        @NotNull(message = "Shareable is required") Boolean shareable,
        @NotNull(message = "ISBN is required") @NotEmpty(message = "ISBN cannot be empty") String isbn) {

}
