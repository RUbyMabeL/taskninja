<?php

use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\ListsController;
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

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware(['auth:sanctum'])->group(function () {
    //any route here is protected
    Route::apiResource('users.tasks', TaskController::class);
    Route::apiResource('users.lists', ListsController::class);
});

Route::get('/tasks/{user}/{list}', [TaskController::class, 'getTasksByList']);

// Route::post('/users', [RegisteredUserController::class, 'store']);
