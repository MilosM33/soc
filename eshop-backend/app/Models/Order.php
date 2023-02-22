<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\Rules\Enum;

class Order extends Model
{
    use HasFactory;

    protected $table = 'orders';

    public $fillable = [
        'user_id',
        'status',
        'total_price',

    ];


    public function products()
    {
        return $this->belongsToMany(Product::class, 'orders_items', 'order_id', 'product_id')->withPivot('quantity', 'price', 'variant_id');
    }
    public function invoiceDetails()
    {
        return $this->hasOne(InvoiceDetails::class, 'order_id');
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class, 'order_id');
    }
}
