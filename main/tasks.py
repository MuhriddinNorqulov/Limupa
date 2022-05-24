from celery import shared_task
from datetime import datetime
from .send_sms import sendSmsOneContact


@shared_task(name='send_sms')
def createTask(*args, **kwargs):

    sendSmsOneContact(+998944840604, 'celery test')

    return 'done'


