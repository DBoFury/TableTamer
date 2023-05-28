from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.exceptions import ObjectDoesNotExist

from .models import Order


@receiver(post_save, sender=Order)
def on_change(sender, instance: Order, **kwargs):
    try:
        print(instance)
    except ObjectDoesNotExist:
        pass
