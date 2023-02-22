<p>Dear {{ $user["name"] }},</p>

<p>We are writing to confirm that we have received payment for your recent order.</p>

<p>Order Details:</p>

<table style="border: solid 2px black">
    <tr>
        <td>Order Number:</td>
        <td>{{ $order->id }}</td>
    </tr>
    <tr>
        <td>Order Date:</td>
        <td>{{ $order->created_at->format('M j, Y') }}</td>
    </tr>
    <tr>
        <td>Order Total:</td>
        <td>{{ $order->total_price }} €</td>
    </tr>
</table>

<p>Thank you for your business, and please don't hesitate to contact us with any questions or concerns.</p>

<p>Best regards,</p>