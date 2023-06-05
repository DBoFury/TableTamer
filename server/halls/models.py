from django.db import models


class Hall(models.Model):
    title = models.CharField(
        max_length=64, unique=True,
        verbose_name="Hall",
        help_text="Hall name"
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

    def __str__(self) -> str:
        return f"{self.hall}, Table {self.table_number}"

    @property
    def title(self) -> str:
        return f"Table {self.table_number}"
