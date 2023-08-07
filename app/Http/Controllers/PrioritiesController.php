<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Priority;

class PrioritiesController extends Controller
{
    //
    public function index()
    {
        return Priority::all();
    

    }
}
