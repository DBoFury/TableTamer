from django.db import models
from halls.models import Hall, Table
from products.models import Product
from users.models import User


class Order(models.Model):
    created_at = models.DateTimeField(auto_now=True,
                                      help_text="Date and time of Order creation")
    commentary = models.TextField(blank=True,
                                  verbose_name="Commentary",
                                  help_text="Commentary to an Order")
    products = models.ManyToManyField(Product, through="OrderItem")
    table = models.ForeignKey(
        Table, null=True, blank=True, on_delete=models.SET_NULL)
    user = models.ForeignKey(User, null=True,
                             blank=True, on_delete=models.CASCADE)
    paid_amount = models.IntegerField(verbose_name="Paid Amount",
                                      help_text="Amount of money client paid")
    is_takeaway = models.BooleanField(verbose_name="Takeaway",
                                      help_text="Is Order been taken as a takeaway")

    def __str__(self) -> str:
        return f"{self.created_at} {self.user or ''}"

    @property
    def full_price(self) -> int:
        full_price = 0
        for order_item in self.order_items.all():
            full_price += order_item.amount * order_item.product.price
        return full_price

    @property
    def submission(self) -> int:
        return int(self.paid_amount) - self.full_price

    @property
    def hall(self) -> Hall:
        return self.table.hall


class OrderItem(models.Model):
    product = models.ForeignKey(Product,
                                on_delete=models.CASCADE)
    order = models.ForeignKey(Order,
                              on_delete=models.CASCADE, related_name="order_items")

    amount = models.SmallIntegerField(
        help_text="Amount of product ordered")
