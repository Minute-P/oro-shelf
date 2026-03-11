from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120, unique=True)),
                ('description', models.TextField(blank=True)),
            ],
        ),
        migrations.CreateModel(
            name='ShelfInspection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('checked_at', models.DateTimeField(auto_now_add=True)),
                ('total_products', models.PositiveIntegerField()),
                ('empty_slots', models.PositiveIntegerField()),
                ('displayed_products', models.JSONField(default=list)),
                ('remaining_stock', models.PositiveIntegerField(blank=True, null=True)),
                ('ai_summary', models.TextField(blank=True)),
            ],
            options={'ordering': ['-checked_at']},
        ),
        migrations.CreateModel(
            name='ProductReference',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('details', models.TextField(blank=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='product_references/')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='references', to='inventory.category')),
            ],
        ),
    ]
