from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from main.serializers import OrderSerializer
from rest_framework.decorators import api_view, permission_classes
from main.models import Order, ShippingAddress, OrderItem, Product
from rest_framework import status
from datetime import datetime
import time


@api_view(['GET'])
def getOrders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderDetail(request, id):
    user = request.user

    try:
        order = Order.objects.get(_id=id)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            return Response({'detail': 'Not authorized to view this order'}, status=status.HTTP_403_FORBIDDEN)

    except:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrder(request):
    user = request.user
    data = request.data
    print(data)

    order_items = data['orderItems']

    # create order
    order = Order.objects.create(
        user=user,
        paymentMethod=data['paymentMethod'],

    )

    # create shipping address

    shipping = ShippingAddress.objects.create(
        order=order,
        address=data['shippingAddress']['address'],
        city=data['shippingAddress']['city'],
        country=data['shippingAddress']['country'],
        postalCode=data['shippingAddress']['postalCode'],
        name=data['shippingAddress']['name'],
        phone=data['shippingAddress']['number']
    )

    # create order items

    for i in order_items:
        try:
            product = Product.objects.get(_id=i['product'])
            qty = i['qty']
            if qty > product.countInStock:
                qty = product.countInStock

            item = OrderItem.objects.create(
                product=product,
                order=order,
                qty=qty,
            )

            product.countInStock -= item.qty
            product.save()
        except:
            pass
    order.save()
    serializer = OrderSerializer(order, many=False)

    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, id):
    order = Order.objects.get(_id=id)

    order.isPaid = True
    order.paidAt = datetime.now()
    order.save()
    return Response('Order was paid')