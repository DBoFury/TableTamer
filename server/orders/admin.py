from django.contrib import admin
from nested_inline.admin import NestedModelAdmin, NestedStackedInline

from .models import Order, OrderItem


# TODO: only attributes that are not selected
class SelectedAttributeInline(NestedStackedInline):
    model = OrderItem.attribute_values.through
    extra = 1


class OrderItemInline(NestedStackedInline):
    model = OrderItem
    extra = 1
    inlines = [SelectedAttributeInline]


class OrderAdmin(NestedModelAdmin):
    inlines = [OrderItemInline]

    list_display = ("created_at", "is_fulfilled", "is_paid",
                    "is_takeaway", "full_price", )
    readonly_fields = ("full_price",)

    def full_price(self, obj):
        return obj.full_price


admin.site.register(Order, OrderAdmin)
