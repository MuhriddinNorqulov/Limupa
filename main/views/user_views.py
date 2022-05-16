from datetime import datetime
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from main.serializers import UserSerializer, UserSerializerWithToken
from rest_framework.response import Response
from rest_framework import status
from time import sleep
import random
import requests
import json



@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['PUT', 'GET'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user

    data = request.data
    user.first_name = data['name']
    user.username = data['phone']

    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()
    serializer = UserSerializerWithToken(user, many=False)

    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    user = User.objects.get(id=pk)
    user.delete()
    return Response('User was deleted')


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUserById(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['PUT', 'GET'])
@permission_classes([IsAdminUser])
def updateUser(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    data = request.data
    user.first_name = data['name']

    user.is_staff = data['isAdmin']

    user.save()

    return Response(serializer.data)


def get_sms_token(request):

    token = request.session.get('sms_auth_token')

    if not token:
        url = 'https://notify.eskiz.uz/api/auth/login'

        payload = {
            'email': 'test@eskiz.uz',
            'password': 'j6DWtQjjpLDNjWEk74Sx'
        }

        response = requests.request("POST", url, headers={}, data=payload, files=[])

        token = json.loads(response.text).get('data').get('token')
        request.session['sms_auth_token'] = token

    return token


def send_sms(request, phone, message_type):

    url = "https://notify.eskiz.uz/api/message/sms/send"
    verification_code = random.randrange(10000, 100000)
    print('ver code', verification_code)

    request.session[f'verification_code_{message_type}'] = str(verification_code)
    print('session', request.session[f'verification_code_{message_type}'])

    payload = {
        'mobile_phone': phone,
        'message': f'Limupa.uz sizning tasdiqlsh kodingiz {verification_code}',
        'from': '4546',
        'callback_url': 'http://0000.uz/test.php',

    }
    files = []
    token = get_sms_token(request)

    headers = {
        "Authorization": f"Bearer {token}"
    }

    response = requests.request("POST", url, headers=headers, data=payload, files=files)

    if response.status_code == 401:
        del request.session['sms_auth_token']
        send_sms(request, phone, '')
    else:
        return response


@api_view(['POST', 'GET'])
def send_verification_code(request, type):
    data = request.data
    phone = data['phone']
    exists = User.objects.filter(username=data['phone']).exists()
    if type == 'signup':
        if exists:
            return Response({'detail': 'This user exists!'}, status=status.HTTP_400_BAD_REQUEST)
    elif type == 'reset-password':
        if not exists:
            return Response({'detail': "This user doesn't exist!"}, status=status.HTTP_400_BAD_REQUEST)

    response = send_sms(request, phone, type)

    response_message = json.loads(response.text).get('message')

    try:
        response_message = response_message.get('mobile_phone')[0]
    except:
        pass

    message = {
        'detail': response_message,
        'status_code': response.status_code,
        'phone': phone
    }

    if message['status_code'] == 200:
        res_status = status.HTTP_200_OK
    else:
        res_status = status.HTTP_400_BAD_REQUEST

    return Response(message, status=res_status)


@api_view(['POST'])
def check_code(request):
    data = request.data
    verification_code = data.get('verification_code')

    if str(verification_code) != request.session.get('verification_code_reset-password'):
        return Response({'detail': 'Code Not available'}, status=status.HTTP_400_BAD_REQUEST)
    del request.session['verification_code_reset-password']

    return Response({'detail': 'Code confirmed'}, status=status.HTTP_200_OK)


@api_view(['POST'])
def reset_password(request):
    data = request.data

    phone = data.get('phone')
    new_password = data.get('new_password')

    try:

        user = User.objects.get(username=phone)
        user.password = make_password(password=new_password)
        user.save()

        return Response({'detail': 'Password changed successfully'}, status=status.HTTP_200_OK)

    except User.DoesNotExist:
        return Response({'detail': 'User does not exist'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def register(request):
    data = request.data

    sleep(2)
    print(data['verification_code'])
    print(request.session.get('verification_code_signup'))

    if str(data['verification_code']) != str(request.session.get('verification_code_signup')):
        return Response({'detail': 'Confirmation code error entered'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.create_user(

            username=str(data['phone']),
            password=data['password']
        )
        user.first_name = data.get('name')
        user.save()

        serializer = UserSerializer(user, many=False)

        return Response(serializer.data)

    except:
        message = {
            'detail': 'User with this username already exists'
        }
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # @classmethod
    # def get_token(cls, user):
    #     token = super().get_token(user)
    #
    #     # Add custom claims
    #     token['name'] = user.username
    #     token['key'] = 'val'
    #     # ...
    #
    #     return token

    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        self.user.last_login = datetime.now()
        self.user.save()

        for key, val in serializer.items():
            data[key] = val

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer