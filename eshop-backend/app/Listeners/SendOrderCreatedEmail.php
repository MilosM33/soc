<?php

namespace App\Listeners;

use App\Events\OrderCreated;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderCreatedEmail;


class SendOrderCreatedEmail
{

    public function handle(OrderCreated $event)
    {
        $order = $event->order;
        Mail::to($order->customer->email)->queue(new OrderCreatedEmail($order));
    }
}
