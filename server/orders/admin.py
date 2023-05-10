from django.contrib import admin

from .models import Order, OrderItem, SelectedAttribute


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 1


class OrderAdmin(admin.ModelAdmin):
    inlines = [OrderItemInline]

    list_display = ("created_at", "is_fulfilled", "is_paid",
                    "is_takeaway", "full_price", )
    readonly_fields = ("full_price",)

    def full_price(self, obj):
        return obj.full_price


admin.site.register(Order, OrderAdmin)
