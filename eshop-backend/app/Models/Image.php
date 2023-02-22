<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;
    protected $table = 'images';
    public $timestamps = false;
    protected $hidden = ['pivot'];

    public function variants()
    {
        return $this->morphedByMany(ProductVariant::class, 'imageable');
    }
}
