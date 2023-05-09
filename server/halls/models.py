from django.db import models


class Hall(models.Model):
    title = models.CharField(
        max_length=64, unique=True,
        verbose_name="Hall",
        help_text="Hall name"
    )
    title_ukr = models.CharField(
        max_length=64, unique=True,
        verbose_name="Hall (UKR)",
        help_text="Hall name in Ukrainian"
    )

    def __str__(self) -> str:
        return self.title

    class Meta:
        verbose_name = "Hall"
        verbose_name_plural = "Halls"


class Table(models.Model):
    table_number = models.SmallIntegerField(
        verbose_name="Table number",
        help_text="Number of a table"
    )

    hall = models.ForeignKey(Hall, related_name="tables",
                             on_delete=models.CASCADE)
