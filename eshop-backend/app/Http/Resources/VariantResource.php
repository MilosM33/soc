<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class VariantResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {

        $images = array();
        foreach ($this->images as $key => $value) {
            array_push($images, $value["path"]);
        }

        $rating = 0;
        if ($this->reviews->count() > 0) {
            $rating = $this->reviews->sum('rating') / $this->reviews->count();
        }

        $reviews = ReviewResource::collection($this->reviews);

        return [
            'id' => $this->id,
            'name' => $this->name,
            'price' => $this->price,
            'images' => $images,
            'rating' => $rating,
            'reviews' => $reviews,
            'attributes' => $this->attributes,
        ];
    }
}
