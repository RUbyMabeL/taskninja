<?php

namespace App\Http\Controllers;

use App\Models\Lists;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class ListsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(User $user)
    {
        if (Auth::id() !== $user->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        return response()->json($user->lists);
    }

    public function store(User $user, Request $request)
    {
        $list = new Lists();
        $list->user_id = $request->input('user_id');
        $list->name = $request->input('name');
        $list->save();

        return response()->json($list, 201);
    }

    public function update(User $user, Lists $list, Request $request)
    {
        $list->user_id = $request->input('user_id');
        $list->name = $request->input('name');
        $list->save();

        return response()->json($list, 200);
    }

    public function destroy(User $user, Lists $list)
    {
        $list->delete();

        return response()->json($list, 200);
    }
}
