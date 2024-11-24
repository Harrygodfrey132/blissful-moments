<?php

namespace App\Http\Controllers;

use App\Helper\AppConstant;
use App\Models\GDPRRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

   public function edit(GDPRRequest $gdpr)
   {
      if (request()->ajax()) {
         // Return data as JSON for AJAX request
         return response()->json([
            'id' => $gdpr->id,
            'user_name' => $gdpr->user->name,
            'user_email' => $gdpr->user->email,
            'comments' => $gdpr->comments,
         ], 200);
      }

      // Fallback for non-AJAX requests
      abort(400, 'Invalid request');
   }

   public function update(Request $request, GDPRRequest $gdpr)
   {
      try {
         DB::transaction(function () use ($gdpr, $request) {
            $gdpr->update([
               'status' => $request->status ? AppConstant::ACCEPTED : AppConstant::REJECTED
            ]);
            $gdpr->user->delete();
         });
         return back()->with('success', 'Record removed successfully');
      } catch (\Throwable $th) {
         return back()->with('erorr', 'Something went wrong. Unable to remove record');
      }
   }
}
