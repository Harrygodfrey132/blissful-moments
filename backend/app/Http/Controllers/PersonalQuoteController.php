<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PersonalQuoteController extends Controller
{
    /**
     * Save or update the user's personal quote.
     */
    public function saveQuote(Request $request)
    {
        try {
            $validated = $request->validate([
                'quote' => 'required|string|max:255',
                'status' => 'required|boolean',
            ]);
            $page = $request->user()->page;
            $page->personalQuote()->updateOrCreate([], [
                'quote' => $validated['quote'],
                'status' => $validated['status'],
            ]);

            return response()->json([
                'message' => 'Quote saved successfully.',
                'page_data' => $page->refresh(),
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => $th->getMessage(),
            ]);
        }
    }
}
