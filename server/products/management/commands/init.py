from django.core.management.base import BaseCommand
from django.core.management import call_command


class Command(BaseCommand):
    def handle(self, *args, **options):
        call_command("migrate")
        call_command("loaddata", "users")
        call_command("loaddata", "halls")
        call_command("loaddata", "tables")
        call_command("loaddata", "departments")
        call_command("loaddata", "categories")
        call_command("loaddata", "attributes")
        call_command("loaddata", "attribute_values")
        call_command("loaddata", "products")
        call_command("loaddata", "orders")
