# Generated by Django 4.2.1 on 2023-05-23 14:48

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now=True, help_text='Date and time of Order creation')),
                ('is_fulfilled', models.BooleanField(default=False, help_text='Is Order finished and client got his products', verbose_name='Fulfilled')),
                ('is_paid', models.BooleanField(default=False, help_text='Is Order has been paid', verbose_name='Paid')),
                ('is_takeaway', models.BooleanField(help_text='Is Order been taken as a takeaway', verbose_name='Takeaway')),
                ('commentary', models.TextField(help_text='Commentary to an Order', verbose_name='Commentary')),
            ],
        ),
        migrations.CreateModel(
            name='OrderItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.SmallIntegerField(help_text='Amount of product ordered')),
            ],
        ),
        migrations.CreateModel(
            name='SelectedAttribute',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
    ]
