<!DOCTYPE html>
<html>
<head>
    <title>Order Created</title>
</head>
<body>
    <h1>Order Created</h1>
    <p>
        Dear {{$customerName}},
    </p>
    <p>
        Thank you for your purchase! Your order #{{ $order->id }} has been created successfully.
    </p>
    @if (Auth::check())
    <p>
        You can check your order details by logging into your account or by clicking the following link:
        <a href="http://everydayessentials.tech/orders/{{ $order->id }}">View Order</a>
    </p>
    @endif
    <p>
        We will keep you updated on the status of your order.
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