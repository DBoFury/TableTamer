from django.contrib import admin
from .models import Category, Product, Attribute, AttributeValue


class ProductAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("title",)}


admin.site.register(Category)
admin.site.register(Product, ProductAdmin)
admin.site.register(Attribute)
admin.site.register(AttributeValue)
