<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\VariantController;
use App\Http\Controllers\AttributeController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});



Route::group(['prefix' => 'auth'], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('me', [AuthController::class, 'me']);
});

Route::apiResource('/products', ProductController::class)->except(['create', 'edit']);
Route::apiResource("products.attributes", AttributeController::class)->except(['create', 'edit']);



Route::apiResource('products.variants', VariantController::class)->except(['create', 'edit']);

Route::apiResource('products.attributes', AttributeController::class)->except(['create', 'edit']);

Route::apiResource('products.reviews', ReviewController::class);
