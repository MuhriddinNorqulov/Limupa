from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from celery.schedules import crontab

# setting the Django settings module.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'maxshop_backend.settings')
app = Celery('maxshop_backend')
app.config_from_object('django.conf:settings', namespace='CELERY')

app.conf.enable_utc = False
app.conf.update(timezone='Asia/Tashkent')
# Looks up for task modules in Django applications and loads them
app.autodiscover_tasks()

app.conf.beat_schedule = {
    'task1': {
        "task": 'send_sms',
        'schedule': crontab(day_of_week='1-6', hour='16', minute='0'),

    },
    'task2': {
        "task": 'create_object',
        "schedule": 30.0
    }
}


@app.task(bind=True)
def debug_task(self):
    print(f"Request: {self.request!r}")

