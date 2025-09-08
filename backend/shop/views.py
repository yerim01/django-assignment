from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from shop.models import Product, Category, Tag
from shop.serializers import ProductSerializer, CategorySerializer, TagSerializer
from rest_framework.permissions import AllowAny

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A read-only viewset for listing products.
    Supports:
    - Search by description
    - Filter by category
    - Filter by tags
    """
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    search_fields = ["description"] # Search by description
    filterset_fields = ["category", "tags"] # Filter by category or tags

# Viewset for listing categories.
class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]

# Viewset for listing tags
class TagViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [AllowAny]
    