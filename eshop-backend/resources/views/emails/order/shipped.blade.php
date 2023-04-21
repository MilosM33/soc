<!DOCTYPE html>
<html>
<head>
    <title>Order Shipped</title>
</head>
<body>
    <h1>Order Processed</h1>
    <p>
        Dear {{$customerName}},
    </p>
    <p>
        Hurray, We are writing to inform you that your order #{{ $order->id }} has been shipped.
    </p>
	<p>
		Enjoy your product and please give us a review.
	</p>
    @if (Auth::check())
    <p>
        You can check your order details by logging into your account or by clicking the following link:
        <a href="http://everydayessentials.tech/orders/{{ $order->id }}">View Order</a>
    </p>
    @endif

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