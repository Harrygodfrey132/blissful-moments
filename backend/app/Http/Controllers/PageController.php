<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Carbon\Carbon;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function storePageSettings(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required',
            'name' => 'required|string|unique:pages',
            'is_private' => 'required|boolean',
            'password' => 'nullable|string|required_if:is_private,true',
        ]);

        $page = Page::create([
            'user_id' => $validated['user_id'],
            'name' => $validated['name'],
            'is_private' => $validated['is_private'],
            'password' => $validated['is_private'] ? bcrypt($validated['password']) : null,
        ]);

        return response()->json([
            'message' => 'Page created successfully',
            'page' => $page,
        ], 201);
    }

    public function storePersonalInfo(Request $request)
    {
        $user = $request->user();
        $page = $user->page;

        $dateOfBirth = $request->dateOfBirth ? Carbon::createFromFormat('Y-m-d', $request->dateOfBirth)->toDateString() : null;
        $deathDate = $request->deathDate ? Carbon::createFromFormat('Y-m-d', $request->deathDate)->toDateString() : null;

        $page->update([
            'first_name' => $request->firstName,
            'middle_name' => $request->middleName,
            'last_name' => $request->lastName,
            'address' => $request->location,
            'date_of_birth' => $dateOfBirth,
            'death_date' => $deathDate,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Personal information updated successfully',
        ], 200);
    }

    public function checkPage(Request $request)
    {
        $user = $request->user();
        $page = $user->page;
        if (!$page) {
            return response()->json([
                'page' => null,
            ]);
        }

        return response()->json([
            'page' => $page,
        ], 200);
    }
}
