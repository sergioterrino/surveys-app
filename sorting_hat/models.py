from django.db import models


class Survey(models.Model):
    title = models.CharField(max_length=60)
    description = models.TextField(max_length=180)
    sex = models.BooleanField(null=True)
    age = models.BooleanField(null=True)
    religion = models.BooleanField(null=True)
    user = models.ForeignKey('auth.User', related_name='surveys', on_delete=models.CASCADE, null=True, blank=True)

    def __str__(self):
        return f"{self.id} - Survey {self.title}"


class Question(models.Model):
    survey = models.ForeignKey(Survey, related_name='questions', on_delete=models.CASCADE)
    text = models.TextField(max_length=150)

    class Meta:
        unique_together = ('survey', 'id')  # Ensure combination of survey and id is unique

    def __str__(self):
        return f"Question {self.id} for Survey {self.survey.id} - {self.text}"


class Answer(models.Model):
    survey = models.ForeignKey(Survey, related_name='answers', on_delete=models.CASCADE)
    user = models.ForeignKey('auth.User', related_name='answers', on_delete=models.CASCADE, null=True, blank=True)
    question1 = models.IntegerField(choices=[(i, i) for i in range(1, 11)], null=True, blank=True)
    question2 = models.IntegerField(choices=[(i, i) for i in range(1, 11)], null=True, blank=True)
    question3 = models.IntegerField(choices=[(i, i) for i in range(1, 11)], null=True, blank=True)
    question4 = models.IntegerField(choices=[(i, i) for i in range(1, 11)], null=True, blank=True)
    question5 = models.IntegerField(choices=[(i, i) for i in range(1, 11)], null=True, blank=True)
    question6 = models.IntegerField(choices=[(i, i) for i in range(1, 11)], null=True, blank=True)
    question7 = models.IntegerField(choices=[(i, i) for i in range(1, 11)], null=True, blank=True)
    question8 = models.IntegerField(choices=[(i, i) for i in range(1, 11)], null=True, blank=True)
    question9 = models.IntegerField(choices=[(i, i) for i in range(1, 11)], null=True, blank=True)
    question10 = models.IntegerField(choices=[(i, i) for i in range(1, 11)], null=True, blank=True)
    question11 = models.CharField(null=True, max_length=6) #sex [men/women]
    question12 = models.IntegerField(null=True) #age
    question13 = models.CharField(null=True, max_length=11) #religion [christian / muslim / hindu / buddhist / Other / None]]
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('survey', 'id')

    def __str__(self):
        return f"Answers for Survey {self.survey.id} by User {self.user}"