from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=120, unique=True)
    description = models.TextField(blank=True)

    def __str__(self) -> str:
        return self.name


class ProductReference(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='references')
    name = models.CharField(max_length=150)
    details = models.TextField(blank=True)
    image = models.ImageField(upload_to='product_references/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return self.name


class ShelfInspection(models.Model):
    checked_at = models.DateTimeField(auto_now_add=True)
    total_products = models.PositiveIntegerField()
    empty_slots = models.PositiveIntegerField()
    displayed_products = models.JSONField(default=list)
    remaining_stock = models.PositiveIntegerField(blank=True, null=True)
    ai_summary = models.TextField(blank=True)

    class Meta:
        ordering = ['-checked_at']

    def __str__(self) -> str:
        return f'Inspection {self.id} @ {self.checked_at:%Y-%m-%d %H:%M}'
