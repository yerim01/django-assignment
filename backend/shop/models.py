from django.db import models
from django.core.exceptions import ValidationError

class Category(models.Model):
    """
    Category model: represents a product Category
    """    
    name = models.CharField(max_length=100, unique=True)

    def clean(self):
        """
        Check Validity before saving.
        Ensures no duplicate Category exists with the same name.
        Raises a ValidationError if a duplicate is found.
        """
        normalized_name = self.name.lower().strip()
        if Category.objects.filter(name=normalized_name).exclude(pk=self.pk).exists():
            raise ValidationError({"name": "Category with this name already exists."})

    def save(self, *args, **kwargs):
        """
        Convert the name to lowercase and save the object.
        """
        self.name = self.name.lower().strip()
        super().save(*args, **kwargs)

    def __str__(self): 
        return self.name

class Tag(models.Model):
    """
    Tag model: allows products to have mutiple tags
    """
    name = models.CharField(max_length=50, unique=True)

    def clean(self):
        normalized_name = self.name.lower().strip()
        if Tag.objects.filter(name=normalized_name).exclude(pk=self.pk).exists():
            raise ValidationError({"name": "Category with this name already exists."})

    def save(self, *args, **kwargs):
        self.name = self.name.lower().strip()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name

class Product(models.Model):
    """
    Product model: a product has relationsips with Category and Tag
    """
    name = models.CharField(max_length=200)
    description = models.TextField()

    # Each product has one category
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name="products"
    )

    # Each product can have multiple tags
    tags = models.ManyToManyField(
        Tag,
        related_name="products"
    )

    def __str__(self):
        return self.name
