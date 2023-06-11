from django.db import models
from departments.models import Department


class Category(models.Model):
    title = models.CharField(
        max_length=64, unique=True,
        verbose_name="Category",
        help_text="Category name"
    )

    department = models.ForeignKey(Department,
                                   on_delete=models.CASCADE,
                                   help_text=("Department where this"
                                              " category of products is made"))

    def __str__(self) -> str:
        return self.title

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"


class Product(models.Model):
    title = models.CharField(
        max_length=128, unique=True,
        verbose_name="Product name",
        help_text="Product name")
    description = models.TextField(
        verbose_name="Product description")
    price = models.IntegerField(
        help_text="Product price per 1 unit"
    )
    image = models.ImageField(default="",
                              upload_to="images/products/",
                              blank=True)
    slug = models.SlugField(
        verbose_name="Slug",
        help_text="A short label of a product to use in URL")
    stock = models.IntegerField(
        null=True,
        blank=True,
        help_text="Amount of product in stock"
    )
    category = models.ForeignKey(
        Category, help_text="Category of a product",
        on_delete=models.CASCADE)
    is_in_stoplist = models.BooleanField(
        default=False,
        verbose_name="Is in Stop List",
        help_text="States if a product item in the Stop List"
    )

    def __str__(self) -> str:
        return self.title

    def decrease_stock(self, value) -> None:
        if self.stock:
            self.stock -= value
            if self.stock < 0:
                self.stock = 0
            self.save()

    class Meta:
        verbose_name = "Product"
        verbose_name_plural = "Products"
