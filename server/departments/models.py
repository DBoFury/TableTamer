from django.db import models


class Department(models.Model):
    title = models.CharField(
        max_length=64, unique=True,
        verbose_name="Department",
        help_text="Department name"
    )
    title_ukr = models.CharField(
        max_length=64, unique=True,
        verbose_name="Department (UKR)",
        help_text="Department name in Ukrainian"
    )
    department_url = models.URLField(
        default="",
        verbose_name="Department URL",
        help_text="URL of a department to send a receipt"
    )

    def __str__(self) -> str:
        return self.title

    class Meta:
        verbose_name = "Department"
        verbose_name_plural = "Departments"
