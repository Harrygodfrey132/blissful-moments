<?php

namespace App\Http\Controllers;

use App\Models\Template;
use Illuminate\Http\Request;

class TemplateController extends Controller
{
    // Display a listing of templates
    public function email_templates()
    {
        $templates = Template::where('type', Template::EMAIL_TEMPLATES)->paginate(10);
        return view('admin.templates.index', compact('templates'));
    }

    // Display a listing of templates
    public function sms_templates()
    {
        $templates = Template::where('type' , Template::SMS_TEMPLATES)->paginate(10);
        return view('admin.templates.index', compact('templates'));
    }

    // Show the form for editing a template
    public function edit(Template $template)
    {
        return view('admin.templates.edit', compact('template'));
    }

    // Update the specified template
    public function update(Request $request, Template $template)
    {
        $request->validate([
            'subject' => 'required|string|max:255',
            'body' => 'required',
        ]);

        $template->update([
            'subject' => $request->subject,
            'body' => $request->body,
        ]);

        if ($request->ajax()) {
            return response()->json([
                'success' => true,
                'message' => 'Template updated successfully!',
            ]);
        }

        return back()->with('success', 'Template updated successfully.');
    }
}
