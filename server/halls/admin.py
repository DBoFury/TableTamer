from django.contrib import admin
from .models import Hall, Table


class TableTabular(admin.TabularInline):
    model = Table

    def get_extra(self, request, obj=None, **kwargs) -> int:
        return 1


class HallAdmin(admin.ModelAdmin):
    inlines = [
        TableTabular,
    ]


admin.site.register(Hall, HallAdmin)
