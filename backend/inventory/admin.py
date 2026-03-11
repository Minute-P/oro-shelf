from django.contrib import admin
from .models import Category, ProductReference, ShelfInspection

admin.site.register(Category)
admin.site.register(ProductReference)
admin.site.register(ShelfInspection)
