Library Management Api;

Here I use the technology express js,typeScript,validator,mongodb and mongoose

Core features:
Book management:
POST /api/books: Create new books with validation.
GET /api/books: Retrieve all books with filtering by genre, sorting, and limiting.
GET /api/books/:bookid: Retrieve a single book by id.
PUT /api/books/:bookid: Update a book details like {copies:50}.
DELETE /api/books/:bookid: Delete a book.

Borrowed books summary:
GET/api/borrow: Uses mongodb aggregation pipeline to group by book and sum total borrowed copies and retuen title ,isbn and totalQuantity

POST/api/borrow: Create a borrow books field where foreign id is bookid
