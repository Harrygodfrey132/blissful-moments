<?php

namespace App\Http\Controllers;

use App\Models\EmailLog;
use Illuminate\Http\Request;

class EmailLogController extends Controller
{
    // List all email logs
    public function index()
    {
        $emailLogs = EmailLog::latest()->paginate(25);
        return view('admin.email_logs.index', compact('emailLogs'));
    }

    // View a specific email log
    public function show($id)
    {
        $email = EmailLog::findOrFail($id);
        return view('admin.email_logs.show', compact('email'));
    }
}
