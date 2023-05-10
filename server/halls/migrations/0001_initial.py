# Generated by Django 4.2.1 on 2023-05-10 13:43

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Hall',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(help_text='Hall name', max_length=64, unique=True, verbose_name='Hall')),
                ('title_ukr', models.CharField(help_text='Hall name in Ukrainian', max_length=64, unique=True, verbose_name='Hall (UKR)')),
            ],
            options={
                'verbose_name': 'Hall',
                'verbose_name_plural': 'Halls',
            },
        ),
        migrations.CreateModel(
            name='Table',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('table_number', models.SmallIntegerField(help_text='Number of a table', verbose_name='Table number')),
                ('hall', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tables', to='halls.hall')),
            ],
        ),
    ]
