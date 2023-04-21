<!DOCTYPE html>
<html>
<head>
    <title>Order Changed</title>
</head>
<body>
    <h1>Order Changed</h1>
    <p>
        Dear {{$customerName}},
    </p>
    <p>
        We are writing to inform you that your order #{{ $order->id }} has been changed.

    </p>
	<p>
		Please review the order details on your account page.
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