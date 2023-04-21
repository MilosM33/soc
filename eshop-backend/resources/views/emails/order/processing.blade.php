<!DOCTYPE html>
<html>
<head>
    <title>Order Processed</title>
</head>
<body>
    <h1>Order Processed</h1>
    <p>
        Dear {{$customerName}},
    </p>
    <p>
        We are writing to inform you that your order #{{ $order->id }} has been processed.
    </p>
	<p>
		Please give us a few days to deliver your order.
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