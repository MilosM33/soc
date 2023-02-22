<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ReviewResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $isAuthor = false;

        if (auth()->user()) {
            $isAuthor = $this->user->id == auth()->user()->id ? true : false;
        }


        return [
            'id' => $this->id,
            'rating' => $this->rating,
            'comment' => $this->comment,
            'user' => [
                'name' => $this->user->name,
                'email' => $this->user->email,
                'is_author' => $isAuthor,
            ],
            'created_at' => $this->created_at
        ];
    }
}
