<?php

use App\Http\Controllers\AttributeController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ImageUpload;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\UserDetailsController;
use App\Http\Controllers\NewsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;
use App\Mail\SendMail;
use App\Mail\OrderCreatedEmail;
use App\Models\Order;
use App\Http\Controllers\OrdersController;

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



// admin



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


	Route::get("/admin/categories/search/", [CategoryController::class, 'searchCategories']);
	Route::post("/admin/categories/create", [CategoryController::class, 'createCategory']);
	Route::post("/admin/categories/update", [CategoryController::class, 'updateCategory']);
	Route::post("/admin/categories/delete", [CategoryController::class, 'deleteCategory']);


	Route::get("/admin/products/filter", [ProductController::class, 'filterProducts']);

	Route::get("/products/{slug}/variants", [ProductController::class, 'getVariants']);
	Route::post("/admin/products/deletevariant", [ProductController::class, 'deleteVariant']);

	Route::post("/admin/products/delete/{slug}", [ProductController::class, 'deleteProduct']);

	Route::post("/admin/products/uploadimages", [ProductController::class, 'uploadImages']);
	Route::post("/admin/products/deleteimage", [ProductController::class, 'deleteImage']);

	Route::post("/admin/products/update", [ProductController::class, 'updateProduct']);

	Route::post("/admin/products/generateslug", [ProductController::class, 'generateSlug']);

	Route::post("/admin/products/deletesimilar", [ProductController::class, 'deleteSimilar']);


	Route::post("/admin/products/category", [ProductController::class, 'deleteCategory']);
	Route::post("/admin/products/create", [ProductController::class, 'createProduct']);



	Route::post('/admin/uploadfile', [ImageUpload::class, 'uploadFile']);


	Route::get("/admin/blog/search", [NewsController::class, 'filter']);

	Route::post("/admin/blog/remove", [NewsController::class, 'remove']);
	Route::post("/admin/blog/update", [NewsController::class, 'update']);
	Route::post("/admin/blog/create", [NewsController::class, 'store']);
});

Route::get("/attributes/search/", [AttributeController::class, 'searchAttributes']);
Route::post("/attributes/remove", [AttributeController::class, 'removeAttribute']);

Route::post("/attributes/delete", [AttributeController::class, 'deleteAttribute']);

Route::get("/attributes/filter", [AttributeController::class, 'filterAttributes']);


Route::post("attributes/type/create", [AttributeController::class, 'createAttributeType']);
Route::get("/attributes/types/filter", [AttributeController::class, 'filterAttributeTypes']);

Route::post("attributes/value/create", [AttributeController::class, 'createAttributeValue']);

Route::get("/attributes/values/filter", [AttributeController::class, 'filterAttributeValues']);

Route::post("/attributes/create", [AttributeController::class, 'createAttributes']);

Route::get("/filters/search", [AttributeController::class, 'searchFilters']);

Route::post("/order/create", [OrderController::class, 'create']);
Route::get("/orders/get", [OrderController::class, 'getOrders']);
Route::get("/orders/{orderNumber}", [OrderController::class, 'getOrderInfo']);

Route::group(['middleware' => ['adminOrWarehouse']], function () {
	Route::get("/admin/orders/getitems/{orderNumber}", [OrderController::class, 'getOrderItems']);
	Route::post("/admin/orders/removeitem", [OrderController::class, 'removeOrderItem']);
	Route::post("/admin/orders/update", [OrderController::class, 'updateOrder']);
	Route::get("/admin/orders/search", [OrderController::class, 'searchOrders']);
});
