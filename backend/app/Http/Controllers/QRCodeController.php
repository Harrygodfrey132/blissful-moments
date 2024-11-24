<?php

namespace App\Http\Controllers;

use SimpleSoftwareIO\QrCode\Facades\QrCode;
use Illuminate\Http\Request;

class QRCodeController extends Controller
{
    public function generateQRCode(Request $request)
    {
        // Example data to encode in the QR code
        $data = $request->input('data', env('FRONTEND_URL') . '/register'); // Default to 'https://example.com' if no data is provided

        // Generate the QR code
        $qrCode = QrCode::size(300)->generate($data); // You can adjust size, color, etc.

        // Create a temporary image and save it to a file
        $path = storage_path('app/public/qrcode.png');
        \File::put($path, $qrCode);

        // Flash success message
        flash()->success('QR code has been successfully downloaded.');
        // Return the QR code image for download
        return response()->download($path);
    }
}
