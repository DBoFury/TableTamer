from django.contrib import admin
from nested_inline.admin import NestedModelAdmin, NestedStackedInline

from .models import Order, OrderItem


class OrderItemInline(NestedStackedInline):
    model = OrderItem
    extra = 1


class OrderAdmin(NestedModelAdmin):
    inlines = [OrderItemInline]

    list_display = ("created_at", "table",
                    "is_takeaway", "full_price", "user",)
    readonly_fields = ("full_price", "submission", )

    def full_price(self, obj):
        return obj.full_price

    def submission(self, obj):
        return obj.submission


admin.site.register(OrderItem)
admin.site.register(Order, OrderAdmin)
