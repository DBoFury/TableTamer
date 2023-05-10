from departments.models import Department
from django.db import models
from products.models import AttributeValue, Product


class Order(models.Model):
    created_at = models.DateTimeField(auto_now=True,
                                      help_text="Date and time of Order creation")
    is_fulfilled = models.BooleanField(default=False,
                                       verbose_name="Fulfilled",
                                       help_text="Is Order finished and client got his products")
    is_paid = models.BooleanField(default=False,
                                  verbose_name="Paid",
                                  help_text="Is Order has been paid")
    is_takeaway = models.BooleanField(verbose_name="Takeaway",
                                      help_text="Is Order been taken as a takeaway")

    products = models.ManyToManyField(Product, through="OrderItem")

    # user = models.ForeignKey(
    #     User, null=True, blank=True, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"{self.created_at} {self.user or ''}"

    @property
    def full_price(self) -> int:
        full_price = 0
        for order_item in self.order_items.all():
            full_price += order_item.amount * order_item.price_per_unit
        return full_price


class OrderItem(models.Model):
    product = models.ForeignKey(Product,
                                on_delete=models.CASCADE)
    order = models.ForeignKey(Order,
                              on_delete=models.CASCADE, related_name="order_items")

    amount = models.SmallIntegerField(
        help_text="Amount of product ordered")

    attribute_values = models.ManyToManyField(
        AttributeValue, through="SelectedAttribute")


class SelectedAttribute(models.Model):
    order_item = models.ForeignKey(OrderItem,
                                   on_delete=models.CASCADE)
    attribute_value = models.ForeignKey(AttributeValue,
                                        on_delete=models.CASCADE)
