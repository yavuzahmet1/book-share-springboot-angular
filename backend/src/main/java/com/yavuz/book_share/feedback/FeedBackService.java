package com.yavuz.book_share.feedback;

import java.util.Objects;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.yavuz.book_share.book.Book;
import com.yavuz.book_share.book.BookRepository;
import com.yavuz.book_share.exception.OperationNotPermittedExcepition;
import com.yavuz.book_share.user.User;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FeedBackService {
    private final BookRepository bookRepository;
    private final FeedBackMapper feedBackMapper;
    private final FeedBackRepository feedBackRepository;

    public Integer save(FeedBackRequest request, Authentication connectedUser) {

        Book book = bookRepository.findById(request.bookId())
                .orElseThrow(() -> new EntityNotFoundException("No book found with the ID : " + request.bookId()));
        if (book.isArchived() || !book.isShareable()) {
            throw new OperationNotPermittedExcepition(
                    "You cannot give a feedback for an archived or not shareable book.");
        }
        User user = ((User) connectedUser.getPrincipal());
        if (Objects.equals(book.getOwner().getId(), user.getId())) {
            throw new OperationNotPermittedExcepition("You cannot give a feedback to oen book.");
        }

        FeedBack feedBack = feedBackMapper.toFeedBack(request);

        return feedBackRepository.save(feedBack).getId();
    }
}
