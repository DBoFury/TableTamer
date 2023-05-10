def get_user_data(data):
    email = data.get("email", None)
    phone_number = data.get("phone_number", None)
    if not email and not phone_number:
        raise KeyError("At least on of the values should be provided.")
    return email, phone_number, data['password']
