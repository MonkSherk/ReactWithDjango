from rest_framework import generics
from .models import Author, Book
from .serializers import AuthorSerializer, BookSerializer

class AuthorList(generics.ListCreateAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

class AuthorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

class BookList(generics.ListCreateAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class BookDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
class BookList(generics.ListCreateAPIView):
    serializer_class = BookSerializer

    def get_queryset(self):
        queryset = Book.objects.all()

        title = self.request.query_params.get('title', None)
        author_name = self.request.query_params.get('author', None)
        published_date = self.request.query_params.get('published_date', None)
        description = self.request.query_params.get('description', None)
        min_published_date = self.request.query_params.get('min_published_date', None)
        max_published_date = self.request.query_params.get('max_published_date', None)

        if title is not None:
            queryset = queryset.filter(title__icontains=title)

        if author_name is not None:
            queryset = queryset.filter(author__name__icontains=author_name)

        if published_date is not None:
            queryset = queryset.filter(published_date=published_date)

        if description is not None:
            queryset = queryset.filter(description__icontains=description)

        if min_published_date is not None:
            queryset = queryset.filter(published_date__gte=min_published_date)

        if max_published_date is not None:
            queryset = queryset.filter(published_date__lte=max_published_date)


        return queryset