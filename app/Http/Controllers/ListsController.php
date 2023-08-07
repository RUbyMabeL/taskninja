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
    public function index()
    {
        $lists = Lists::all();
        return  $lists;
    }

    public function show(Lists $list)
    {
        return response()->json($list, 200);
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
