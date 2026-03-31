package com.yavuz.book_share.feedback;

import org.springframework.stereotype.Service;

import com.yavuz.book_share.book.Book;

@Service
public class FeedBackMapper {

    public FeedBack toFeedBack(FeedBackRequest request) {
        return FeedBack.builder()
                .note(request.note())
                .comment(request.comment())
                .book(Book.builder()
                        .id(request.bookId())
                        .archived(false)
                        .shareable(false)
                        .build())
                .build();
    }
}