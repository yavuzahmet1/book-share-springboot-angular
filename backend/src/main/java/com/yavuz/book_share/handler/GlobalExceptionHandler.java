package com.yavuz.book_share.handler;

import java.util.HashSet;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

        @ExceptionHandler(LockedException.class)
        public ResponseEntity<ExceptionResponse> handleException(LockedException e) {
                return createResponse(BusinessErrorCodes.ACCOUNT_LOCKED, e);
        }

        @ExceptionHandler(DisabledException.class)
        public ResponseEntity<ExceptionResponse> handleException(DisabledException e) {
                return createResponse(BusinessErrorCodes.ACCOUNT_DISABLED, e);
        }

        @ExceptionHandler(BadCredentialsException.class)
        public ResponseEntity<ExceptionResponse> handleException(BadCredentialsException e) {
                return createResponse(BusinessErrorCodes.BAD_CREDENTIALS, e);
        }

        @ExceptionHandler(MethodArgumentNotValidException.class)
        public ResponseEntity<ExceptionResponse> handleException(MethodArgumentNotValidException e) {
                Set<String> errorMessages = new HashSet<>();
                e.getBindingResult().getAllErrors()
                                .forEach(error -> errorMessages.add(error.getDefaultMessage()));

                return ResponseEntity
                                .status(HttpStatus.BAD_REQUEST)
                                .body(ExceptionResponse.builder()
                                                .businessErrorCode(BusinessErrorCodes.INVALID_REQUEST.getCode())
                                                .businessExceptionDescription(
                                                                BusinessErrorCodes.INVALID_REQUEST.getDescription())
                                                .validationErrors(errorMessages)
                                                .build());
        }

        @ExceptionHandler(Exception.class)
        public ResponseEntity<ExceptionResponse> handleException(Exception e) {
                e.printStackTrace();
                return createResponse(BusinessErrorCodes.INTERNAL_ERROR, e);
        }

        private ResponseEntity<ExceptionResponse> createResponse(BusinessErrorCodes code, Exception e) {
                return ResponseEntity
                                .status(code.getHttpStatus())
                                .body(ExceptionResponse.builder()
                                                .businessErrorCode(code.getCode())
                                                .businessExceptionDescription(code.getDescription())
                                                .error(e.getMessage())
                                                .build());
        }
}