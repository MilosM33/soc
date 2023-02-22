<!DOCTYPE html>
<html>
<head>
    <title>Invoice</title>
    <style>
        /* Add some styles for the invoice layout */
        body {
            font-family: Arial, sans-serif;
            margin: 0;
        }
        .invoice-header {
            background-color: #f5f5f5;
            padding: 10px;
        }
        .invoice-header h1 {
            margin: 0;
        }
        .invoice-header p {
            margin: 0;
            font-size: 12px;
        }
        .invoice-body {
            padding: 20px;
        }
        .invoice-body table {
            width: 100%;
            border-collapse: collapse;
        }
        .invoice-body th, .invoice-body td {
            border: 1px solid #ddd;
            padding: 8px;
        }
        .invoice-body th {
            text-align: left;
        }
        .invoice-body .total {
            text-align: right;
        }
    </style>
</head>
<body>
    <div class="invoice-header">
        <h1>Invoice</h1>
        <p>Invoice Number: {{ $order->id }}</p>
        <p>Date: {{ $order->created_at->format('d-m-Y') }}</p>
    </div>
    <div class="invoice-body">
        <h2>Customer Information</h2>
        <p>Full name: {{ $shippingForm["firstName"] . " " . $shippingForm["lastName"] }}</p>
        <p>Email: {{ $shippingForm["email"] }}</p>
        <p>Phone: {{ $shippingForm["phone"] }}</p>
        <p>Address: {{ $shippingForm["address"] }}</p>
        <p>City: {{ $shippingForm["city"] }}</p>
        <p>Appartment: {{ $shippingForm["appartment"] }}</p>
        <p>Zip: {{ $shippingForm["zip"] }}</p>
        <p>State: {{ $shippingForm["state"] }}</p>
        <p>Delivery Method: {{ $shippingForm["deliveryMethod"] }}</p>


        <h2>Order Information</h2>
        <table>
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Variation</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                @foreach($items as $item)
                <tr>
                    <td>{{ $item->name }}</td>
                    <td>{{ $item->variant_name }}</td>
                    <td>{{ $item->quantity }}</td>
                    <td>{{ $item->price }}</td>
                </tr>
                @endforeach
                <tr>
                    <td colspan="2" class="total">Total</td>
                    <td class="total">
                        {{ $order->total_price }}
                    </td>
                    <td></td>
                    </tr>
            </tbody>
               
                
               
        </table>
    </div>
                
</body>
</html>