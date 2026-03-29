package com.yavuz.book_share.book;

import java.util.List;
import java.util.Objects;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.yavuz.book_share.book.file.FileStorageService;
import com.yavuz.book_share.exception.OperationNotPermittedExcepition;
import com.yavuz.book_share.history.BookTransactionHistory;
import com.yavuz.book_share.history.BookTransactionHistoryRepository;
import com.yavuz.book_share.user.User;

import jakarta.persistence.EntityNotFoundException;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookService {

        private final BookRepository bookRepository;
        private final BookMapper bookMapper;
        private final BookTransactionHistoryRepository transactionHistoryRepository;
        private final FileStorageService fileStorageService;

        public Integer save(BookRequest request, Authentication connectedUser) {
                User user = ((User) connectedUser.getPrincipal());
                Book book = bookMapper.toBook(request);
                book.setOwner(user);

                return bookRepository.save(book).getId();
        }

        public BookResponse findById(@NonNull Integer bookId) {
                return bookRepository.findById(bookId)
                                .map(bookMapper::toBookResponse)
                                .orElseThrow(() -> new EntityNotFoundException("Book not found with id: " + bookId));
        }

        public PageResponse<BookResponse> findAllBooks(int page, int size, Authentication connectedUser) {

                User user = ((User) connectedUser.getPrincipal());
                Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
                Page<Book> books = bookRepository.findAllDisplayableBooks(pageable, user.getId());
                List<BookResponse> bookResponse = books.stream()
                                .map(bookMapper::toBookResponse)
                                .toList();
                return new PageResponse<>(
                                bookResponse,
                                books.getNumber(),
                                books.getSize(),
                                books.getTotalElements(),
                                books.getTotalPages(),
                                books.isFirst(),
                                books.isLast());
        }

        public PageResponse<BookResponse> findAllBooksOwner(int page, int pageSize, Authentication connectedUser) {
                User user = ((User) connectedUser.getPrincipal());
                Pageable pageable = PageRequest.of(page, pageSize, Sort.by("createdAt").descending());
                Page<Book> books = bookRepository.findAll(BookSpecification.withOwnerId(user.getId()), pageable);
                List<BookResponse> bookResponse = books.stream()
                                .map(bookMapper::toBookResponse)
                                .toList();
                return new PageResponse<>(
                                bookResponse,
                                books.getNumber(),
                                books.getSize(),
                                books.getTotalElements(),
                                books.getTotalPages(),
                                books.isFirst(),
                                books.isLast());
        }

        public PageResponse<BorrowedBookResponse> findAllBorrowedBooks(int page, int pageSize,
                        Authentication connectedUser) {
                User user = ((User) connectedUser.getPrincipal());
                Pageable pageable = PageRequest.of(page, pageSize, Sort.by("createdAt").descending());
                Page<BookTransactionHistory> allBorrowedBooks = transactionHistoryRepository.findAllBorrowedBooks(
                                pageable,
                                user.getId());
                List<BorrowedBookResponse> bookResponse = allBorrowedBooks.stream()
                                .map(bookMapper::toBorrowedBookResponse)
                                .toList();
                return new PageResponse<>(
                                bookResponse,
                                allBorrowedBooks.getNumber(),
                                allBorrowedBooks.getSize(),
                                allBorrowedBooks.getTotalElements(),
                                allBorrowedBooks.getTotalPages(),
                                allBorrowedBooks.isFirst(),
                                allBorrowedBooks.isLast());
        }

        public PageResponse<BorrowedBookResponse> findAllReturnedBooks(int page, int pageSize,
                        Authentication connectedUser) {
                User user = ((User) connectedUser.getPrincipal());
                Pageable pageable = PageRequest.of(page, pageSize, Sort.by("createdAt").descending());
                Page<BookTransactionHistory> allBorrowedBooks = transactionHistoryRepository.findAllReturnedBooks(
                                pageable,
                                user.getId());
                List<BorrowedBookResponse> bookResponse = allBorrowedBooks.stream()
                                .map(bookMapper::toBorrowedBookResponse)
                                .toList();
                return new PageResponse<>(
                                bookResponse,
                                allBorrowedBooks.getNumber(),
                                allBorrowedBooks.getSize(),
                                allBorrowedBooks.getTotalElements(),
                                allBorrowedBooks.getTotalPages(),
                                allBorrowedBooks.isFirst(),
                                allBorrowedBooks.isLast());
        }

        public Integer updateShareableStatus(Integer bookId, Authentication connectedUser) {
                Book book = bookRepository.findById(bookId)
                                .orElseThrow(() -> new EntityNotFoundException(
                                                "Book is not found with the ID : " + bookId));
                User user = ((User) connectedUser.getPrincipal());
                if (!Objects.equals(book.getOwner().getId(), user.getId())) {
                        throw new OperationNotPermittedExcepition("You cannot update books shareable status");

                }
                book.setShareable(!book.isShareable());
                bookRepository.save(book);
                return bookId;
        }

        public Integer updateArchivedStatus(Integer bookId, Authentication connectedUser) {
                Book book = bookRepository.findById(bookId)
                                .orElseThrow(() -> new EntityNotFoundException(
                                                "Book is not found with the ID : " + bookId));
                User user = ((User) connectedUser.getPrincipal());
                if (!Objects.equals(book.getOwner().getId(), user.getId())) {
                        throw new OperationNotPermittedExcepition("You cannot update others books archived status");

                }
                book.setArchived(!book.isArchived());
                bookRepository.save(book);
                return bookId;
        }

        public Integer borrowBook(Integer bookId, Authentication connectedUser) {
                Book book = bookRepository.findById(bookId)
                                .orElseThrow(() -> new EntityNotFoundException("Book is not found : " + bookId));
                if (book.isArchived() || !book.isShareable()) {
                        throw new OperationNotPermittedExcepition("The request book can not be borrowed");
                }
                User user = ((User) connectedUser.getPrincipal());
                if (!Objects.equals(book.getOwner().getId(), user.getId())) {
                        throw new OperationNotPermittedExcepition("You cannot borrow your own book.");
                }

                final boolean isAlreadyBorrowed = transactionHistoryRepository.isAlreadyBorrowedByUser(bookId,
                                user.getId());
                if (isAlreadyBorrowed) {
                        throw new OperationNotPermittedExcepition("The requested book is already borrowed!!");
                }

                BookTransactionHistory bookTransactionHistory = BookTransactionHistory.builder()
                                .user(user)
                                .book(book)
                                .returned(false)
                                .returnApproved(false)
                                .build();

                return transactionHistoryRepository.save(bookTransactionHistory).getId();
        }

        public Integer returnBorrowedBook(Integer bookId, Authentication connectedUser) {
                Book book = bookRepository.findById(bookId)
                                .orElseThrow(() -> new EntityNotFoundException("Book not found with id: " + bookId));

                if (book.isArchived() || !book.isShareable()) {
                        throw new OperationNotPermittedExcepition(
                                        "The requested book cannot be returned because it is archived or not shareable.");
                }

                User user = ((User) connectedUser.getPrincipal());

                if (Objects.equals(book.getOwner().getId(), user.getId())) {
                        throw new OperationNotPermittedExcepition("You cannot borrow or return your own book.");
                }

                BookTransactionHistory bookTransactionHistory = transactionHistoryRepository
                                .findByBookIdAndUserId(bookId, user.getId())
                                .orElseThrow(() -> new OperationNotPermittedExcepition("You did not borrow this book"));

                if (bookTransactionHistory.isReturned()) {
                        throw new OperationNotPermittedExcepition("You have already returned this book.");
                }

                bookTransactionHistory.setReturned(true);

                return transactionHistoryRepository.save(bookTransactionHistory).getId();
        }

        public Integer approveReturnBorrowBook(Integer bookId, Authentication connectedUser) {
                Book book = bookRepository.findById(bookId)
                                .orElseThrow(() -> new EntityNotFoundException("Book not found with id: " + bookId));

                if (book.isArchived() || !book.isShareable()) {
                        throw new OperationNotPermittedExcepition(
                                        "The requested book cannot be returned because it is archived or not shareable.");
                }

                User user = ((User) connectedUser.getPrincipal());

                if (!Objects.equals(book.getOwner().getId(), user.getId())) {
                        throw new OperationNotPermittedExcepition(
                                        "You cannot approve the return of a book you do not own.");
                }

                BookTransactionHistory bookTransactionHistory = transactionHistoryRepository
                                .findByBookIdAndOwnerId(bookId, user.getId())
                                .orElseThrow(() -> new OperationNotPermittedExcepition(
                                                "No transaction history found for this book and owner."));

                if (!bookTransactionHistory.isReturned()) {
                        throw new OperationNotPermittedExcepition(
                                        "The book is not returned yet. You can't approve its return!!");
                }

                if (bookTransactionHistory.isReturnApproved()) {
                        throw new OperationNotPermittedExcepition("The return is already approved.");
                }

                bookTransactionHistory.setReturnApproved(true);
                return transactionHistoryRepository.save(bookTransactionHistory).getId();
        }

        public void uploadBookCoverPicture(MultipartFile file, Authentication connectedUser, Integer bookId) {

                Book book = bookRepository.findById(bookId)
                                .orElseThrow(() -> new EntityNotFoundException("Book not found with id: " + bookId));

                User user = ((User) connectedUser.getPrincipal());
                var bookCover = fileStorageService.saveFile(file, book, user.getId());
                book.setBookCover(bookCover);
                bookRepository.save(book);
        }

}
