def get_user_data(data):
    email = data.get("email", None)
    phone_number = data.get("phone_number", None)
    pin_code = data.get("pin_code", None)
    password = data.get("password", None)
    if (email or phone_number) and not password:
        raise KeyError("Password should be provided.")
    if not email and not phone_number and not pin_code:
        raise KeyError("At least on of the values should be provided.")
    return email, phone_number, pin_code, password
