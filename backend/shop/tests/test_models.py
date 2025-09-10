from django.test import TestCase
from shop.models import Category, Tag, Product
from django.db import IntegrityError

class TestModels(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.category = Category.objects.create(name="Wiring")
        cls.tag = Tag.objects.create(name="Copper")
        cls.product = Product.objects.create(
            name="Test Product",
            description="Durable aluminum wiring for commercial use.",
            category=cls.category
        )
        cls.product.tags.add(cls.tag)

    def test_category_str(self):
        self.assertEqual(str(self.category), "Wiring")

    def test_tag_str(self):
        self.assertEqual(str(self.tag), "Copper")

    def test_product_str(self):
        self.assertEqual(str(self.product), "Test Product")

    def test_category_uniqueness(self):
        with self.assertRaises(IntegrityError):
            Category.objects.create(name="WIRING")

    def test_tag_uniqueness(self):
        with self.assertRaises(IntegrityError):
            Tag.objects.create(name="COPPER")

    def test_product_uniqueness(self):
        with self.assertRaises(IntegrityError):
            Product.objects.create(
                name="TEST product",
                description="duplicate product name",
                category=self.category
            )
