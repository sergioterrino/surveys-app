# Generated by Django 5.0.7 on 2024-08-15 09:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("sorting_hat", "0002_alter_answer_unique_together_remove_answer_question"),
    ]

    operations = [
        migrations.RenameField(
            model_name="answer",
            old_name="result1",
            new_name="question1",
        ),
        migrations.RenameField(
            model_name="answer",
            old_name="result10",
            new_name="question10",
        ),
        migrations.RenameField(
            model_name="answer",
            old_name="result2",
            new_name="question2",
        ),
        migrations.RenameField(
            model_name="answer",
            old_name="result3",
            new_name="question3",
        ),
        migrations.RenameField(
            model_name="answer",
            old_name="result4",
            new_name="question4",
        ),
        migrations.RenameField(
            model_name="answer",
            old_name="result5",
            new_name="question5",
        ),
        migrations.RenameField(
            model_name="answer",
            old_name="result6",
            new_name="question6",
        ),
        migrations.RenameField(
            model_name="answer",
            old_name="result7",
            new_name="question7",
        ),
        migrations.RenameField(
            model_name="answer",
            old_name="result8",
            new_name="question8",
        ),
        migrations.RenameField(
            model_name="answer",
            old_name="result9",
            new_name="question9",
        ),
    ]
