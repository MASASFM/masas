# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-03-13 16:55
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MASAS', '0004_add_like_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='song',
            name='SC_ID',
            field=models.IntegerField(unique=True),
        ),
    ]