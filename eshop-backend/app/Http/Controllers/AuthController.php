<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'register', 'refresh']]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);
        $credentials = $request->only('email', 'password');

        $token = Auth::attempt($credentials);
        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = Auth::user();
        return response()->json([
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
                'expires_in' =>  Auth::factory()->getTTL() * 60,
            ]
        ]);
    }

    public function register(Request $request)
    {
        $request->validate([
            'firstName' => 'required|string|max:255',
            'lastName' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',

        ]);

        $user = User::create([
            'name' => $request->firstName . ' ' . $request->lastName,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'verification_token' => Str::random(40),
        ]);

        $token = Auth::login($user);

        Mail::to($user->email)->queue(new \App\Mail\UserRegistred($user));

        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'user' => $user,
            'authorisation' => [
                'token' => $token,
                'type' => 'bearer',
            ],

        ]);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function verify(Request $request)
    {
        $token = $request->token;
        $user = User::where('verification_token', $token)->first();
        if ($user) {
            $user->verification_token = null;
            $user->email_verified_at = now();
            $user->save();
            return response()->json([
                'status' => 'success',
                'message' => 'User verified successfully',
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found',
            ], 404);
        }
    }
    public function changeLogin(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6',
        ]);
        $user = Auth::user();

        if ($user == null) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }
        $userModel = User::where('email', $user->email)->first();

        $userModel->update(
            [
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]
        );



        return response()->json([
            'status' => 'success',
            'message' => 'User email changed successfully',
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'user' => Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }

    public function me()
    {
        if (Auth::check()) {
            return response()->json([
                'user' => Auth::user(),
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }
    }

    public function searchUsers(Request $request)
    {
        // request contains name, email, role,created_at if value is set filter by it
        $users = User::query();
        if ($request->has('name') && $request->name != '') {
            $users->where('name', 'like', '%' . $request->name . '%');
        }
        if ($request->has('email') && $request->email != '') {
            $users->where('email', 'like', '%' . $request->email . '%');
        }
        if ($request->has('role') && $request->role != '') {
            $users->where('role', $request->role);
        }
        if ($request->has('verified_at') && $request->created_at != '') {
            $users->where('email_verified_at', 'like', '%' . $request->created_at . '%');
        }


        return response()->json(
            $users->paginate($request->show, ['*'], 'page', $request->page)
        );
    }

    public function deleteUser(Request $request)
    {
        $id = $request->id;
        $user = User::where('id', $id)->first();
        if ($user) {
            $user->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'User deleted successfully',
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found',
            ]);
        }
    }
    public function updateUser(Request $request)
    {
        $id = $request->id;
        $user = User::where('id', $id)->first();
        if ($user) {
            $user->name = $request->name;
            $user->email = $request->email;
            $user->role = $request->role;

            if ($request->password != '') {
                $user->password = Hash::make($request->password);
            }
            $user->save();
            return response()->json([
                'status' => 'success',
                'message' => 'User updated successfully',
            ]);
        } else {
            return response()->json([
                'status' => 'error',
                'message' => 'User not found',
            ]);
        }
    }

    public function createUser(Request $request)
    {

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        Mail::to($user->email)->queue(new \App\Mail\UserRegistred($user));

        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'user' => $user,
        ]);
    }
}
