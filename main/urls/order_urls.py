from django.urls import path
from main.views import order_views as views

urlpatterns = [
    path('', views.getOrders, name='orders'),
    path('my-orders/', views.getMyOrders, name='my-orders'),
    path('add/', views.addOrder, name='add-order'),
    path('detail/<int:id>/', views.getOrderDetail),
    path('<int:id>/pay/', views.updateOrderToPaid, name='pay')
]