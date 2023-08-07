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
    public function store(User $user, Request $request)
    {
        $task = new Task();
        $task->content = $request->input('content');
        $task->list_id = $request->input('list_id');
        $task->due_date = $request->input('due_date');
        $task->priority = $request->input('priority');
        $task->completed = false;
        $task->user_id = $user->id;
        $task->save();

        return response()->json($task, 201);
    }

    //UPDATE
    public function update(User $user, Task $task, Request $request)
    {
        $task->content = $request->input('content');
        $task->list_id = $request->input('list_id');
        $task->due_date = $request->input('due_date');
        $task->priority = $request->input('priority');
        $task->completed = $request->input('completed');
        $task->save();

        return response()->json($task, 200);
    }

    //delete
    public function destroy(User $user, Task $task)
    {
        $task->delete();

        return response()->json($task, 200);
    }

    // get tasks by a list
    public function getTasksByList($user_id, $list_id)
    {
        $tasks = Task::where('user_id', $user_id)
            ->where('list_id', $list_id)
            ->get();
        return $tasks;
    }
}
