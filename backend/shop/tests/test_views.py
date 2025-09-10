from django.test import TestCase
from rest_framework.test import APIRequestFactory
from shop.models import Category, Tag, Product
from shop.views import CategoryViewSet, TagViewSet, ProductViewSet

class TestViews(TestCase):

    @classmethod
    def setUpTestData(cls):
        # Categories
        cls.cat1 = Category.objects.create(name="Wiring")
        cls.cat2 = Category.objects.create(name="Lighting")

        # Tags
        cls.tag1 = Tag.objects.create(name="Copper")
        cls.tag2 = Tag.objects.create(name="Insulated")
        cls.tag3 = Tag.objects.create(name="LED")

        # Products
        cls.prod1 = Product.objects.create(
            name="Copper Wire Roll",
            description="High-quality copper wiring",
            category=cls.cat1
        )
        cls.prod1.tags.add(cls.tag1, cls.tag2)

        cls.prod2 = Product.objects.create(
            name="LED Tube Light",
            description="Energy-efficient LED tube",
            category=cls.cat2
        )
        cls.prod2.tags.add(cls.tag3)

        cls.factory = APIRequestFactory()
    
    def test_product_viewset(self):
        """Test ProductViewSet returns a list of products ordered by name"""
        view = ProductViewSet.as_view({"get": "list"})
        request = self.factory.get("/products/")
        response = view(request)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]["name"], "Copper Wire Roll")
        self.assertEqual(response.data[1]["name"], "LED Tube Light")

    def test_product_search_by_description(self):
        """Test ProductViewSet search by description"""
        view = ProductViewSet.as_view({"get": "list"})
        
        # Search for "copper" should return prod1
        request = self.factory.get("/products/", {"search": "copper"})
        response = view(request)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["name"], "Copper Wire Roll")

        # Search for "led" should return prod2
        request = self.factory.get("/products/", {"search": "led"})
        response = view(request)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["name"], "LED Tube Light")

        # Search for non-existing keyword should return 0
        request = self.factory.get("/products/", {"search": "aluminum"})
        response = view(request)
        self.assertEqual(len(response.data), 0)

    def test_product_filter_by_category(self):
        """Test filtering products by category id"""
        view = ProductViewSet.as_view({"get": "list"})
        request = self.factory.get("/products/", {"category": self.cat1.id})
        response = view(request)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["category"]["name"], "Wiring")

    def test_product_filter_by_tag(self):
        """Test filtering products by tag id"""
        view = ProductViewSet.as_view({"get": "list"})
        request = self.factory.get("/products/", {"tags": self.tag3.id})
        response = view(request)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["tags"][0]["name"], "LED")

    def test_category_viewset(self):
        """Test CategoryViewSet returns a list of categories ordered by name"""
        view = CategoryViewSet.as_view({"get": "list"})
        request = self.factory.get("/categories/")
        response = view(request)
        names = [cat["name"] for cat in response.data]
        self.assertEqual(names, ["Lighting", "Wiring"])

    def test_tag_viewset(self):
        """Test TagViewSet returns a list of tags ordered by name"""
        view = TagViewSet.as_view({"get": "list"})
        request = self.factory.get("/tags/")
        response = view(request)
        names = [tag["name"] for tag in response.data]
        self.assertEqual(names, ["Copper", "Insulated", "LED"])

    def test_product_search_with_filters(self):
        """Test combined search and filters"""
        view = ProductViewSet.as_view({"get": "list"})

        # Case 1: search "copper" + category "Wiring" + tags "Copper" and "Insulated" should return prod1
        request = self.factory.get("/products/", {
            "search": "copper",
            "category": self.cat1.id,
            "tags": [self.tag1.id, self.tag2.id]
        })
        response = view(request)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["name"], "Copper Wire Roll")

        # Case 2: search "copper" + category "Lighting" should return 0
        request = self.factory.get("/products/", {
            "search": "copper",
            "category": self.cat2.id
        })
        response = view(request)
        self.assertEqual(len(response.data), 0)

        # Case 3: search "LED" + tag "Insulated" should return 0
        request = self.factory.get("/products/", {
            "search": "LED",
            "tags": self.tag2.id
        })
        response = view(request)
        self.assertEqual(len(response.data), 0)