<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OrderProcessing extends Mailable
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
		return $this->view('emails.order.processing')->subject('Order processing')->with([
			'order' => $this->order,
			'customerName' => $this->customerName,
		]);
	}
}
