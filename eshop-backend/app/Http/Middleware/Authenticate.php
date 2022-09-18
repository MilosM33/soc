<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;

class Authenticate extends Middleware
{
    
    // return json error
    protected function unauthenticated($request, array $guards)
    {
        return response()->json(['error' => 'Unauthenticated.'], 401);
    }
    
}
