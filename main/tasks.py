from celery import shared_task
from datetime import datetime
from .send_sms import sendSmsOneContact
from .models import Task
from random import randrange


@shared_task(name='send_sms')
def send_sms(*args, **kwargs):
    sendSmsOneContact(+998944840604, 'celery test')
    return 'done'


@shared_task(name='create_object')
def create_object(*args, **kwargs):
    task = Task.objects.create(task_name=str(randrange(100)))
    return 'save'


