from django.urls import path
from main.views import product_views as views

urlpatterns = [
    path('', views.getProducts, name='products'),
    path('detail/<str:id>/', views.productDetail, name='product'),
    path('delete/<int:pk>/', views.deleteProduct, name='delete-product'),
    path('<int:pk>/review/', views.createReviews, name='create-review'),
]