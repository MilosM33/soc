<!DOCTYPE html>
<html>
<head>
    <title>Order Status Changed</title>
</head>
<body>
    <h1>Order Status Changed</h1>
    <p>
        Dear {{ $order->customer->name }},
    </p>
    <p>
        Your order #{{ $order->id }} has had its status changed to {{ $status }}.
    </p>
    <p>
        You can check your order status by logging into your account or by clicking the following link:
        <a href="{{ route('orders.show', $order->id) }}">View Order</a>
    </p>
    <p>
        Thank you for your business!
    </p>
    <p>
        Best Regards,
    </p>
    <p>
        Your Store Team
    </p>
</body>
</html>