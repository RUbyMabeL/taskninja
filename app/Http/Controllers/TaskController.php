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

    public function show(User $user, Task $task)
    {
        return response()->json($task, 200);
    }

    //create new task
    public function store(Request $request)
    {
        $task = new Task();
        $task->content = $request->input('content');
        $task->user_id = $request->input('user_id');
        $task->list_id = $request->input('list_id');
        $task->save();

        return response()->json($task, 201);
    }

    //UPDATE
    public function update(User $user, Task $task, Request $request)
    {
        $task->content = $request->input('content');
        $task->user_id = $request->input('user_id');
        $task->list_id = $request->input('list_id');
        $task->save();

        return response()->json($task, 200);
    }

    //delete
    public function destroy(User $user, Task $task)
    {
        $task->delete();

        return response()->json($task, 200);
    }
}
