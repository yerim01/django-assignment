from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from shop.models import Product
from shop.serializers import ProductSerializer
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
    