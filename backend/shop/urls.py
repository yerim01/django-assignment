from rest_framework.routers import DefaultRouter
from shop.views import ProductViewSet, CategoryViewSet, TagViewSet

router = DefaultRouter()
router.register(r"products", ProductViewSet, basename="product")
router.register(r"categories", CategoryViewSet, basename="category")
router.register(r"tags", TagViewSet, basename="tag")

urlpatterns = router.urls