from rest_framework import serializers
from .models import Category, Tag, Product

# Serialize Category data
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name"]

# Serialize Tag data
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ["id", "name"]

# Serialize Product data
class ProductSerializer(serializers.ModelSerializer):
    # Nested category and tag info
    category = CategorySerializer()
    tag = TagSerializer(many=True)

    class Meta:
        model = Product
        fields = ["id", "name", "description", "category", "tags"]