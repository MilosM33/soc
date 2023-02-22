<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OrderCreatedEmail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */

    public $order;
    public $invoice;
    public $customerName;

    public function __construct($order, $customerName, $invoice)
    {
        $this->order = $order;
        $this->customerName = $customerName;
        $this->invoice = $invoice;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.order.created')
            ->subject('Order created')
            ->with([
                'order' => $this->order,
                'customerName' => $this->customerName,
            ])->attachData($this->invoice, 'invoice.pdf', [
                'mime' => 'application/pdf',
            ]);
    }
}
