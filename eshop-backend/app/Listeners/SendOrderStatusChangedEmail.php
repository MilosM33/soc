<?php

namespace App\Listeners;

use App\Events\OrderStatusChanged;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderStatusChangedEmail;


class SendOrderStatusChangedEmail
{
    public function handle(OrderStatusChanged $event)
    {
        $order = $event->order;
        $status = $event->status;

        Mail::to($order->customer->email)->queue(new OrderStatusChangedEmail($order, $status));
    }
}
