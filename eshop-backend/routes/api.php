<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\UserDetailsController;
use App\Http\Controllers\NewsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;

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

Route::get('/categories', [CategoryController::class, 'indexCategories']);
Route::get('/categories/{category}', [CategoryController::class, 'subCategoryByCategorySlug']);
Route::get('/navbar-categories', [CategoryController::class, 'navbarCategories']);


Route::apiResource('/products', ProductController::class)->except(['create', 'edit']);
Route::post('/reviews/create', [ReviewController::class, 'store']);
Route::post('/reviews/edit', [ReviewController::class, 'update']);

Route::resource("/blog", NewsController::class)->except(['create', 'edit']);

Route::get('/products/search/{query}', [ProductController::class, 'search']);
Route::get('/products/{product}/searchvariants/{variant?}', [ProductController::class, 'searchVariant']);
Route::get('/products/related/{slug}', [ProductController::class, 'get_related_products']);

Route::post('/filters', [ProductController::class, 'getFilters']);

Route::group(['prefix' => 'auth'], function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('register', [AuthController::class, 'register']);
    Route::post('logout', [AuthController::class, 'logout']);
    Route::post('refresh', [AuthController::class, 'refresh']);
    Route::get('me', [AuthController::class, 'me']);
});

Route::post("/auth/verify", [AuthController::class, 'verify']);
Route::post("/auth/change-login", [AuthController::class, 'changeLogin']);

Route::post("/auth/set-details", [UserDetailsController::class, 'update']);
Route::get("/auth/get-details", [UserDetailsController::class, 'index']);


Route::post("/order/create", [OrderController::class, 'create']);
Route::get("/orders/get", [OrderController::class, 'getOrders']);
Route::get("/orders/{orderNumber}", [OrderController::class, 'getOrderInfo']);

// admin
Route::get("/admin/orders/getitems/{orderNumber}", [OrderController::class, 'getOrderItems']);
Route::post("/admin/orders/removeitem", [OrderController::class, 'removeOrderItem']);
Route::post("/admin/orders/update", [OrderController::class, 'updateOrder']);


Route::get("/track-order/{orderNumber}", [OrderController::class, 'trackOrder']);

Route::get("/invoice/{orderNumber}", [OrderController::class, 'downloadInvoice']);

Route::post("/payment/secret", [PaymentController::class, 'index']);
Route::post("/payment/success", [PaymentController::class, 'onPaymentSuccess']);


// admin
Route::group(['middleware' => ['checkRole:admin']], function () {

    Route::get("/admin/users/search", [AuthController::class, 'searchUsers']);
    Route::post("/admin/users/delete", [AuthController::class, 'deleteUser']);
    Route::post("/admin/users/update", [AuthController::class, 'updateUser']);
    Route::post("/admin/users/create", [AuthController::class, 'createUser']);


    Route::get("/admin/orders/search", [OrderController::class, 'searchOrders']);


    Route::get("/admin/categories/search/", [CategoryController::class, 'searchCategories']);
    Route::post("/admin/categories/create", [CategoryController::class, 'createCategory']);
    Route::post("/admin/categories/update", [CategoryController::class, 'updateCategory']);
    Route::post("/admin/categories/delete", [CategoryController::class, 'deleteCategory']);
});
