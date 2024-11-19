<?php

namespace App\Http\Controllers;

use App\Models\GDPRRequest;
use Illuminate\Http\Request;

class GDPRrequestController extends Controller
{
   public function index(Request $request)
   {
      // Retrieve all filter data from the request
      $data = [
         'search' => $request->input('search', ''),
         'status' => $request->input('status', ''),
         'start_date' => $request->input('start_date', ''),
         'end_date' => $request->input('end_date', ''),
      ];

      $requests = GDPRRequest::searchFilter($data)->with('user')->paginate(10);

      // Return AJAX response if the request is AJAX
      if ($request->ajax()) {
         return view('admin.gdpr-requests.partials.listing', compact('requests', 'data'));
      }

      return view('admin.gdpr-requests.index', compact('requests', 'data'));
   }

   public function edit(GDPRRequest $gdpr){
      return view('admin.gdpr-requests.edit', compact('gdpr'));
   }
}
