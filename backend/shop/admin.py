from django.contrib import admin
from shop.models import Category, Tag, Product

# Register models
admin.site.register(Category)
admin.site.register(Tag)
admin.site.register(Product)