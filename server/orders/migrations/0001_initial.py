# Generated by Django 4.2.1 on 2023-05-28 11:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('halls', '0001_initial'),
        ('products', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now=True, help_text='Date and time of Order creation')),
                ('commentary', models.TextField(blank=True, help_text='Commentary to an Order', verbose_name='Commentary')),
                ('paid_amount', models.IntegerField(help_text='Amount of money client paid', verbose_name='Paid Amount')),
                ('is_takeaway', models.BooleanField(help_text='Is Order been taken as a takeaway', verbose_name='Takeaway')),
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
                ('attribute_value', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.attributevalue')),
                ('order_item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='selected_attributes', to='orders.orderitem')),
            ],
        ),
        migrations.AddField(
            model_name='orderitem',
            name='attribute_values',
            field=models.ManyToManyField(through='orders.SelectedAttribute', to='products.attributevalue'),
        ),
        migrations.AddField(
            model_name='orderitem',
            name='order',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='order_items', to='orders.order'),
        ),
        migrations.AddField(
            model_name='orderitem',
            name='product',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='products.product'),
        ),
        migrations.AddField(
            model_name='order',
            name='products',
            field=models.ManyToManyField(through='orders.OrderItem', to='products.product'),
        ),
        migrations.AddField(
            model_name='order',
            name='table',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='halls.table'),
        ),
        migrations.AddField(
            model_name='order',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
