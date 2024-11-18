<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GDPRrequestController extends Controller
{
   public function index(){
    return view('admin.gdpr-requests.index');
   }
}
