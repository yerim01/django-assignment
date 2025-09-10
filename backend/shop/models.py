from django.db import models

class Category(models.Model):
    """
    Category model: represents a product Category
    """    
    name = models.CharField(max_length=100)

    class Meta:
        """
        Check validity - uniqueness and lowercase, before saving
        """
        constraints = [
            models.UniqueConstraint(
                models.functions.Lower("name"),
                name="unique_category_name_case_insensitive"
            )
        ]

    def __str__(self): 
        return self.name

class Tag(models.Model):
    """
    Tag model: allows products to have mutiple tags
    """
    name = models.CharField(max_length=50)

    class Meta:
        """
        Check validity - uniqueness and lowercase, before saving
        """
        constraints = [
            models.UniqueConstraint(
                models.functions.Lower("name"),
                name="unique_tag_name_case_insensitive"
            )
        ]

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

    class Meta:
        """
        Check validity - uniqueness and lowercase, before saving
        """
        constraints = [
            models.UniqueConstraint(
                models.functions.Lower("name"),
                name="unique_product_name_case_insensitive"
            )
        ]

    def __str__(self):
        return self.name
