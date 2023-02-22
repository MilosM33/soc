<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use App\Models\Order;

class OrderStatusChanged
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    public $order;
    public $status;
    public function __construct(Order $order, $status)
    {
        $this->order = $order;
        $this->status = $status;
    }
}
