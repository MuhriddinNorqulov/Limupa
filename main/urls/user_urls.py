from django.urls import path
from main.views import user_views as views

urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('profile/', views.getUserProfile, name='profile'),
    path('send-verification-code/<str:type>', views.send_verification_code, name='send-verification-code'),
    path('check-code/', views.check_code, name='check-code'),
    path('reset-password/', views.reset_password, name='reset-password'),
    path('register/', views.register, name='register'),
    path('profile/update/', views.updateUserProfile, name='update-profile'),
    path('', views.getUsers, name='all-users'),
    path('delete/<int:pk>/', views.deleteUser, name='delete-user'),
    path('<int:pk>/', views.getUserById, name='user'),
    path('update/<int:pk>/', views.updateUser, name='update-user')
]