from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ProductReferenceViewSet, ShelfInspectionViewSet

router = DefaultRouter()
router.register('categories', CategoryViewSet)
router.register('product-references', ProductReferenceViewSet)
router.register('inspections', ShelfInspectionViewSet)

urlpatterns = router.urls
