import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, Row, Col, Form, Button } from 'react-bootstrap';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [searchParams, setSearchParams] = useState({
        title: '',
        author: '',
        min_published_date: '',
        max_published_date: ''
    });

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get('http://localhost:8000/bookAPI/books/', {
                params: searchParams
            });
            setBooks(response.data);
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams({
            ...searchParams,
            [name]: value
        });
    };

    const handleSearch = () => {
        fetchBooks();
    };

    return (
        <Container>
            <h1 className="my-4">Library Book List</h1>

            {/* Search Form */}
            <Form className="mb-4">
                <Row>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Search by title"
                            name="title"
                            value={searchParams.title}
                            onChange={handleInputChange}
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            type="text"
                            placeholder="Search by author"
                            name="author"
                            value={searchParams.author}
                            onChange={handleInputChange}
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            type="date"
                            placeholder="Min published date"
                            name="min_published_date"
                            value={searchParams.min_published_date}
                            onChange={handleInputChange}
                        />
                    </Col>
                    <Col>
                        <Form.Control
                            type="date"
                            placeholder="Max published date"
                            name="max_published_date"
                            value={searchParams.max_published_date}
                            onChange={handleInputChange}
                        />
                    </Col>
                    <Col>
                        <Button variant="primary" onClick={handleSearch}>
                            Search
                        </Button>
                    </Col>
                </Row>
            </Form>

            {/* Book Cards */}
            <Row>
                {books.map(book => (
                    <Col key={book.id} sm={12} md={6} lg={4} className="mb-4">
                        <Card>
                            <Card.Body>
                                <Card.Title>{book.title}</Card.Title>
                                <Card.Text>
                                    <strong>Author:</strong> {book.author.name} <br />
                                    <strong>Published Date:</strong> {book.published_date} <br />
                                    {book.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default BookList;
