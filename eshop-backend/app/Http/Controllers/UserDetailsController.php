<?php

namespace App\Http\Controllers;

use App\Models\UserDetails;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserDetailsController extends Controller
{

    public function update(Request $request)
    {
        if (!Auth::check()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        $request->validate([
            'full_name' => 'nullable|string|max:255',
            'email' => 'nullable|string|email|max:255',
            'phone' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'city' => 'nullable|string|max:255',
            'zip_code' => 'nullable|string|max:255',
            'state' => 'nullable|string|max:255',
            'appartment' => 'nullable|string|max:255',
            'delivery_method' => 'nullable|string|max:255',
        ]);

        $user = Auth::user();
        if ($user->UserDetails) {
            $user->UserDetails->update(
                array(
                    'full_name' => $request->firstName . ' ' . $request->lastName,
                    'email' => $request->email,
                    'phone' => $request->phone,
                    'address' => $request->address,
                    'city' => $request->city,
                    'zip_code' => $request->zip_code,
                    'state' => $request->state,
                    'appartment' => $request->appartment,
                    'delivery_method' => $request->delivery_method,
                )
            );
        } else {
            $user->UserDetails()->create(
                array(
                    'full_name' => $request->firstName . ' ' . $request->lastName,
                    'email' => $request->email,
                    'phone' => $request->phone,
                    'address' => $request->address,
                    'city' => $request->city,
                    'zip_code' => $request->zip_code,
                    'state' => $request->state,
                    'appartment' => $request->appartment,
                    'delivery_method' => $request->delivery_method,
                )
            );
        }



        return response()->json([
            'status' => 'success',
            'message' => 'User details updated',
        ]);
    }


    public function index()
    {
        if (!Auth::check()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = Auth::user();

        return response()->json(
            $user->UserDetails
        );
    }
}
