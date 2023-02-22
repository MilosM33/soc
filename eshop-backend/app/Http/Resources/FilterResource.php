<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FilterResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {

        return [
            'name' => $this[0]->name,
            'type' => $this[0]->filter_type,
            'values' => $this->map(function ($item) {
                return [
                    'id' => $item->id,
                    'value' => $item->value,

                ];
            }),


        ];
    }
}
