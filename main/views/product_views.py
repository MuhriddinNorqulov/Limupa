import time
from rest_framework.response import Response
from main.serializers import ProductSerializer
from main.models import Product, Review
from rest_framework.decorators import api_view, permission_classes
from time import sleep
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


@api_view(['GET'])
def productDetail(request, id):
    try:
        product = Product.objects.get(_id=id)
        serializer = ProductSerializer(product, many=False)
        return Response(serializer.data)
    except Product.DoesNotExist:
        return Response({'detail': 'Product Not Found'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    try:
        product = Product.objects.get(_id=pk)
        product.delete()

        # time.sleep(4)
        return Response('Product Deleted')
    except:
        return Response({'message': 'Product does not exist'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createReviews(request, pk):
    user = request.user
    try:
        product = Product.objects.get(_id=pk)
        data = request.data

        already_exists = product.reviews.filter(user=user).exists()

        if already_exists:
            message = {'detail': 'Product already reviewed'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

        elif data['rating'] == 0:
            message = {'detail': 'Please select a rating'}
            return Response(message, status=status.HTTP_400_BAD_REQUEST)

        else:
            review = Review.objects.create(
                user=user,
                product=product,
                rating=data['rating'],
                comment=data['comment'],
                name=user.first_name
            )
            reviews = product.reviews.all()

            product.numReviews = len(reviews)
            total = 0
            for i in reviews:
                total += i.rating

            product.rating = total / len(reviews)

            product.save()
            return Response({'detail': 'Review Added'}, status=status.HTTP_201_CREATED)

    except Product.DoesNotExist:
        return Response({'detail': 'Product Not Fount'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def getProducts(request):
    data = request.query_params
    name = data.get('q')
    page = data.get('page')
    count = 20
    if name:
        products_all = Product.objects.filter(name__icontains=name)
        count = 9
    else:
        products_all = Product.objects.all()

    paginator = Paginator(products_all, count)

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)

    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    serializer = ProductSerializer(products, many=True)
    return Response({'products': serializer.data, 'page': page, 'num_pages': paginator.num_pages})