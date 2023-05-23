from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager,
                                        PermissionsMixin)
from django.core.exceptions import ValidationError
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField


class UserManager(BaseUserManager):
    def create_user(self, email=None, phone_number=None, password=None, **extra_fields):
        user = self.model(email=email, phone_number=phone_number,
                          **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email=None, phone_number=None, password=None, **extra_fields):
        user = self.create_user(email, phone_number, password, **extra_fields)
        user.is_staff = True
        user.is_superuser = True
        user.save()
        return user


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True,
                              null=True, blank=True)
    phone_number = PhoneNumberField(unique=True,
                                    null=True, blank=True)
    pin_code = models.CharField(max_length=4, unique=True)
    first_name = models.CharField(max_length=32,
                                  blank=True, default="")
    last_name = models.CharField(max_length=32,
                                 blank=True, default="")
    image = models.ImageField(upload_to='images/users/')

    date_joined = models.DateTimeField(auto_now_add=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    USERNAME_FIELD = "email"

    objects = UserManager()

    def __str__(self) -> str:
        if self.first_name and self.last_name:
            return f"{self.last_name} {self.first_name}"
        return self.email or str(self.phone_number)

    def clean(self):
        super().clean()
        if not self.email and not self.phone_number and not self.pin_code:
            raise ValidationError(
                "At least one of email or phone number must be provided."
            )
