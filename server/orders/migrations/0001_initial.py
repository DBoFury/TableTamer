# Generated by Django 4.2.1 on 2023-05-10 15:19

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('products', '0001_initial'),
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
                ('order_item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='orders.orderitem')),
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
    ]
