<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class AdminOrWarehouse
{
	/**
	 * Handle an incoming request.
	 *
	 * @param  \Illuminate\Http\Request  $request
	 * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
	 * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
	 */
	public function handle(Request $request, Closure $next)
	{

		if (!auth()->user()->hasRole('admin') && !auth()->user()->hasRole('warehouseworker')) {
			return response()->json([
				'status' => 'error',
				'message' => 'Unauthorized',
			], 401);
		}


		return $next($request);
	}
}
