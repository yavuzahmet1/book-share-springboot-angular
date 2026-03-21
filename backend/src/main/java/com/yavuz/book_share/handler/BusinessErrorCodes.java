package com.yavuz.book_share.handler;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public enum BusinessErrorCodes {
    // General Errors
    NO_CODE(0, HttpStatus.NOT_IMPLEMENTED, "No specific business error code provided"),

    // Auth Errors
    ACCOUNT_LOCKED(300, HttpStatus.FORBIDDEN, "Account is locked"),
    ACCOUNT_DISABLED(303, HttpStatus.FORBIDDEN, "Account is disabled"),
    BAD_CREDENTIALS(304, HttpStatus.UNAUTHORIZED, "Login and password do not match"),

    // Password Errors
    INCORRECT_CURRENT_PASSWORD(301, HttpStatus.BAD_REQUEST, "Incorrect current password"),
    NEW_PASSWORD_DOES_NOT_MATCH(302, HttpStatus.BAD_REQUEST, "New password and confirmation do not match"),

    // Source Errors
    USER_NOT_FOUND(305, HttpStatus.NOT_FOUND, "User not found"),
    INVALID_REQUEST(306, HttpStatus.BAD_REQUEST, "Invalid request data"),

    // System Errors
    INTERNAL_ERROR(310, HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error");

    private final int code;
    private final String description;
    private final HttpStatus httpStatus;

    BusinessErrorCodes(int code, HttpStatus httpStatus, String description) {
        this.code = code;
        this.httpStatus = httpStatus;
        this.description = description;
    }
}