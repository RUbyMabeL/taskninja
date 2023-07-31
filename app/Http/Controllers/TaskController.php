<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(User $user)
    {
        if (Auth::id() !== $user->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
        // to get the user's note $user->tasks
        return response()->json($user->tasks);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
    }


    // public function show(Task $task)
    // {
    //     return response()->json($task, 200);
    // }

    // //create new task
    // public function store(Request $request)
    // {
    //     $task = new Task();
    //     $task->content = $request->input('content');
    //     $task->save();

    //     return response()->json($task, 201);
    // }

    // //UPDATE
    // public function update(Task $task, Request $request)
    // {
    //     $task->content = $request->input('content');
    //     $task->save();

    //     return response()->json($task, 200);
    // }

    // //delete
    // public function destroy(Task $task)
    // {
    //     $task->delete();

    //     return response()->json($task, 200);
    // }
}
