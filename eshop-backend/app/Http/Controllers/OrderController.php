<?php

namespace App\Http\Controllers;

use App\Models\InvoiceDetails;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderState;
use App\Models\OrderStatus;
use Illuminate\Support\Facades\Auth;
use App\Models\ProductVariant;
use Dompdf\Dompdf;
use Illuminate\Support\Facades\Mail;

class OrderController extends Controller
{
    public function create(Request $request)
    {
        $order = new Order();
        $order->user_id = auth()->id() ?? null;

        $order->status = 'pending';
        $order->created_at = date('Y-m-d H:i:s');
        $order->save();

        $totalPrice = 0;
        foreach ($request->input('items') as $cartItem) {
            $orderItem = new OrderItem();
            $orderItem->order_id = $order->id;

            $variant = ProductVariant::where('name', $cartItem['variant_name'])->first();
            $product = $variant->product;

            $orderItem->variant_id = $variant->id;
            $orderItem->quantity = $cartItem['quantity'];
            $orderItem->price = $variant['price'];
            $orderItem->name = $product['title'];
            $orderItem->variant_name = $variant['name'];

            $totalPrice += $variant['price'] * $cartItem['quantity'];

            $orderItem->save();
        }
        $order->total_price = $totalPrice;
        $order->update();

        $email = Auth::user()->email ?? $request->input('shippingForm')['email'];

        $shippingForm = $request->input('shippingForm');
        $invoice = $this->generateInvoice($order->id, $shippingForm);

        $invoiceDetails = new InvoiceDetails();
        $invoiceDetails->order_id = $order->id;
        $invoiceDetails->full_name = $shippingForm['firstName'] . ' ' . $shippingForm['lastName'];
        $invoiceDetails->address = $shippingForm['address'];
        $invoiceDetails->city = $shippingForm['city'];
        $invoiceDetails->zip_code = $shippingForm['zip'];
        $invoiceDetails->state = $shippingForm['state'];
        $invoiceDetails->appartment = $shippingForm['appartment'];
        $invoiceDetails->phone = $shippingForm['phone'];
        $invoiceDetails->email = $email;
        $invoiceDetails->delivery_method = $shippingForm['deliveryMethod'];
        $invoiceDetails->save();


        $customerName = Auth::user()->name ?? $request->input('shippingForm')['firstName'];



        Mail::to($email)->queue(new \App\Mail\OrderCreatedEmail($order, null, $customerName), function ($message) use ($invoice) {
            $message->attachData($invoice, 'invoice.pdf');
        });
        return response()->json($order);
    }

    public function trackOrder($orderNumber)
    {
        $order = Order::where('id', $orderNumber)->first();
        $orderStatus = OrderStatus::where('order_id', $orderNumber)->get();


        $step = -1;
        if ($order->status == 'pending') {
            $step = 0;
        } else if ($order->status == 'processing') {
            $step = 1;
        } else if ($order->status == 'shipped') {
            $step = 2;
        } else if ($order->status == 'delivered') {
            $step = 3;
        }


        return response()->json(
            [
                'order' => array(
                    'status' => $order->status,
                    'steps' => $step,
                    'orderNumber' => $order->id,

                ),
                'timeline' => $orderStatus,

            ]
        );
    }

    public function getOrders()
    {
        if (Auth::user()) {
            $orders = Order::where('user_id', Auth::user()->id)->get();
            return response()->json($orders);
        } else {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
    }

    public function getOrderInfo($id)
    {
        $order = Order::findOrFail($id);

        if ($order->user_id != Auth::user()->id) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $orderItems = $order->items;
        $items = [];
        foreach ($orderItems as $item) {

            $items[] = ProductVariant::where('id', $item->variant_id)->first()->load('images');
        }

        $invoiceDetails = InvoiceDetails::where('order_id', $id)->first();

        return response()->json(['order' => $order, 'items' => $items, 'invoiceDetails' => $invoiceDetails]);
    }

    public function generateInvoice($id, $shippingForm = null)
    {
        $order = Order::findOrFail($id);
        $items = $order->items;
        $pdf = new Dompdf();
        $pdf->loadHtml(view('pdfs.orders.invoice', compact('order', 'items', 'shippingForm'))->render());
        $pdf->setPaper('A4', 'portrait');
        $pdf->render();
        return $pdf->output();
    }

    public function downloadInvoice($id)
    {
        $order = Order::findOrFail($id);
        $items = $order->items;
        $shippingForm = $order->invoiceDetails;

        $shippingForm = array(
            'firstName' => explode(' ', $shippingForm->full_name)[0],
            'lastName' => explode(' ', $shippingForm->full_name)[1] ?? "",
            'email' => $shippingForm->email,
            'phone' => $shippingForm->phone,
            'address' => $shippingForm->address,
            'city' => $shippingForm->city,
            'zip' => $shippingForm->zip_code,
            'state' => $shippingForm->state,
            'appartment' => $shippingForm->appartment,
            'deliveryMethod' => $shippingForm->delivery_method,
        );


        $pdf = new Dompdf();
        $pdf->loadHtml(view('pdfs.orders.invoice', compact('order', 'items', 'shippingForm'))->render());
        $pdf->setPaper('A4', 'portrait');
        $pdf->render();
        return $pdf->stream("dompdf_out.pdf", array("Attachment" => false));
    }

    public function searchOrders(Request $request)
    {
        $orders = Order::query();

        if ($request->has('status') && $request->input('status') != '') {
            $orders->where('status', 'like', '%' .  $request->input('status') .  '%');
        }
        if ($request->has('total_price') && $request->input('total_price') != '') {
            $orders->where('total_price', $request->input('total_price'));
        }
        if ($request->has('created_at') && $request->input('created_at') != '') {
            $orders->where('created_at', $request->input('created_at'));
        }

        return response()->json($orders->paginate($request->show, ['*'], 'page', $request->page));
    }


    public function getOrderItems($id)
    {
        $order = Order::findOrFail($id);
        $orderItems = $order->items;


        return response()->json($orderItems);
    }

    public function removeOrderItem()
    {
        $variant_name = request()->input('variant_name');
        $order_id = request()->input('order_id');

        $orderItem = OrderItem::where('variant_name', $variant_name)->where('order_id', $order_id)->first();

        if ($orderItem) {
            $orderItem->delete();
        }
    }

    public function updateOrder()
    {
        $items = request()->input('items');
        $order_id = request()->input('order_id');
        $status = request()->input('status');

        Order::where('id', $order_id)->update(['status' => $status]);

        foreach ($items as $item) {
            $orderItem = OrderItem::find($item['id'] ?? 0);

            if ($orderItem) {

                $orderItem->update(
                    [
                        'quantity' => $item['quantity'],
                        'name' => $item['name'],
                        'price' => $item['price'],
                        'variant_name' => $item['variant_name'],
                        'variant_id' => $item['variant_id'],
                    ]
                );
            } else {
                $orderItem = new OrderItem();
                $orderItem->order_id = $order_id;
                $orderItem->quantity = $item['quantity'];
                $orderItem->name = $item['name'];
                $orderItem->price = $item['price'];
                $orderItem->variant_name = $item['variant_name'];
                $orderItem->variant_id = $item['variant_id'];
                $orderItem->save();
            }
        }
    }
}
