package com.yavuz.book_share.feedback;

import java.util.Objects;

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

    public FeedBackResponse toFeedBackResponse(FeedBack f, Integer id) {
        return FeedBackResponse.builder()
                .note(f.getNote())
                .comment(f.getComment())
                .ownFeedBack(Objects.equals(f.getCreatedBy(), id))
                .build();
    }
}