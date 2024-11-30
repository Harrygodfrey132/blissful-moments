<?php

namespace Database\Seeders;

use App\Models\Template;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EmailTemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        Template::create([
            'id' => 1,
            'name' => 'welcome_email',
            'type' => 1,
            'subject' => 'Welcome to Blissful Moments',
            'body' => '
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Welcome Email</title>
                    <style>
                        body {
                            margin: 0;
                            padding: 0;
                            font-family: \'Arial\', sans-serif;
                            background-color: #f9f9f9;
                            color: #333;
                        }
                        table {
                            border-spacing: 0;
                            border-collapse: collapse;
                            width: 100%;
                        }
                        img {
                            max-width: 100%;
                            height: auto;
                            display: block;
                        }
                        .email-container {
                            max-width: 600px;
                            margin: 20px auto;
                            background-color: #ffffff;
                            border-radius: 2px;
                            overflow: hidden;
                            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                        }
                        .email-hero {
                            background-color: #fff;
                            text-align: center;
                            padding: 7px 10px;
                            box-shadow: 0 0 3px #ccc;
                        }
                        .email-hero h1 {
                            font-size: 28px;
                            margin: 0;
                            font-weight: bold;
                        }
                        .email-content {
                            padding: 20px 30px;
                        }
                        .email-content h2 {
                            font-size: 19px;
                            margin-bottom: 15px;
                            margin-top: 10px;
                            color: #333;
                        }
                        .email-content p {
                            margin: 0 0 15px;
                            line-height: 1.6;
                            color: #000;
                        }
                        .email-button {
                            display: inline-block;
                            background-color: #020202;
                            color: #ffffff;
                            padding: 12px 20px;
                            border-radius: 2px;
                            text-align: center;
                            font-size: 14px;
                            margin: 20px 0;
                            text-decoration: none;
                        }
                        .email-footer {
                            background-color: #474747;
                            text-align: center;
                            padding: 15px;
                            font-size: 14px;
                            color: #888;
                        }
                        .email-footer a {
                            color: #4cafeb;
                            text-decoration: underline;
                        }
                    </style>
                </head>
                <body>
                    <table class="email-container">
                        <tr>
                            <td class="email-hero">
                                <img style="width: 100px; margin:0 auto" src="{logo_url}" alt="Logo">
                            </td>
                        </tr>
                        <tr>
                            <td class="email-content">
                                <h2>Hi {user_name},</h2>
                                <p>Thank you for joining us! We\'re thrilled to have you on board. Here’s a quick guide to help you get started with our services and make the most of your experience.</p>
                                <p>Click the button below to explore your dashboard and access your account:</p>
                                <a href="{dashboard_url}" class="email-button">Get Started</a>
                            </td>
                        </tr>
                        <tr>
                            <td class="email-footer">
                                <p>&copy; 2024 Blissful Moments. All rights reserved.</p>
                                <p><a href="{unsubscribe_url}">Unsubscribe</a> | <a href="{privacy_policy_url}">Privacy Policy</a></p>
                            </td>
                        </tr>
                    </table>
                </body>
                </html>
            ',
            'replacements' => '
                {user_name} => Recipient\'s Name,
                {logo_url} => Logo Image URL,
                {dashboard_url} => Dashboard URL,
                {unsubscribe_url} => Unsubscribe Link,
                {privacy_policy_url} => Privacy Policy Link
            ',
        ]);

        Template::create([
            'id' => 2,
            'name' => 'account_verification_email',
            'type' => 1,
            'subject' => 'Verify Your Email - Blissful Moments',
            'body' => '<!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Account Verification</title>
            <style>
                body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; }
                .email-container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 2px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
                .email-hero { background-color: #202020; text-align: center; color: white; padding: 20px 10px; }
                .email-hero h1 { font-size: 24px; margin: 0; font-weight: bold; }
                .email-content { padding: 20px 30px; }
                .email-content h2 { font-size: 20px; margin: 0 0 10px; color: #333; }
                .email-content p { margin: 0 0 15px; line-height: 1.6; color: #333; }
                .otp-code { display: block; font-size: 32px; font-weight: bold; text-align: center; margin: 15px 0; color: #C3325F; letter-spacing: 5px; }
                .expiry-note { font-size: 14px; color: #555; margin-top: 10px; }
                .email-footer { background-color: #474747; text-align: center; padding: 15px; font-size: 14px; color: #888; }
                .email-footer a { color: #4cafeb; text-decoration: underline; }
            </style>
        </head>
        <body>
            <table class="email-container">
                <tr>
                    <td class="email-hero">
                        <img src="logo-black.png" alt="Blissful Moments Logo" style="width: 100px; margin:0 auto;">
                        <h1>Account Verification</h1>
                    </td>
                </tr>
                <tr>
                    <td class="email-content">
                        <h2>Hi {{name}},</h2>
                        <p>Thank you for signing up with Blissful Moments! To complete your account setup, please use the OTP below to verify your email address:</p>
                        <span class="otp-code">{{otp}}</span>
                        <p class="expiry-note">This OTP is valid for {{expiry_time}} minutes. Please do not share it with anyone.</p>
                        <p>If you did not request this verification, please ignore this email or contact our support team for assistance.</p>
                    </td>
                </tr>
                <tr>
                    <td class="email-footer">
                        <p>&copy; 2024 Blissful Moments. All rights reserved.</p>
                        <p><a href="#">Unsubscribe</a> | <a href="#">Privacy Policy</a></p>
                    </td>
                </tr>
            </table>
        </body>
        </html>',
            'created_at' => now(),
            'updated_at' => now(),
            'replacements' => json_encode([
                '{name}' => "Recipient's Name",
                '{otp}' => 'OTP for verification',
                '{expiry_time}' => 'Expiration time in minutes',
            ]),
        ]);
    }
}
