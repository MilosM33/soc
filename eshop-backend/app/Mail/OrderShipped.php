<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OrderShipped extends Mailable
{
	use Queueable, SerializesModels;

	/**
	 * Create a new message instance.
	 *
	 * @return void
	 */
	private $customerName;
	private $order;
	public function __construct($customerName, $order)
	{
		$this->customerName = $customerName;
		$this->order = $order;
	}

	/**
	 * Build the message.
	 *
	 * @return $this
	 */
	public function build()
	{
		return $this->view('emails.order.shipped')->subject('Order shipped')->with([
			'order' => $this->order,
			'customerName' => $this->customerName,
		]);
	}
}
