<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Http\Request;


class PaymentController extends Controller
{

    public function index()
    {

        $order_id = request()->input('order_id');
        $items = OrderItem::where("order_id", "=", $order_id)->get();

        $total = 0;

        foreach ($items as $item) {
            $total += $item->price * 100 * $item->quantity;
        }

        $intent = new \Stripe\StripeClient('sk_test_51LyGNUBdCoXZzWJAuAsLLgzwjsXAl5BjF8hYr8cGRrBOcRMnzNZdNZABOSYrG3FDiBgxXB3Iw3c7npA9NEEY4kFp009rDocgMi');
        $intent = $intent->paymentIntents->create([
            'amount' => $total,
            'currency' => 'usd',
            'payment_method_types' => ['card'],
            'metadata' => ['order_id' => $order_id],
        ]);



        return response()->json($intent);
    }

    public function onPaymentSuccess(Request $request)
    {
        $id = $request->input('data')['object']['metadata']['order_id'];
        $order = Order::find($id)->update(['status' => 'paid']);

        return response()->json($order);
    }
}
