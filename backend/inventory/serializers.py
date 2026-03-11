from rest_framework import serializers
from .models import Category, ProductReference, ShelfInspection


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'description']


class ProductReferenceSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = ProductReference
        fields = ['id', 'category', 'category_name', 'name', 'details', 'image', 'created_at']


class ShelfInspectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShelfInspection
        fields = [
            'id',
            'checked_at',
            'total_products',
            'empty_slots',
            'displayed_products',
            'remaining_stock',
            'ai_summary',
        ]
