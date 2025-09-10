from django.test import TestCase
from shop.models import Category, Tag, Product
from shop.serializers import CategorySerializer, TagSerializer, ProductSerializer

class TestSerializers(TestCase):

    @classmethod
    def setUpTestData(cls):
        cls.category = Category.objects.create(name="Wiring")
        cls.tag1 = Tag.objects.create(name="Tag1")
        cls.tag2 = Tag.objects.create(name="Tag2")

        cls.product = Product.objects.create(
            name="Copper Wire Roll",
            description="Test description for copper wire roll",
            category=cls.category
        )
        cls.product.tags.add(cls.tag1, cls.tag2)

    def test_category_serializer(self):
        serializer = CategorySerializer(self.category)
        expected_data = {
            "id": self.category.id,
            "name": self.category.name
        }
        self.assertEqual(serializer.data, expected_data)
    
    def test_tag_serializer(self):
        serializer = TagSerializer(self.tag1)
        expected_data = {
            "id": self.tag1.id,
            "name":self.tag1.name
        }
        self.assertEqual(serializer.data, expected_data)
    
    def test_product_serializer(self):
        serializer = ProductSerializer(self.product)
        data = serializer.data

        self.assertEqual(data["id"], self.product.id)
        self.assertEqual(data["name"], self.product.name)
        self.assertEqual(data["description"], self.product.description)

        # Check nested category
        self.assertEqual(data["category"]["id"], self.category.id)
        self.assertEqual(data["category"]["name"], self.category.name)

        # Check nested tags
        tag_ids = [tag["id"] for tag in data["tags"]]
        tag_names = [tag["name"] for tag in data["tags"]]
        self.assertIn(self.tag1.id, tag_ids)
        self.assertIn(self.tag2.id, tag_ids)
        self.assertIn(self.tag1.name, tag_names)
        self.assertIn(self.tag2.name, tag_names)
    
    def test_product_serializer_validation(self):
        product_data = {
            "name": "Aluminum Wire Roll",
            "description": "Durable aluminum wiring.",
            "category": {"id": self.category.id, "name": self.category.name},
            "tags": [
                {"id": self.tag1.id, "name": self.tag1.name},
                {"id": self.tag2.id, "name": self.tag2.name}
            ]
        }
        serializer = ProductSerializer(data=product_data)
        self.assertTrue(serializer.is_valid(), serializer.errors)