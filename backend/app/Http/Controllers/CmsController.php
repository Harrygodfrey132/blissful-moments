<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CmsController extends Controller
{
    public function index()
    {
        return view('admin.cms.index');
    }
}
