import json
import math
import textwrap

from flask import Flask, request

app = Flask(__name__)


@app.route("/", methods=["GET"])
def index():
    return "It Works!"


@app.route("/print-order", methods=["POST"])
def print_order():
    def _get_split_line(width=50):
        return f"\n{'-'*width}"

    def _get_empty_line(width=50, n_times=1):
        empty_lines = [""]
        for _ in range(n_times):
            empty_lines.append(f"|{' '*(width-2)}|")
        return "\n".join(empty_lines)

    def _get_order_id_line(order_id, width=50):
        return f"\n|{' '*(int(width/2)-6-int(math.floor(len(order_id)/2)))}"\
            f"Order ID: {order_id}{' '*(int(width/2)-6-int(math.ceil(len(order_id)/2)))}|"

    def _get_created_at_line(created_at, width=50):
        return f"\n|{' '*(int(width/2)-7-int(math.floor(len(created_at)/2)))}"\
            f"Created at: {created_at}{' '*(int(width/2)-7-int(math.ceil(len(created_at)/2)))}|"

    def _get_created_by_line(user, width=50):
        return f"\n|{' '*(int(width/2)-7-int(math.floor(len(user)/2)))}"\
            f"Created by: {user}{' '*(int(width/2)-7-int(math.ceil(len(user)/2)))}|"

    def _get_location_line(hall, table, is_takeaway, width=50):
        location_line = ""
        if not is_takeaway:
            location_line += f"\n|{' '*(int(width/2)-4-int(math.floor(len(hall)/2)))}Hall: {hall}"\
                f"{' '*(int(width/2)-4-int(math.ceil(len(hall)/2)))}|"
            location_line += f"\n|{' '*(int(width/2)-5-int(math.floor(len(table)/2)))}Table: {table}"\
                f"{' '*(int(width/2)-4-int(math.ceil(len(table)/2)))}|"
        else:
            location_line += f"\n|{' '*(int(width/2) - 5)}Takeaway{' '*(int(width/2) - 5)}|"
        return location_line

    def _get_products_str(products, width=50):
        products_str = ""

        products_str += f"\n|{' '*1}Products:{' '*(width - 12)}|"
        products_str += _get_split_line(width)

        total = 0

        title_column = f"Title{' '*(int(width * 0.3)-2)}"
        amount_column = f"Amount{' '*int(width * 0.1)}"
        ppu_column = f"PPU{' '*int(width * 0.1)}"
        total_column = f"Total{' '*int(width * 0.1)}"

        products_str += f"\n|{' '*1}{title_column}{amount_column}{ppu_column}{total_column}|"
        products_str += _get_empty_line(width)

        for product in products:
            wrapped_title = []

            title = product.get("title", "")
            amount = str(product.get("amount", "0"))
            price_per_unit = str(product.get("price_per_unit", "0"))
            full_price = str(product.get("full_price", "0"))
            total += float(full_price)

            if len(title) > len(title_column)-3:
                if not " " in title \
                        and any([len(word) > len(title_column) for word in title.split(" ")]):
                    title = textwrap.shorten(title, width=len(title_column))
                else:
                    title = textwrap.wrap(title, width=len(title_column)-3)
                    title, wrapped_title = title[0], title[1:]
                    print(title, wrapped_title)

            product_str = f"\n| {title}{' '*(len(title_column)-len(title)+1)}"\
                f"{' '*(len('amount')-len(amount))}{amount}"\
                f"{' '*(len('ppu')+len(amount_column)-len('amount')-len(price_per_unit))}{price_per_unit}"\
                f"{' '*(len('total')+len(ppu_column)-len('ppu')-len(full_price))}{full_price}"

            product_str += f"{' '*(width - len(product_str))}|"
            products_str += product_str

            if wrapped_title:
                for sub_title in wrapped_title:
                    products_str += f"\n| {sub_title}{' '*(width-len(sub_title)-3)}|"

        products_str += _get_empty_line(width)

        total = str(total)

        total_line = f"\n|{' '*(len(title_column)+len(amount_column)+len(ppu_column)-len(total))}Total: {total}"
        products_str += f"{total_line}{' '*(width-len(total_line))}|"

        products_str += _get_empty_line(width)
        products_str += _get_split_line(width)

        return products_str

    def _get_commentary_str(commentary, width=50):
        commentary_str = ""

        commentary_str += _get_empty_line(width)

        commentary = textwrap.wrap(commentary, width=width - 16)

        commentary_str += f"\n| Commentary: {commentary[0]}{' '*(width-len(commentary[0])-15)}|"

        for sub_commentary in commentary[1:]:
            commentary_str += f"\n| {sub_commentary}{' '*(width-len(sub_commentary)-3)}|"

        commentary_str += _get_empty_line(width)

        return commentary_str

    order_data = json.loads(request.json)

    receipt_width = 50
    receipt_str = ""

    order_id = str(order_data.get("id"))
    created_at = order_data.get("created_at")
    is_takeaway = order_data.get("is_takeaway", True)
    user = order_data.get("user", "")
    hall = order_data.get("hall", "")
    table = order_data.get("table", "")
    products = order_data.get("products", [])
    commentary = order_data.get("commentary", "")

    receipt_str += _get_split_line(receipt_width)
    receipt_str += _get_empty_line(receipt_width)

    receipt_str += _get_order_id_line(order_id, receipt_width)
    receipt_str += _get_empty_line(receipt_width)

    receipt_str += _get_created_at_line(created_at, receipt_width)
    receipt_str += _get_created_by_line(user, receipt_width)
    receipt_str += _get_location_line(hall, table, is_takeaway, receipt_width)

    receipt_str += _get_split_line(receipt_width)
    receipt_str += _get_empty_line(receipt_width)
    receipt_str += _get_products_str(products, receipt_width)

    if commentary:
        receipt_str += _get_commentary_str(commentary, receipt_width)
        receipt_str += _get_split_line(receipt_width)

    print(receipt_str)

    return receipt_str


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=80, debug=True)
