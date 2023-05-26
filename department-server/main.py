from flask import Flask, request

app = Flask(__name__)


@app.route('/', methods=['GET'])
def index():
    return "It Works!"


@app.route('/print-order', methods=['POST'])
def print_order():
    order = request.get_json()

    order_id = order.get('id')
    products = order.get('products', [])
    commentary = order.get('commentary', '')

    print(" " * 50 + f"Order ID: {order_id}")

    for product in products:
        title = product.get('title', '')
        amount = product.get('amount', 0)
        print(f"{title:50} {amount}")

    print()
    print(f"Comment: {commentary}")

    return 'Order printed successfully'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)
