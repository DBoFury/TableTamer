from flask import Flask, request
import json

app = Flask(__name__)


@app.route("/", methods=["GET"])
def index():
    return "It Works!"


@app.route("/print-order", methods=["POST"])
def print_order():
    def _print_empty_line(n_times=1):
        for _ in range(n_times):
            print(f"|{' '*48}|")

    order_data = json.loads(request.json)

    order_id = order_data.get("id")
    created_at = order_data.get("created_at")
    is_takeaway = order_data.get("is_takeaway", True)
    user = order_data.get("user", "")
    hall = order_data.get("hall", "")
    table = order_data.get("table", "")
    products = order_data.get("products", [])
    commentary = order_data.get("commentary", "")

    print("-"*50)
    _print_empty_line()
    print(f"|{' '*18}Order ID: {order_id}{' '*18}|")
    _print_empty_line()
    print(f"|{' '*10}Created at: {created_at}{' '*9}|")
    print(f"|{' '*10}Created by: {user}{' '*(26-len(user))}|")
    if not is_takeaway:
        print(f"|{' '*10}Hall: {hall}{' '*9}|")
        print(f"|{' '*10}Table: {table}{' '*9}|")
    else:
        print(f"|{' '*20}Takeaway{' '*20}|")
    print("-"*50)
    _print_empty_line()
    print(f"|{' '*1}Products:{' '*38}|")
    print("-"*50)
    _print_empty_line()

    total = 0

    print(f"|{' '*1}Title{' '*15}Amount{' '*5}PPU{' '*3}Total{' '*5}|")
    _print_empty_line()

    for product in products:
        title = product.get("title", "")
        amount = str(product.get("amount", "0"))
        price_per_unit = str(product.get("price_per_unit", "0"))
        full_price = str(product.get("full_price", "0"))
        total += float(full_price)
        product_str = f"| {title}{' '*(26-len(title)-len(amount))}{amount}"\
            f"{' '*(9-len(amount)-len(price_per_unit))}"\
            f"{price_per_unit}{' '*(11-len(price_per_unit)-len(full_price))}{full_price}"
        print(f"{product_str}{' '*(49-len(product_str))}|")

    total_str = f"|{' '*33}Total: {total}"

    _print_empty_line()
    print(f"{total_str}{' '*(49-len(total_str))}|")
    _print_empty_line()
    print("-"*50)
    _print_empty_line()
    if commentary:
        print(f"|{' '*1}Comment: {commentary}{' '*(38-len(commentary))}|")
    _print_empty_line()
    print("-"*50)

    return "Order printed successfully"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80, debug=True)
