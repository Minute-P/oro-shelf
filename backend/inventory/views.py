from rest_framework import viewsets
from .models import Category, ProductReference, ShelfInspection
from .serializers import CategorySerializer, ProductReferenceSerializer, ShelfInspectionSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer


class ProductReferenceViewSet(viewsets.ModelViewSet):
    queryset = ProductReference.objects.select_related('category').all().order_by('-created_at')
    serializer_class = ProductReferenceSerializer


class ShelfInspectionViewSet(viewsets.ModelViewSet):
    queryset = ShelfInspection.objects.all()
    serializer_class = ShelfInspectionSerializer
