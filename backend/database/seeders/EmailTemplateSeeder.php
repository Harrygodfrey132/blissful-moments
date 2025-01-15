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

        Template::truncate();

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
                        <h2>Hi {user_name},</h2>
                        <p>Thank you for signing up with Blissful Moments! To complete your account setup, please use the OTP below to verify your email address:</p>
                        <span class="otp-code">{otp_code}</span>
                        <p class="expiry-note">This OTP is valid for {expiry_time} minutes. Please do not share it with anyone.</p>
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
            'replacements' => "
                '{user_name}' => 'Recipient's Name',
                '{otp_code}' => 'OTP for verification',
                '{expiry_time}' => 'Expiration time in minutes',
            ",
        ]);

        Template::create([
            'id' => 3,
            'name' => 'password_reset_email',
            'type' => 1,
            'subject' => 'Password Reset Request - Blissful Moments',
            'body' => '<!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Password Reset</title>
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
                        <h1>Password Reset Request</h1>
                    </td>
                </tr>
                <tr>
                    <td class="email-content">
                        <h2>Hi {{name}},</h2>
                        <p>We received a request to reset the password for your account at Blissful Moments. Please use the OTP below to reset your password:</p>
                        <span class="otp-code">{{otp}}</span>
                        <p class="expiry-note">This OTP is valid for {{expiry_time}} minutes. Please do not share it with anyone.</p>
                        <p>If you did not request a password reset, please ignore this email or contact our support team for assistance.</p>
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
            'replacements' => "
                '{name}' => 'Recipient's Name',
                '{otp}' => 'OTP for resetting the password',
                '{expiry_time}' => 'Expiration time in minutes',
            ",
        ]);

        Template::create([
            'id' => 4,
            'name' => 'order_confirmation_email',
            'type' => 1,
            'subject' => 'Thank You for Your Order - Blissful Moments',
            'body' => '<!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Order Confirmation</title>
            <style>
                body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; }
                .email-container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 2px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
                .email-hero { background-color: #202020; text-align: center; color: white; padding: 20px 10px; }
                .email-hero h1 { font-size: 24px; margin: 0; font-weight: bold; }
                .email-content { padding: 20px 30px; }
                .email-content h2 { font-size: 20px; margin: 0 0 10px; color: #333; }
                .email-content p { margin: 0 0 15px; line-height: 1.6; color: #333; }
                .order-details { margin-top: 20px; }
                .order-details table { width: 100%; border-collapse: collapse; margin-top: 15px; }
                .order-details th, .order-details td { padding: 10px; border: 1px solid #ddd; text-align: left; }
                .email-footer { background-color: #474747; text-align: center; padding: 15px; font-size: 14px; color: #888; }
                .email-footer a { color: #4cafeb; text-decoration: underline; }
            </style>
        </head>
        <body>
            <table class="email-container">
                <tr>
                    <td class="email-hero">
                        <img src="logo-black.png" alt="Blissful Moments Logo" style="width: 100px; margin:0 auto;">
                        <h1>Thank You for Your Order!</h1>
                    </td>
                </tr>
                <tr>
                    <td class="email-content">
                        <h2>Hi {{name}},</h2>
                        <p>Thank you for your recent order with Blissful Moments! We are excited to process your order and deliver your purchase soon. Below are the details of your order:</p>
                        <div class="order-details">
                            <h3>Order Details</h3>
                            <table>
                                <tr>
                                    <th>Order ID</th>
                                    <td>{{order_id}}</td>
                                </tr>
                                <tr>
                                    <th>Date of Purchase</th>
                                    <td>{{order_date}}</td>
                                </tr>
                                <tr>
                                    <th>Total Amount</th>
                                    <td>${{order_total}}</td>
                                </tr>
                            </table>
                        </div>
                        <p>We will notify you once your order has been shipped. If you have any questions or concerns, please feel free to contact us.</p>
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
            'replacements' => "
                '{name}' => 'Recipient\'s Name',
                '{order_id}' => 'Order ID',
                '{order_date}' => 'Order Date',
                '{order_total}' => 'Total Amount of Order',
            ",
        ]);

        Template::create([
            'id' => 5,
            'name' => 'plan_expiry_email',
            'type' => 1,
            'subject' => 'Your Plan is Expiring Soon - Renew Now to Stay Active!',
            'body' => '<!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Plan Expiring Soon</title>
            <style>
                body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; }
                .email-container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 2px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
                .email-hero { background-color: #202020; text-align: center; color: white; padding: 20px 10px; }
                .email-hero h1 { font-size: 24px; margin: 0; font-weight: bold; }
                .email-content { padding: 20px 30px; }
                .email-content h2 { font-size: 20px; margin: 0 0 10px; color: #333; }
                .email-content p { margin: 0 0 15px; line-height: 1.6; color: #333; }
                .expiry-details { margin-top: 20px; }
                .expiry-details table { width: 100%; border-collapse: collapse; margin-top: 15px; }
                .expiry-details th, .expiry-details td { padding: 10px; border: 1px solid #ddd; text-align: left; }
                .cta-button { display: inline-block; background-color: #4cafeb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin-top: 20px; }
                .email-footer { background-color: #474747; text-align: center; padding: 15px; font-size: 14px; color: #888; }
                .email-footer a { color: #4cafeb; text-decoration: underline; }
            </style>
        </head>
        <body>
            <table class="email-container">
                <tr>
                    <td class="email-hero">
                        <img src="logo-black.png" alt="Blissful Moments Logo" style="width: 100px; margin:0 auto;">
                        <h1>Your Plan is Expiring Soon!</h1>
                    </td>
                </tr>
                <tr>
                    <td class="email-content">
                        <h2>Hi {{name}},</h2>
                        <p>We wanted to remind you that your current plan with Blissful Moments is expiring soon. To avoid any disruptions and continue enjoying your benefits, please renew your plan today:</p>
                        <div class="expiry-details">
                            <h3>Plan Details</h3>
                            <table>
                                <tr>
                                    <th>Plan Name</th>
                                    <td>{{plan_name}}</td>
                                </tr>
                                <tr>
                                    <th>Expiry Date</th>
                                    <td>{{expiry_date}}</td>
                                </tr>
                            </table>
                        </div>
                        <a href="{{renewal_link}}" class="cta-button">Renew Now</a>
                        <p>If you have any questions or need assistance, our support team is here to help!</p>
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
            'replacements' => "
                '{name}' => 'Recipient\'s Name',
                '{plan_name}' => 'Name of the Plan',
                '{expiry_date}' => 'Plan Expiry Date',
                '{renewal_link}' => 'Link to Renew the Plan',
            ",
        ]);

        Template::create([
            'id' => 6,
            'name' => 'contribution_request_email',
            'type' => 1,
            'subject' => 'You Have Received a New Contribution Request - Blissful Moments',
            'body' => '<!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contribution Request</title>
            <style>
                body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; }
                .email-container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 2px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
                .email-hero { background-color: #202020; text-align: center; color: white; padding: 20px 10px; }
                .email-hero h1 { font-size: 24px; margin: 0; font-weight: bold; }
                .email-content { padding: 20px 30px; }
                .email-content h2 { font-size: 20px; margin: 0 0 10px; color: #333; }
                .email-content p { margin: 0 0 15px; line-height: 1.6; color: #333; }
                .notification-details { margin-top: 20px; }
                .notification-details table { width: 100%; border-collapse: collapse; margin-top: 15px; }
                .notification-details th, .notification-details td { padding: 10px; border: 1px solid #ddd; text-align: left; }
                .cta-button { display: inline-block; background-color: #4cafeb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin-top: 20px; }
                .email-footer { background-color: #474747; text-align: center; padding: 15px; font-size: 14px; color: #888; }
                .email-footer a { color: #4cafeb; text-decoration: underline; }
            </style>
        </head>
        <body>
            <table class="email-container">
                <tr>
                    <td class="email-hero">
                        <img src="logo-black.png" alt="Blissful Moments Logo" style="width: 100px; margin:0 auto;">
                        <h1>New Contribution Request!</h1>
                    </td>
                </tr>
                <tr>
                    <td class="email-content">
                        <h2>Hi {name},</h2>
                        <p>You’ve received a new contribution request on your Blissful Moments page! A visitor has requested to contribute to your page.</p>
                        <div class="notification-details">
                            <h3>Contribution Request Details</h3>
                            <table>
                                <tr>
                                    <th>Page Name</th>
                                    <td>{page_name}</td>
                                </tr>
                                <tr>
                                    <th>Visitor Name</th>
                                    <td>{visitor_name}</td>
                                </tr>
                                <tr>
                                    <th>Contribution Request Message</th>
                                    <td>{message}</td>
                                </tr>
                            </table>
                        </div>
                        <p>Please log in to your account to review and approve or decline the contribution request.</p>
                        <a href="{{page_url}}" class="cta-button">View Contribution Request</a>
                        <p>If you have any questions or need assistance, our support team is here to help!</p>
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
            'replacements' => "
                '{name}' => 'Recipient\'s Name',
                '{page_name}' => 'Page Name',
                '{visitor_name}' => 'Visitor\'s Name',
                '{message}' => 'Contribution Request Message',
                '{page_url}' => 'URL to the page where the request was made',
            ",
        ]);

        Template::create([
            'id' => 7,
            'name' => 'page_edit_request_email',
            'type' => 1,
            'subject' => 'You Have Received a Page Edit Request - Blissful Moments',
            'body' => '<!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Page Edit Request</title>
            <style>
                body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; }
                .email-container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 2px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
                .email-hero { background-color: #202020; text-align: center; color: white; padding: 20px 10px; }
                .email-hero h1 { font-size: 24px; margin: 0; font-weight: bold; }
                .email-content { padding: 20px 30px; }
                .email-content h2 { font-size: 20px; margin: 0 0 10px; color: #333; }
                .email-content p { margin: 0 0 15px; line-height: 1.6; color: #333; }
                .notification-details { margin-top: 20px; }
                .notification-details table { width: 100%; border-collapse: collapse; margin-top: 15px; }
                .notification-details th, .notification-details td { padding: 10px; border: 1px solid #ddd; text-align: left; }
                .cta-button { display: inline-block; background-color: #4cafeb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin-top: 20px; }
                .email-footer { background-color: #474747; text-align: center; padding: 15px; font-size: 14px; color: #888; }
                .email-footer a { color: #4cafeb; text-decoration: underline; }
            </style>
        </head>
        <body>
            <table class="email-container">
                <tr>
                    <td class="email-hero">
                        <img src="logo-black.png" alt="Blissful Moments Logo" style="width: 100px; margin:0 auto;">
                        <h1>Page Edit Request</h1>
                    </td>
                </tr>
                <tr>
                    <td class="email-content">
                        <h2>Hi {name},</h2>
                        <p>You’ve received a request to edit your page on Blissful Moments! A visitor has expressed interest in making changes to your page.</p>
                        <div class="notification-details">
                            <h3>Edit Request Details</h3>
                            <table>
                                <tr>
                                    <th>Page Name</th>
                                    <td>{page_name}</td>
                                </tr>
                                <tr>
                                    <th>Visitor Name</th>
                                    <td>{visitor_name}</td>
                                </tr>
                            </table>
                        </div>
                        <p>Please log in to your account to review and approve or decline the edit request.</p>
                        <a href="{page_url}" class="cta-button">View Edit Request</a>
                        <p>If you have any questions or need assistance, our support team is here to help!</p>
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
            'replacements' => "
                '{name}' => 'Recipient\'s Name',
                '{page_name}' => 'Page Name',
                '{visitor_name}' => 'Visitor\'s Name',
                '{requested_changes}' => 'Description of the requested changes',
                '{page_url}' => 'URL to the page where the edit request can be reviewed',
            ",
        ]);

        Template::create([
            'id' => 8,
            'name' => 'page_registration_congratulations_email',
            'type' => 1,
            'subject' => 'Congratulations! Your Page Has Been Registered - Blissful Moments',
            'body' => '<!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Page Registration Confirmation</title>
            <style>
                body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; }
                .email-container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 2px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
                .email-hero { background-color: #202020; text-align: center; color: white; padding: 20px 10px; }
                .email-hero h1 { font-size: 24px; margin: 0; font-weight: bold; }
                .email-content { padding: 20px 30px; }
                .email-content h2 { font-size: 20px; margin: 0 0 10px; color: #333; }
                .email-content p { margin: 0 0 15px; line-height: 1.6; color: #333; }
                .cta-button { display: inline-block; background-color: #4cafeb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin-top: 20px; }
                .email-footer { background-color: #474747; text-align: center; padding: 15px; font-size: 14px; color: #888; }
                .email-footer a { color: #4cafeb; text-decoration: underline; }
            </style>
        </head>
        <body>
            <table class="email-container">
                <tr>
                    <td class="email-hero">
                        <img src="logo-black.png" alt="Blissful Moments Logo" style="width: 100px; margin:0 auto;">
                        <h1>Page Registration Successful!</h1>
                    </td>
                </tr>
                <tr>
                    <td class="email-content">
                        <h2>Hi {name},</h2>
                        <p>Congratulations! Your page has been successfully registered on Blissful Moments.</p>
                        <p>We’re excited to have your page as part of our community. You can now start adding your personal touches and share your memories with the world.</p>
                        <p>Feel free to personalize your page with images, quotes, events, and more. Your page is now live, and visitors will be able to see and interact with it.</p>
                        <p>If you have any questions or need assistance, our support team is here to help!</p>
                        <a href="{page_url}" class="cta-button">Visit Your Page</a>
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
            'replacements' => "
                '{name}' => 'Recipient\'s Name',
                '{page_url}' => 'URL to the page where the user can visit their registered page',
            ",
        ]);

        Template::create([
            'id' => 9,
            'name' => 'new_contribution_request_email',
            'type' => 1,
            'subject' => 'New Contribution Request Received - Blissful Moments',
            'body' => '<!DOCTYPE html>
        <html>
        <head>
            <style>
                body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; }
                .email-container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 2px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
                .email-hero { background-color: #202020; text-align: center; color: white; padding: 20px 10px; }
                .email-hero h1 { font-size: 24px; margin: 0; font-weight: bold; }
                .email-content { padding: 20px 30px; }
                .email-content h2 { font-size: 20px; margin: 0 0 10px; color: #333; }
                .email-content p { margin: 0 0 15px; line-height: 1.6; color: #333; }
                .cta-button { display: inline-block; background-color: #4cafeb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin-top: 20px; }
                .email-footer { background-color: #474747; text-align: center; padding: 15px; font-size: 14px; color: #888; }
                .email-footer a { color: #4cafeb; text-decoration: underline; }
            </style>
        </head>
        <body>
            <table class="email-container">
                <tr>
                    <td class="email-hero">
                        <h1>New Contribution Request!</h1>
                    </td>
                </tr>
                <tr>
                    <td class="email-content">
                        <p>Hi {name},</p>
                        <p>You have received a new contribution request for your page.</p>
                        <p>Details of the contribution request:</p>
                        <p>Contributor Name: {contributor_name}</p>
                        <a href="{manage_request_url}" class="cta-button">Review Contribution Request</a>
                    </td>
                </tr>
                <tr>
                    <td class="email-footer">
                        <p>&copy; 2024 Blissful Moments. All rights reserved.</p>
                    </td>
                </tr>
            </table>
        </body>
        </html>',
            'replacements' => "
                '{name}' => 'User Name',
                '{contributor_name}' => 'Name of the contributor',
                '{contributor_message}' => 'Message sent by the contributor',
                '{manage_request_url}' => 'URL to manage the contribution request',
            ",
        ]);

        Template::create([
            'id' => 10,
            'name' => 'request_submission_confirmation_email',
            'type' => 1,
            'subject' => 'Request Submitted - Blissful Moments',
            'body' => '<!DOCTYPE html>
        <html>
        <head>
                <style>
                body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; }
                .email-container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 2px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
                .email-hero { background-color: #202020; text-align: center; color: white; padding: 20px 10px; }
                .email-hero h1 { font-size: 24px; margin: 0; font-weight: bold; }
                .email-content { padding: 20px 30px; }
                .email-content h2 { font-size: 20px; margin: 0 0 10px; color: #333; }
                .email-content p { margin: 0 0 15px; line-height: 1.6; color: #333; }
                .cta-button { display: inline-block; background-color: #4cafeb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin-top: 20px; }
                .email-footer { background-color: #474747; text-align: center; padding: 15px; font-size: 14px; color: #888; }
                .email-footer a { color: #4cafeb; text-decoration: underline; }
            </style>
        </head>
        <body>
            <table class="email-container">
                <tr>
                    <td class="email-hero">
                        <h1>Request Submitted!</h1>
                    </td>
                </tr>
                <tr>
                    <td class="email-content">
                        <p>Hi {name},</p>
                        <p>Your request has been successfully submitted. Our admin team will review it shortly.</p>
                        <p>We appreciate your patience and will notify you once your request is processed.</p>
                    </td>
                </tr>
                <tr>
                    <td class="email-footer">
                        <p>&copy; 2024 Blissful Moments. All rights reserved.</p>
                    </td>
                </tr>
            </table>
        </body>
        </html>',
            'replacements' => "
                '{name}' => 'Visitor Name',
            ",
        ]);

        Template::create([
            'id' => 11,
            'name' => 'new_submitted_data_request_email',
            'type' => 1,
            'subject' => 'New Data Submission Received - Blissful Moments',
            'body' => '<!DOCTYPE html>
        <html>
        <head>
                <style>
                body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; }
                .email-container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 2px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
                .email-hero { background-color: #202020; text-align: center; color: white; padding: 20px 10px; }
                .email-hero h1 { font-size: 24px; margin: 0; font-weight: bold; }
                .email-content { padding: 20px 30px; }
                .email-content h2 { font-size: 20px; margin: 0 0 10px; color: #333; }
                .email-content p { margin: 0 0 15px; line-height: 1.6; color: #333; }
                .cta-button { display: inline-block; background-color: #4cafeb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin-top: 20px; }
                .email-footer { background-color: #474747; text-align: center; padding: 15px; font-size: 14px; color: #888; }
                .email-footer a { color: #4cafeb; text-decoration: underline; }
            </style>
        </head>
        <body>
            <table class="email-container">
                <tr>
                    <td class="email-hero">
                        <h1>New Data Submission!</h1>
                    </td>
                </tr>
                <tr>
                    <td class="email-content">
                        <p>Hi {name},</p>
                        <p>We have received new data submitted for your page. Please review the submitted details and take necessary actions.</p>
                        <a href="{manage_submission_url}" class="cta-button">Review Submitted Data</a>
                    </td>
                </tr>
                <tr>
                    <td class="email-footer">
                        <p>&copy; 2024 Blissful Moments. All rights reserved.</p>
                    </td>
                </tr>
            </table>
        </body>
        </html>',
            'replacements' => "
                '{name}' => 'User Name',
                '{manage_submission_url}' => 'URL to review submitted data',
            ",
        ]);
        
        Template::create([
            'id' => 12,
            'name' => 'request_accepted_with_link_email',
            'type' => 1,
            'subject' => 'Your Request Has Been Accepted - Blissful Moments',
            'body' => '<!DOCTYPE html>
        <html>
        <head>
            <style>
                body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; }
                .email-container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 2px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
                .email-hero { background-color: #202020; text-align: center; color: white; padding: 20px 10px; }
                .email-hero h1 { font-size: 24px; margin: 0; font-weight: bold; }
                .email-content { padding: 20px 30px; }
                .email-content h2 { font-size: 20px; margin: 0 0 10px; color: #333; }
                .email-content p { margin: 0 0 15px; line-height: 1.6; color: #333; }
                .cta-button { display: inline-block; background-color: #4cafeb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin-top: 20px; }
                .email-footer { background-color: #474747; text-align: center; padding: 15px; font-size: 14px; color: #888; }
                .email-footer a { color: #4cafeb; text-decoration: underline; }
            </style>
        </head>
        <body>
            <table class="email-container">
                <tr>
                    <td class="email-hero">
                        <h1>Your Request Has Been Accepted!</h1>
                    </td>
                </tr>
                <tr>
                    <td class="email-content">
                        <p>Hi {name},</p>
                        <p>Your request has been accepted! Use the link below to edit the sections and submit your data.</p>
                        <p>Please note: This link will expire within {expiry_time}.</p>
                        <a href="{{unique_link}}" class="cta-button">Edit & Submit Data</a>
                    </td>
                </tr>
                <tr>
                    <td class="email-footer">
                        <p>&copy; 2024 Blissful Moments. All rights reserved.</p>
                    </td>
                </tr>
            </table>
        </body>
        </html>',
            'replacements' => "
                '{name}' => 'Visitor Name',
                '{unique_link}' => 'Unique link to edit and submit data',
                '{expiry_time}' => 'Expiry time of the link',
            ",
        ]);
        
        Template::create([
            'id' => 13,
            'name' => 'request_status_update_email',
            'type' => 1,
            'subject' => 'Request Status Update - Blissful Moments',
            'body' => '<!DOCTYPE html>
        <html>
        <head>
            <style>
                body { margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; }
                .email-container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 2px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); }
                .email-hero { background-color: #202020; text-align: center; color: white; padding: 20px 10px; }
                .email-hero h1 { font-size: 24px; margin: 0; font-weight: bold; }
                .email-content { padding: 20px 30px; }
                .email-content h2 { font-size: 20px; margin: 0 0 10px; color: #333; }
                .email-content p { margin: 0 0 15px; line-height: 1.6; color: #333; }
                .cta-button { display: inline-block; background-color: #4cafeb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin-top: 20px; }
                .email-footer { background-color: #474747; text-align: center; padding: 15px; font-size: 14px; color: #888; }
                .email-footer a { color: #4cafeb; text-decoration: underline; }
            </style>
        </head>
        <body>
            <table class="email-container">
                <tr>
                    <td class="email-hero">
                        <h1>Request Status Update</h1>
                    </td>
                </tr>
                <tr>
                    <td class="email-content">
                        <p>Hi {name},</p>
                        <p>Your request has been {{status}}.</p>
                        <p>{{status_message}}</p>
                    </td>
                </tr>
                <tr>
                    <td class="email-footer">
                        <p>&copy; 2024 Blissful Moments. All rights reserved.</p>
                    </td>
                </tr>
            </table>
        </body>
        </html>',
            'replacements' => "
                '{name}' => 'Visitor Name',
                '{status}' => 'Accepted or Declined',
                '{status_message}' => 'Additional message regarding the status',
            ",
        ]);
        
    }
}
