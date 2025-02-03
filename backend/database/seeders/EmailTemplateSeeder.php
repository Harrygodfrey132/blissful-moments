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
                    <title>The Blissful Moments</title>
                </head>

                <body>
                    <table dir="ltr" style="font-family: Arial, sans-serif; color: #333; line-height: 26px;" width="100%"
                        cellspacing="0" cellpadding="0" border="0" bgcolor="#f5f5f5">
                        <tbody>
                            <!-- Header -->
                            <tr>
                                <td style="background: #0b4a6f; padding: 30px 0;"></td>
                            </tr>
                            <tr>
                                <td style="background: #0b4a6f;">
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 10px 15px; 10px 40px">
                                                    <a href="{frontend_url}"
                                                        style="align-items: center; display: flex; text-decoration: none;">
                                                        <img style="width: 70px; vertical-align: middle;" src="{logo_path}"
                                                            alt="Blissfull Logo">
                                                        <span
                                                            style="font-weight: 600;font-size: 22px;color:#0b4a6f;margin-left: 10px;">The
                                                            Blissful Moments</span>
                                                    </a>
                                                </td>

                                                <td style="text-align: right; padding: 10px 40px;">
                                                    <a href="{facebook_link}"
                                                        style="text-decoration: none;" target="_blank">
                                                        <img src="{facebook_logo}" style="width: 25px; height: 25px; margin: 5px;"
                                                            alt="Facebook">
                                                    </a>
                                                    <a href="{twitter_link}"
                                                        style="text-decoration: none;" target="_blank">
                                                        <img src="{twitter_logo}" style="width: 25px; height: 25px; margin: 5px;"
                                                            alt="Twitter">
                                                    </a>
                                                    <a href="{instagram_link}"
                                                        style="text-decoration: none;" target="_blank">
                                                        <img src="{instagram_logo}" style="width: 25px; height: 25px; margin: 5px;"
                                                            alt="Instagram">
                                                    </a>
                                                    <a href="{youtube_link}"
                                                        style="text-decoration: none;" target="_blank">
                                                        <img src="{youtube_logo}" style="width: 25px; height: 25px; margin: 5px;"
                                                            alt="YouTube">
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>

                            <!-- Body -->
                            <tr>
                                <td>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; text-align: center; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 22px 0;">
                                                    <h2 style="font-size: 25px; margin: 0; font-weight: 600; color: #0b4a6f;">
                                                        {Subject_Line}
                                                    </h2>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; text-align: left; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 30px 40px;">
                                                    <h3
                                                        style="font-size: 20px; margin: 0; font-weight: 600; color: #000; ">
                                                        Hello {First_Name},
                                                    </h3>
                                                    <p style="font-size: 16px; color: #000;">
                                                        Thank you for joining The Blissful Moments.
                                                    </p>
                                                    <p style="font-size: 16px; color: #000;">
                                                        We’re excited to help you create and manage your memorial pages. Here’s what to
                                                        do next:
                                                    </p>
                                                    <ol style="font-size: 16px; color: #000; padding-left: 20px;">
                                                        <li>Customize your profile or memorial page settings.</li>
                                                        <li>Explore our resources for tips on personalizing your memorial content.</li>
                                                        <li>Reach out to our support team if you have any questions.</li>
                                                    </ol>
                                                    <p style="font-size: 16px; color: #000;">
                                                        We’re grateful you’re here and look forward to providing you with a seamless
                                                        memorial creation experience.
                                                    </p>
                                                    <p style="font-size: 16px; font-weight: bold; color: #0b4a6f; text-align: center;">
                                                        Create password for your account:
                                                    </p>
                                                    <p style="text-align: center;">
                                                        <a href="{Reset_Link}" style="background: #0b4a6f; color: #fff; padding: 10px 20px;
                                                        text-decoration: none; font-size: 16px; border-radius: 5px;">
                                                            Set Password
                                                        </a>
                                                    </p>
                                                    <p style="font-size: 16px; color: #000;">Warm regards,</p>
                                                    <p style="font-size: 16px; color: #000; font-weight: bold;">Harry Godfrey</p>
                                                    <p style="font-size: 14px; color: #000;">Founder of The Blissful Moments Team</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>

                            <!-- Footer -->
                            <tr>
                                <td>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: rgba(0,0,0,0.04); text-align: center; position: relative;">

                                        <tbody>
                                            <tr>
                                                <td style="padding: 30px 0; font-size: 20px; color: #000;">
                                                    Need more help? <br>
                                                    <a href="{frontend_url}" style="color:#0b4a6f;">We’re here, ready to
                                                        talk</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 0px 20px 30px; font-size: 13px; color: #999;">
                                                    © {current_year}, Blissfull Moments. All Rights Reserved.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <a href="{frontend_url}"
                                                        style="    display: block;
                                                    position: absolute;
                                                    right: 0;
                                                    bottom: 10px;">
                                                        <img style="width: 70px;" src="{footer_logo}" alt="Blissfull Logo">
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </body>
                </html>
            ',
            'replacements' => json_encode([
                '{Subject_Line}' => 'Welcome to Blissful Moments',
                '{First_Name}' => 'Recipient\'s Name',
                '{Reset_Link}' => 'Password Reset Link',
            ]),
        ]);

        Template::create([
            'id' => 2,
            'name' => 'account_verification_email',
            'type' => 1,
            'subject' => 'Verify Your Email - Blissful Moments',
            'body' => '
                <!DOCTYPE html>
                <html>

                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Account Verification</title>
                </head>

                <body>
                    <table dir="ltr" style="font-family: Arial, sans-serif; color: #333; line-height: 26px;" width="100%"
                        cellspacing="0" cellpadding="0" border="0" bgcolor="#f5f5f5">
                        <tbody>
                            <!-- Header -->
                            <tr>
                                <td style="background: #0b4a6f; padding: 30px 0;"></td>
                            </tr>
                            <tr>
                                <td style="background: #0b4a6f;">
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 10px 15px;">
                                                    <a href="{frontend_url}"
                                                        style="align-items: center; display: flex; text-decoration: none;">
                                                        <img style="width: 70px; vertical-align: middle;" src="{logo_path}"
                                                            alt="Blissful Moments Logo">
                                                        <span
                                                            style="font-weight: 600;font-size: 22px;color:#0b4a6f;margin-left: 10px;">
                                                            The Blissful Moments
                                                        </span>
                                                    </a>
                                                </td>

                                                <td style="text-align: right; padding: 10px 40px;">
                                                    <a href="{facebook_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{facebook_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Facebook">
                                                    </a>
                                                    <a href="{twitter_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{twitter_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Twitter">
                                                    </a>
                                                    <a href="{instagram_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{instagram_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Instagram">
                                                    </a>
                                                    <a href="{youtube_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{youtube_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="YouTube">
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>

                            <!-- Body -->
                            <tr>
                                <td>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; text-align: center; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 22px 0;">
                                                    <h2 style="font-size: 25px; margin: 0; font-weight: 600; color: #0b4a6f;">
                                                        Account Verification
                                                    </h2>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; text-align: left; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 30px 40px;">
                                                    <h3 style="font-size: 20px; margin: 0; font-weight: 600; color: #000;">
                                                        Hello {user_name},
                                                    </h3>
                                                    <p style="font-size: 16px; color: #000;">
                                                        Thank you for signing up with Blissful Moments! To complete your account setup, please use the OTP below to verify your email address:
                                                    </p>
                                                    <p style="font-size: 26px; font-weight: bold; color: #C3325F; text-align: center; letter-spacing: 5px;">
                                                        {otp_code}
                                                    </p>
                                                    <p style="font-size: 14px; color: #555; margin-top: 10px; text-align: center;">
                                                        This OTP is valid for {expiry_time} minutes. Please do not share it with anyone.
                                                    </p>
                                                    <p style="font-size: 16px; color: #000;">
                                                        If you did not request this verification, please ignore this email or contact our support team for assistance.
                                                    </p>
                                                    <p style="font-size: 16px; color: #000;">Warm regards,</p>
                                                    <p style="font-size: 16px; color: #000; font-weight: bold;">Harry Godfrey</p>
                                                    <p style="font-size: 14px; color: #000;">Founder of The Blissful Moments Team</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>

                            <!-- Footer -->
                            <tr>
                                <td>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: rgba(0,0,0,0.04); text-align: center; position: relative;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 30px 0; font-size: 20px; color: #000;">
                                                    Need more help? <br>
                                                    <a href="{frontend_url}" style="color:#0b4a6f;">We’re here, ready to talk</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 0px 20px 30px; font-size: 13px; color: #999;">
                                                    © {current_year}, Blissful Moments. All Rights Reserved.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <a href="{frontend_url}"
                                                        style="display: block; position: absolute; right: 0; bottom: 10px;">
                                                        <img style="width: 70px;" src="{footer_logo}" alt="Blissful Moments Logo">
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </body>
                </html>
            ',
            'replacements' => json_encode([
                '{user_name}' => 'Recipient\'s Name',
                '{otp_code}' => 'OTP for verification',
                '{expiry_time}' => 'Expiration time in minutes',
            ]),
        ]);


        Template::create([
            'id' => 3,
            'name' => 'password_reset_email',
            'type' => 1,
            'subject' => 'Password Reset Request - Blissful Moments',
            'body' => '
                <!DOCTYPE html>
                <html>

                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Password Reset</title>
                </head>

                <body>
                    <table dir="ltr" style="font-family: Arial, sans-serif; color: #333; line-height: 26px;" width="100%"
                        cellspacing="0" cellpadding="0" border="0" bgcolor="#f5f5f5">
                        <tbody>
                            <!-- Header -->
                            <tr>
                                <td style="background: #0b4a6f; padding: 30px 0;"></td>
                            </tr>
                            <tr>
                                <td style="background: #0b4a6f;">
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 10px 15px;">
                                                    <a href="{frontend_url}"
                                                        style="align-items: center; display: flex; text-decoration: none;">
                                                        <img style="width: 70px; vertical-align: middle;" src="{logo_path}"
                                                            alt="Blissful Moments Logo">
                                                        <span
                                                            style="font-weight: 600;font-size: 22px;color:#0b4a6f;margin-left: 10px;">
                                                            The Blissful Moments
                                                        </span>
                                                    </a>
                                                </td>

                                                <td style="text-align: right; padding: 10px 40px;">
                                                    <a href="{facebook_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{facebook_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Facebook">
                                                    </a>
                                                    <a href="{twitter_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{twitter_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Twitter">
                                                    </a>
                                                    <a href="{instagram_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{instagram_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Instagram">
                                                    </a>
                                                    <a href="{youtube_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{youtube_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="YouTube">
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>

                            <!-- Body -->
                            <tr>
                                <td>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; text-align: center; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 22px 0;">
                                                    <h2 style="font-size: 25px; margin: 0; font-weight: 600; color: #0b4a6f;">
                                                        Password Reset Request
                                                    </h2>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; text-align: left; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 30px 40px;">
                                                    <h3 style="font-size: 20px; margin: 0; font-weight: 600; color: #000;">
                                                        Hello {name},
                                                    </h3>
                                                    <p style="font-size: 16px; color: #000;">
                                                        We received a request to reset your password at Blissful Moments. Please use the OTP below to proceed with resetting your password:
                                                    </p>
                                                    <p style="font-size: 26px; font-weight: bold; color: #C3325F; text-align: center; letter-spacing: 5px;">
                                                        {otp}
                                                    </p>
                                                    <p style="font-size: 14px; color: #555; margin-top: 10px; text-align: center;">
                                                        This OTP is valid for {expiry_time} minutes. Please do not share it with anyone.
                                                    </p>
                                                    <p style="font-size: 16px; color: #000;">
                                                        If you did not request a password reset, please ignore this email or contact our support team for assistance.
                                                    </p>
                                                    <p style="font-size: 16px; color: #000;">Warm regards,</p>
                                                    <p style="font-size: 16px; color: #000; font-weight: bold;">Harry Godfrey</p>
                                                    <p style="font-size: 14px; color: #000;">Founder of The Blissful Moments Team</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>

                            <!-- Footer -->
                            <tr>
                                <td>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: rgba(0,0,0,0.04); text-align: center; position: relative;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 30px 0; font-size: 20px; color: #000;">
                                                    Need more help? <br>
                                                    <a href="{frontend_url}" style="color:#0b4a6f;">We’re here, ready to talk</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 0px 20px 30px; font-size: 13px; color: #999;">
                                                    © {current_year}, Blissful Moments. All Rights Reserved.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <a href="{frontend_url}"
                                                        style="display: block; position: absolute; right: 0; bottom: 10px;">
                                                        <img style="width: 70px;" src="{footer_logo}" alt="Blissful Moments Logo">
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </body>

                </html>
            ',
            'replacements' => json_encode([
                '{name}' => 'Recipient\'s Name',
                '{otp}' => 'OTP for resetting the password',
                '{expiry_time}' => 'Expiration time in minutes',
            ]),
        ]);


        Template::create([
            'id' => 4,
            'name' => 'order_confirmation_email',
            'type' => 1,
            'subject' => 'Thank You for Your Order - Blissful Moments',
            'body' => '
                <!DOCTYPE html>
                <html>

                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Order Confirmation</title>
                </head>

                <body>
                    <table dir="ltr" style="font-family: Arial, sans-serif; color: #333; line-height: 26px;" width="100%"
                        cellspacing="0" cellpadding="0" border="0" bgcolor="#f5f5f5">
                        <tbody>
                            <!-- Header -->
                            <tr>
                                <td style="background: #0b4a6f; padding: 30px 0;"></td>
                            </tr>
                            <tr>
                                <td style="background: #0b4a6f;">
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 10px 15px;">
                                                    <a href="{frontend_url}"
                                                        style="align-items: center; display: flex; text-decoration: none;">
                                                        <img style="width: 70px; vertical-align: middle;" src="{logo_path}"
                                                            alt="Blissful Moments Logo">
                                                        <span
                                                            style="font-weight: 600;font-size: 22px;color:#0b4a6f;margin-left: 10px;">
                                                            The Blissful Moments
                                                        </span>
                                                    </a>
                                                </td>

                                                <td style="text-align: right; padding: 10px 40px;">
                                                    <a href="{facebook_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{facebook_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Facebook">
                                                    </a>
                                                    <a href="{twitter_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{twitter_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Twitter">
                                                    </a>
                                                    <a href="{instagram_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{instagram_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Instagram">
                                                    </a>
                                                    <a href="{youtube_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{youtube_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="YouTube">
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>

                            <!-- Body -->
                            <tr>
                                <td>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; text-align: center; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 22px 0;">
                                                    <h2 style="font-size: 25px; margin: 0; font-weight: 600; color: #0b4a6f;">
                                                        Order Confirmation
                                                    </h2>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; text-align: left; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 30px 40px;">
                                                    <h3 style="font-size: 20px; margin: 0; font-weight: 600; color: #000;">
                                                        Hello {name},
                                                    </h3>
                                                    <p style="font-size: 16px; color: #000;">
                                                        Thank you for your order with Blissful Moments! We’re excited to process it and get your items delivered soon.
                                                        Below are your order details:
                                                    </p>
                                                    <div class="order-details" style="margin-top: 20px;">
                                                        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                                                            <tr>
                                                                <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd;">Order ID</th>
                                                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">{order_id}</td>
                                                            </tr>
                                                            <tr>
                                                                <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd;">Date of Purchase</th>
                                                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">{order_date}</td>
                                                            </tr>
                                                            <tr>
                                                                <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd;">Tax</th>
                                                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${order_tax}</td>
                                                            </tr>
                                                            <tr>
                                                                <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd;">Total Amount</th>
                                                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">${order_total}</td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                    <p style="font-size: 16px; color: #000;">
                                                        We’ll notify you once your order has been shipped. If you have any questions, feel free to reach out!
                                                    </p>
                                                    <p style="font-size: 16px; color: #000;">Warm regards,</p>
                                                    <p style="font-size: 16px; color: #000; font-weight: bold;">Harry Godfrey</p>
                                                    <p style="font-size: 14px; color: #000;">Founder of The Blissful Moments Team</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>

                            <!-- Footer -->
                            <tr>
                                <td>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: rgba(0,0,0,0.04); text-align: center; position: relative;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 30px 0; font-size: 20px; color: #000;">
                                                    Need more help? <br>
                                                    <a href="{frontend_url}" style="color:#0b4a6f;">We’re here, ready to talk</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 0px 20px 30px; font-size: 13px; color: #999;">
                                                    © {current_year}, Blissful Moments. All Rights Reserved.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <a href="{frontend_url}"
                                                        style="display: block; position: absolute; right: 0; bottom: 10px;">
                                                        <img style="width: 70px;" src="{footer_logo}" alt="Blissful Moments Logo">
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </body>

                </html>
            ',
            'replacements' => json_encode([
                '{name}' => 'Recipient\'s Name',
                '{order_id}' => 'Order ID',
                '{order_date}' => 'Order Date',
                '{order_tax}' => 'Order Tax',
                '{order_total}' => 'Total Amount of Order',
            ]),
        ]);


        Template::create([
            'id' => 5,
            'name' => 'plan_expiry_email',
            'type' => 1,
            'subject' => 'Your Plan is Expiring Soon - Renew Now to Stay Active!',
            'body' => '
                <!DOCTYPE html>
                <html>

                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Plan Expiring Soon</title>
                </head>

                <body>
                    <table dir="ltr" style="font-family: Arial, sans-serif; color: #333; line-height: 26px;" width="100%"
                        cellspacing="0" cellpadding="0" border="0" bgcolor="#f5f5f5">
                        <tbody>
                            <!-- Header -->
                            <tr>
                                <td style="background: #0b4a6f; padding: 30px 0;"></td>
                            </tr>
                            <tr>
                                <td style="background: #0b4a6f;">
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 10px 15px;">
                                                    <a href="{frontend_url}"
                                                        style="align-items: center; display: flex; text-decoration: none;">
                                                        <img style="width: 70px; vertical-align: middle;" src="{logo_path}"
                                                            alt="Blissful Moments Logo">
                                                        <span
                                                            style="font-weight: 600;font-size: 22px;color:#0b4a6f;margin-left: 10px;">
                                                            The Blissful Moments
                                                        </span>
                                                    </a>
                                                </td>

                                                <td style="text-align: right; padding: 10px 40px;">
                                                    <a href="{facebook_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{facebook_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Facebook">
                                                    </a>
                                                    <a href="{twitter_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{twitter_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Twitter">
                                                    </a>
                                                    <a href="{instagram_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{instagram_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Instagram">
                                                    </a>
                                                    <a href="{youtube_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{youtube_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="YouTube">
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>

                            <!-- Body -->
                            <tr>
                                <td>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; text-align: center; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 22px 0;">
                                                    <h2 style="font-size: 25px; margin: 0; font-weight: 600; color: #0b4a6f;">
                                                        Plan Expiring Soon!
                                                    </h2>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; text-align: left; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 30px 40px;">
                                                    <h3 style="font-size: 20px; margin: 0; font-weight: 600; color: #000;">
                                                        Hello {name},
                                                    </h3>
                                                    <p style="font-size: 16px; color: #000;">
                                                        We hope you’re enjoying your experience with <strong>Blissful Moments</strong>.
                                                        We wanted to remind you that your current plan is <strong>expiring soon ({first_reminder_email})</strong>.
                                                        To ensure uninterrupted access to our services, please renew your plan before the expiry date.
                                                    </p>
                                                    <div class="expiry-details" style="margin-top: 20px;">
                                                        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                                                            <tr>
                                                                <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd;">Plan Name</th>
                                                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">{plan_name}</td>
                                                            </tr>
                                                            <tr>
                                                                <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd;">Expiry Date</th>
                                                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">{expiry_date}</td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                    <p style="font-size: 16px; color: #000;">
                                                        Click the button below to renew your plan and continue enjoying our services.
                                                    </p>
                                                    <p style="text-align: center;">
                                                        <a href="{renewal_link}"
                                                            style="background: #0b4a6f; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">
                                                            Renew Now
                                                        </a>
                                                    </p>
                                                    <p style="font-size: 16px; color: #000;">
                                                        If you have any questions, feel free to reach out to our support team. We’re happy to help!
                                                    </p>
                                                    <p style="font-size: 16px; color: #000;">Warm regards,</p>
                                                    <p style="font-size: 16px; color: #000; font-weight: bold;">Harry Godfrey</p>
                                                    <p style="font-size: 14px; color: #000;">Founder of The Blissful Moments Team</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>

                            <!-- Footer -->
                            <tr>
                                <td>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: rgba(0,0,0,0.04); text-align: center; position: relative;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 30px 0; font-size: 20px; color: #000;">
                                                    Need more help? <br>
                                                    <a href="{frontend_url}" style="color:#0b4a6f;">We’re here, ready to talk</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 0px 20px 30px; font-size: 13px; color: #999;">
                                                    © {current_year}, Blissful Moments. All Rights Reserved.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <a href="{frontend_url}"
                                                        style="display: block; position: absolute; right: 0; bottom: 10px;">
                                                        <img style="width: 70px;" src="{footer_logo}" alt="Blissful Moments Logo">
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </body>

                </html>
            ',
            'replacements' => json_encode([
                '{name}' => 'Recipient\'s Name',
                '{plan_name}' => 'Name of the Plan',
                '{expiry_date}' => 'Plan Expiry Date',
                '{renewal_link}' => 'Link to Renew the Plan',
            ]),
        ]);


        Template::create([
            'id' => 6,
            'name' => 'contribution_request_email',
            'type' => 1,
            'subject' => 'You Have Received a New Contribution Request - Blissful Moments',
            'body' => '
                <!DOCTYPE html>
                <html>

                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>New Contribution Request</title>
                </head>

                <body>
                    <table dir="ltr" style="font-family: Arial, sans-serif; color: #333; line-height: 26px;" width="100%"
                        cellspacing="0" cellpadding="0" border="0" bgcolor="#f5f5f5">
                        <tbody>
                            <!-- Header -->
                            <tr>
                                <td style="background: #0b4a6f; padding: 30px 0;"></td>
                            </tr>
                            <tr>
                                <td style="background: #0b4a6f;">
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 10px 15px;">
                                                    <a href="{frontend_url}"
                                                        style="align-items: center; display: flex; text-decoration: none;">
                                                        <img style="width: 70px; vertical-align: middle;" src="{logo_path}"
                                                            alt="Blissful Moments Logo">
                                                        <span
                                                            style="font-weight: 600;font-size: 22px;color:#0b4a6f;margin-left: 10px;">
                                                            The Blissful Moments
                                                        </span>
                                                    </a>
                                                </td>

                                                <td style="text-align: right; padding: 10px 40px;">
                                                    <a href="{facebook_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{facebook_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Facebook">
                                                    </a>
                                                    <a href="{twitter_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{twitter_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Twitter">
                                                    </a>
                                                    <a href="{instagram_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{instagram_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Instagram">
                                                    </a>
                                                    <a href="{youtube_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{youtube_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="YouTube">
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>

                            <!-- Body -->
                            <tr>
                                <td>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; text-align: center; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 22px 0;">
                                                    <h2 style="font-size: 25px; margin: 0; font-weight: 600; color: #0b4a6f;">
                                                        New Contribution Request
                                                    </h2>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; text-align: left; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 30px 40px;">
                                                    <h3 style="font-size: 20px; margin: 0; font-weight: 600; color: #000;">
                                                        Hello {name},
                                                    </h3>
                                                    <p style="font-size: 16px; color: #000;">
                                                        You’ve received a new contribution request on your Blissful Moments page!
                                                        A visitor wants to contribute to your page.
                                                    </p>
                                                    <div class="notification-details" style="margin-top: 20px;">
                                                        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                                                            <tr>
                                                                <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd;">Page Name</th>
                                                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">{page_name}</td>
                                                            </tr>
                                                            <tr>
                                                                <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd;">Visitor Name</th>
                                                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">{visitor_name}</td>
                                                            </tr>
                                                            <tr>
                                                                <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd;">Message</th>
                                                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">{message}</td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                    <p style="font-size: 16px; color: #000;">
                                                        Please log in to your account to review and approve or decline the request.
                                                    </p>
                                                    <p style="text-align: center; margin-top: 20px;">
                                                        <a href="{page_url}"
                                                            style="display: inline-block; background-color: #0b4a6f; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
                                                            View Contribution Request
                                                        </a>
                                                    </p>
                                                    <p style="font-size: 16px; color: #000;">Warm regards,</p>
                                                    <p style="font-size: 16px; color: #000; font-weight: bold;">Harry Godfrey</p>
                                                    <p style="font-size: 14px; color: #000;">Founder of The Blissful Moments Team</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>

                            <!-- Footer -->
                            <tr>
                                <td>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: rgba(0,0,0,0.04); text-align: center; position: relative;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 30px 0; font-size: 20px; color: #000;">
                                                    Need more help? <br>
                                                    <a href="{frontend_url}" style="color:#0b4a6f;">We’re here, ready to talk</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 0px 20px 30px; font-size: 13px; color: #999;">
                                                    © {current_year}, Blissful Moments. All Rights Reserved.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <a href="{frontend_url}"
                                                        style="display: block; position: absolute; right: 0; bottom: 10px;">
                                                        <img style="width: 70px;" src="{footer_logo}" alt="Blissful Moments Logo">
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </body>
                </html>
            ',
            'replacements' => json_encode([
                '{name}' => 'Recipient\'s Name',
                '{page_name}' => 'Page Name',
                '{visitor_name}' => 'Visitor\'s Name',
                '{message}' => 'Contribution Request Message',
                '{page_url}' => 'URL to the page where the request was made',
            ]),
        ]);


        Template::create([
            'id' => 7,
            'name' => 'page_edit_request_email',
            'type' => 1,
            'subject' => 'You Have Received a Page Edit Request - Blissful Moments',
            'body' => '
                <!DOCTYPE html>
                <html>

                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Page Edit Request</title>
                </head>

                <body>
                    <table dir="ltr" style="font-family: Arial, sans-serif; color: #333; line-height: 26px;" width="100%"
                        cellspacing="0" cellpadding="0" border="0" bgcolor="#f5f5f5">
                        <tbody>
                            <!-- Header -->
                            <tr>
                                <td style="background: #0b4a6f; padding: 30px 0;"></td>
                            </tr>
                            <tr>
                                <td style="background: #0b4a6f;">
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 10px 15px;">
                                                    <a href="{frontend_url}"
                                                        style="align-items: center; display: flex; text-decoration: none;">
                                                        <img style="width: 70px; vertical-align: middle;" src="{logo_path}"
                                                            alt="Blissful Moments Logo">
                                                        <span
                                                            style="font-weight: 600;font-size: 22px;color:#0b4a6f;margin-left: 10px;">
                                                            The Blissful Moments
                                                        </span>
                                                    </a>
                                                </td>

                                                <td style="text-align: right; padding: 10px 40px;">
                                                    <a href="{facebook_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{facebook_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Facebook">
                                                    </a>
                                                    <a href="{twitter_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{twitter_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Twitter">
                                                    </a>
                                                    <a href="{instagram_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{instagram_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Instagram">
                                                    </a>
                                                    <a href="{youtube_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{youtube_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="YouTube">
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>

                            <!-- Body -->
                            <tr>
                                <td>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; text-align: center; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 22px 0;">
                                                    <h2 style="font-size: 25px; margin: 0; font-weight: 600; color: #0b4a6f;">
                                                        Page Edit Request
                                                    </h2>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; text-align: left; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 30px 40px;">
                                                    <h3 style="font-size: 20px; margin: 0; font-weight: 600; color: #000;">
                                                        Hello {name},
                                                    </h3>
                                                    <p style="font-size: 16px; color: #000;">
                                                        You’ve received a request to edit your page on Blissful Moments!
                                                        A visitor has expressed interest in making changes to your page.
                                                    </p>
                                                    <div class="notification-details" style="margin-top: 20px;">
                                                        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                                                            <tr>
                                                                <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd;">Page Name</th>
                                                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">{page_name}</td>
                                                            </tr>
                                                            <tr>
                                                                <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd;">Visitor Name</th>
                                                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">{visitor_name}</td>
                                                            </tr>
                                                            <tr>
                                                                <th style="text-align: left; padding: 10px; border-bottom: 1px solid #ddd;">Requested Changes</th>
                                                                <td style="padding: 10px; border-bottom: 1px solid #ddd;">{requested_changes}</td>
                                                            </tr>
                                                        </table>
                                                    </div>
                                                    <p style="font-size: 16px; color: #000;">
                                                        Please log in to your account to review and approve or decline the request.
                                                    </p>
                                                    <p style="text-align: center; margin-top: 20px;">
                                                        <a href="{page_url}"
                                                            style="display: inline-block; background-color: #0b4a6f; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
                                                            View Edit Request
                                                        </a>
                                                    </p>
                                                    <p style="font-size: 16px; color: #000;">Warm regards,</p>
                                                    <p style="font-size: 16px; color: #000; font-weight: bold;">Harry Godfrey</p>
                                                    <p style="font-size: 14px; color: #000;">Founder of The Blissful Moments Team</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>

                            <!-- Footer -->
                            <tr>
                                <td>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: rgba(0,0,0,0.04); text-align: center; position: relative;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 30px 0; font-size: 20px; color: #000;">
                                                    Need more help? <br>
                                                    <a href="{frontend_url}" style="color:#0b4a6f;">We’re here, ready to talk</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 0px 20px 30px; font-size: 13px; color: #999;">
                                                    © {current_year}, Blissful Moments. All Rights Reserved.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <a href="{frontend_url}"
                                                        style="display: block; position: absolute; right: 0; bottom: 10px;">
                                                        <img style="width: 70px;" src="{footer_logo}" alt="Blissful Moments Logo">
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </body>

                </html>
            ',
            'replacements' => json_encode([
                '{name}' => 'Recipient\'s Name',
                '{page_name}' => 'Page Name',
                '{visitor_name}' => 'Visitor\'s Name',
                '{requested_changes}' => 'Description of the requested changes',
                '{page_url}' => 'URL to the page where the edit request can be reviewed',
            ]),
        ]);


        Template::create([
            'id' => 8,
            'name' => 'page_registration_congratulations_email',
            'type' => 1,
            'subject' => 'Congratulations! Your Page Has Been Registered - Blissful Moments',
            'body' => '
                <!DOCTYPE html>
                <html>
        
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Page Registration Confirmation</title>
                </head>
        
                <body>
                    <table dir="ltr" style="font-family: Arial, sans-serif; color: #333; line-height: 26px;" width="100%"
                        cellspacing="0" cellpadding="0" border="0" bgcolor="#f5f5f5">
                        <tbody>
                            <!-- Header -->
                            <tr>
                                <td style="background: #0b4a6f; padding: 30px 0;"></td>
                            </tr>
                            <tr>
                                <td style="background: #0b4a6f;">
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 10px 15px;">
                                                    <a href="{frontend_url}"
                                                        style="align-items: center; display: flex; text-decoration: none;">
                                                        <img style="width: 70px; vertical-align: middle;" src="{logo_path}"
                                                            alt="Blissful Moments Logo">
                                                        <span
                                                            style="font-weight: 600;font-size: 22px;color:#0b4a6f;margin-left: 10px;">
                                                            The Blissful Moments
                                                        </span>
                                                    </a>
                                                </td>
        
                                                <td style="text-align: right; padding: 10px 40px;">
                                                    <a href="{facebook_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{facebook_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Facebook">
                                                    </a>
                                                    <a href="{twitter_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{twitter_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Twitter">
                                                    </a>
                                                    <a href="{instagram_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{instagram_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Instagram">
                                                    </a>
                                                    <a href="{youtube_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{youtube_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="YouTube">
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
        
                            <!-- Body -->
                            <tr>
                                <td>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; text-align: center; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 22px 0;">
                                                    <h2 style="font-size: 25px; margin: 0; font-weight: 600; color: #0b4a6f;">
                                                        Page Registration Successful!
                                                    </h2>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; text-align: left; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 30px 40px;">
                                                    <h3 style="font-size: 20px; margin: 0; font-weight: 600; color: #000;">
                                                        Hello {name},
                                                    </h3>
                                                    <p style="font-size: 16px; color: #000;">
                                                        Congratulations! Your page has been successfully registered on Blissful Moments.
                                                    </p>
                                                    <p style="font-size: 16px; color: #000;">
                                                        We’re excited to have your page as part of our community.
                                                        You can now start adding your personal touches and share your memories with the world.
                                                    </p>
                                                    <p style="font-size: 16px; color: #000;">
                                                        Feel free to personalize your page with images, quotes, events, and more.
                                                        Your page is now live, and visitors will be able to see and interact with it.
                                                    </p>
                                                    <p style="text-align: center; margin-top: 20px;">
                                                        <a href="{page_url}"
                                                            style="display: inline-block; background-color: #0b4a6f; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
                                                            Visit Your Page
                                                        </a>
                                                    </p>
                                                    <p style="font-size: 16px; color: #000;">Warm regards,</p>
                                                    <p style="font-size: 16px; color: #000; font-weight: bold;">Harry Godfrey</p>
                                                    <p style="font-size: 14px; color: #000;">Founder of The Blissful Moments Team</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
        
                            <!-- Footer -->
                            <tr>
                                <td>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: rgba(0,0,0,0.04); text-align: center; position: relative;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 30px 0; font-size: 20px; color: #000;">
                                                    Need more help? <br>
                                                    <a href="{frontend_url}" style="color:#0b4a6f;">We’re here, ready to talk</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 0px 20px 30px; font-size: 13px; color: #999;">
                                                    © {current_year}, Blissful Moments. All Rights Reserved.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <a href="{frontend_url}"
                                                        style="display: block; position: absolute; right: 0; bottom: 10px;">
                                                        <img style="width: 70px;" src="{footer_logo}" alt="Blissful Moments Logo">
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </body>
        
                </html>
            ',
            'replacements' => json_encode([
                '{name}' => 'Recipient\'s Name',
                '{page_url}' => 'URL to the page where the user can visit their registered page',
            ]),
        ]);


        Template::create([
            'id' => 9,
            'name' => 'new_contribution_request_email',
            'type' => 1,
            'subject' => 'New Contribution Request Received - Blissful Moments',
            'body' => '
                <!DOCTYPE html>
                <html>
        
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>New Contribution Request</title>
                </head>
        
                <body>
                    <table dir="ltr" style="font-family: Arial, sans-serif; color: #333; line-height: 26px;" width="100%"
                        cellspacing="0" cellpadding="0" border="0" bgcolor="#f5f5f5">
                        <tbody>
                            <!-- Header -->
                            <tr>
                                <td style="background: #0b4a6f; padding: 30px 0;"></td>
                            </tr>
                            <tr>
                                <td style="background: #0b4a6f;">
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 10px 15px;">
                                                    <a href="{frontend_url}"
                                                        style="align-items: center; display: flex; text-decoration: none;">
                                                        <img style="width: 70px; vertical-align: middle;" src="{logo_path}"
                                                            alt="Blissful Moments Logo">
                                                        <span
                                                            style="font-weight: 600;font-size: 22px;color:#0b4a6f;margin-left: 10px;">
                                                            The Blissful Moments
                                                        </span>
                                                    </a>
                                                </td>
        
                                                <td style="text-align: right; padding: 10px 40px;">
                                                    <a href="{facebook_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{facebook_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Facebook">
                                                    </a>
                                                    <a href="{twitter_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{twitter_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Twitter">
                                                    </a>
                                                    <a href="{instagram_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{instagram_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Instagram">
                                                    </a>
                                                    <a href="{youtube_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{youtube_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="YouTube">
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
        
                            <!-- Body -->
                            <tr>
                                <td>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; text-align: center; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 22px 0;">
                                                    <h2 style="font-size: 25px; margin: 0; font-weight: 600; color: #0b4a6f;">
                                                        New Contribution Request
                                                    </h2>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; text-align: left; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 30px 40px;">
                                                    <h3 style="font-size: 20px; margin: 0; font-weight: 600; color: #000;">
                                                        Hello {name},
                                                    </h3>
                                                    <p style="font-size: 16px; color: #000;">
                                                        You have received a new contribution request for your page.
                                                    </p>
                                                    <p style="font-size: 16px; color: #000;">
                                                        <strong>Contributor Name:</strong> {contributor_name}
                                                    </p>
                                                    <p style="font-size: 16px; color: #000;">
                                                        <strong>Message:</strong> {contributor_message}
                                                    </p>
                                                    <p style="text-align: center; margin-top: 20px;">
                                                        <a href="{manage_request_url}"
                                                            style="display: inline-block; background-color: #0b4a6f; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
                                                            Review Contribution Request
                                                        </a>
                                                    </p>
                                                    <p style="font-size: 16px; color: #000;">Warm regards,</p>
                                                    <p style="font-size: 16px; color: #000; font-weight: bold;">Harry Godfrey</p>
                                                    <p style="font-size: 14px; color: #000;">Founder of The Blissful Moments Team</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
        
                            <!-- Footer -->
                            <tr>
                                <td>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: rgba(0,0,0,0.04); text-align: center; position: relative;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 30px 0; font-size: 20px; color: #000;">
                                                    Need more help? <br>
                                                    <a href="{frontend_url}" style="color:#0b4a6f;">We’re here, ready to talk</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 0px 20px 30px; font-size: 13px; color: #999;">
                                                    © {current_year}, Blissful Moments. All Rights Reserved.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <a href="{frontend_url}"
                                                        style="display: block; position: absolute; right: 0; bottom: 10px;">
                                                        <img style="width: 70px;" src="{footer_logo}" alt="Blissful Moments Logo">
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </body>
        
                </html>
            ',
            'replacements' => json_encode([
                '{name}' => 'User Name',
                '{contributor_name}' => 'Name of the contributor',
                '{contributor_message}' => 'Message sent by the contributor',
                '{manage_request_url}' => 'URL to manage the contribution request',
            ]),
        ]);


        Template::create([
            'id' => 10,
            'name' => 'request_submission_confirmation_email',
            'type' => 1,
            'subject' => 'Request Submitted - Blissful Moments',
            'body' => '
                <!DOCTYPE html>
                <html>
        
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Request Submitted</title>
                </head>
        
                <body>
                    <table dir="ltr" style="font-family: Arial, sans-serif; color: #333; line-height: 26px;" width="100%"
                        cellspacing="0" cellpadding="0" border="0" bgcolor="#f5f5f5">
                        <tbody>
                            <!-- Header -->
                            <tr>
                                <td style="background: #0b4a6f; padding: 30px 0;"></td>
                            </tr>
                            <tr>
                                <td style="background: #0b4a6f;">
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 10px 15px;">
                                                    <a href="{frontend_url}"
                                                        style="align-items: center; display: flex; text-decoration: none;">
                                                        <img style="width: 70px; vertical-align: middle;" src="{logo_path}"
                                                            alt="Blissful Moments Logo">
                                                        <span
                                                            style="font-weight: 600;font-size: 22px;color:#0b4a6f;margin-left: 10px;">
                                                            The Blissful Moments
                                                        </span>
                                                    </a>
                                                </td>
        
                                                <td style="text-align: right; padding: 10px 40px;">
                                                    <a href="{facebook_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{facebook_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Facebook">
                                                    </a>
                                                    <a href="{twitter_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{twitter_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Twitter">
                                                    </a>
                                                    <a href="{instagram_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{instagram_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Instagram">
                                                    </a>
                                                    <a href="{youtube_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{youtube_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="YouTube">
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
        
                            <!-- Body -->
                            <tr>
                                <td>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; text-align: center; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 22px 0;">
                                                    <h2 style="font-size: 25px; margin: 0; font-weight: 600; color: #0b4a6f;">
                                                        Request Submitted Successfully!
                                                    </h2>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; text-align: left; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 30px 40px;">
                                                    <h3 style="font-size: 20px; margin: 0; font-weight: 600; color: #000;">
                                                        Hello {name},
                                                    </h3>
                                                    <p style="font-size: 16px; color: #000;">
                                                        Your request has been successfully submitted. Our admin team will review it shortly.
                                                    </p>
                                                    <p style="font-size: 16px; color: #000;">
                                                        We appreciate your patience and will notify you once your request is processed.
                                                    </p>
                                                    <p style="text-align: center; margin-top: 20px;">
                                                        <a href="{frontend_url}"
                                                            style="display: inline-block; background-color: #0b4a6f; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
                                                            Visit Our Website
                                                        </a>
                                                    </p>
                                                    <p style="font-size: 16px; color: #000;">Warm regards,</p>
                                                    <p style="font-size: 16px; color: #000; font-weight: bold;">Harry Godfrey</p>
                                                    <p style="font-size: 14px; color: #000;">Founder of The Blissful Moments Team</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
        
                            <!-- Footer -->
                            <tr>
                                <td>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: rgba(0,0,0,0.04); text-align: center; position: relative;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 30px 0; font-size: 20px; color: #000;">
                                                    Need more help? <br>
                                                    <a href="{frontend_url}" style="color:#0b4a6f;">We’re here, ready to talk</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 0px 20px 30px; font-size: 13px; color: #999;">
                                                    © {current_year}, Blissful Moments. All Rights Reserved.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <a href="{frontend_url}"
                                                        style="display: block; position: absolute; right: 0; bottom: 10px;">
                                                        <img style="width: 70px;" src="{footer_logo}" alt="Blissful Moments Logo">
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </body>
        
                </html>
            ',
            'replacements' => json_encode([
                '{name}' => 'Visitor Name',
            ]),
        ]);


        Template::create([
            'id' => 11,
            'name' => 'new_submitted_data_request_email',
            'type' => 1,
            'subject' => 'New Data Submission Received - Blissful Moments',
            'body' => '
                <!DOCTYPE html>
                <html>
        
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>New Data Submission</title>
                </head>
        
                <body>
                    <table dir="ltr" style="font-family: Arial, sans-serif; color: #333; line-height: 26px;" width="100%"
                        cellspacing="0" cellpadding="0" border="0" bgcolor="#f5f5f5">
                        <tbody>
                            <!-- Header -->
                            <tr>
                                <td style="background: #0b4a6f; padding: 30px 0;"></td>
                            </tr>
                            <tr>
                                <td style="background: #0b4a6f;">
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 10px 15px;">
                                                    <a href="{frontend_url}"
                                                        style="align-items: center; display: flex; text-decoration: none;">
                                                        <img style="width: 70px; vertical-align: middle;" src="{logo_path}"
                                                            alt="Blissful Moments Logo">
                                                        <span
                                                            style="font-weight: 600;font-size: 22px;color:#0b4a6f;margin-left: 10px;">
                                                            The Blissful Moments
                                                        </span>
                                                    </a>
                                                </td>
        
                                                <td style="text-align: right; padding: 10px 40px;">
                                                    <a href="{facebook_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{facebook_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Facebook">
                                                    </a>
                                                    <a href="{twitter_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{twitter_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Twitter">
                                                    </a>
                                                    <a href="{instagram_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{instagram_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Instagram">
                                                    </a>
                                                    <a href="{youtube_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{youtube_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="YouTube">
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
        
                            <!-- Body -->
                            <tr>
                                <td>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; text-align: center; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 22px 0;">
                                                    <h2 style="font-size: 25px; margin: 0; font-weight: 600; color: #0b4a6f;">
                                                        New Data Submission Received!
                                                    </h2>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; text-align: left; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 30px 40px;">
                                                    <h3 style="font-size: 20px; margin: 0; font-weight: 600; color: #000;">
                                                        Hello {name},
                                                    </h3>
                                                    <p style="font-size: 16px; color: #000;">
                                                        We have received new data submitted for your page. Please review the submitted details and take necessary actions.
                                                    </p>
                                                    <p style="text-align: center; margin-top: 20px;">
                                                        <a href="{manage_submission_url}"
                                                            style="display: inline-block; background-color: #0b4a6f; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
                                                            Review Submitted Data
                                                        </a>
                                                    </p>
                                                    <p style="font-size: 16px; color: #000;">Warm regards,</p>
                                                    <p style="font-size: 16px; color: #000; font-weight: bold;">Harry Godfrey</p>
                                                    <p style="font-size: 14px; color: #000;">Founder of The Blissful Moments Team</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
        
                            <!-- Footer -->
                            <tr>
                                <td>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: rgba(0,0,0,0.04); text-align: center; position: relative;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 30px 0; font-size: 20px; color: #000;">
                                                    Need more help? <br>
                                                    <a href="{frontend_url}" style="color:#0b4a6f;">We’re here, ready to talk</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 0px 20px 30px; font-size: 13px; color: #999;">
                                                    © {current_year}, Blissful Moments. All Rights Reserved.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <a href="{frontend_url}"
                                                        style="display: block; position: absolute; right: 0; bottom: 10px;">
                                                        <img style="width: 70px;" src="{footer_logo}" alt="Blissful Moments Logo">
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </body>
        
                </html>
            ',
            'replacements' => json_encode([
                '{name}' => 'User Name',
                '{manage_submission_url}' => 'URL to review the submitted data'
            ]),
        ]);


        Template::create([
            'id' => 12,
            'name' => 'request_accepted_with_link_email',
            'type' => 1,
            'subject' => 'Your Request Has Been Accepted - Blissful Moments',
            'body' => '
                <!DOCTYPE html>
                <html>
        
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Your Request Has Been Accepted</title>
                </head>
        
                <body>
                    <table dir="ltr" style="font-family: Arial, sans-serif; color: #333; line-height: 26px;" width="100%"
                        cellspacing="0" cellpadding="0" border="0" bgcolor="#f5f5f5">
                        <tbody>
                            <!-- Header -->
                            <tr>
                                <td style="background: #0b4a6f; padding: 30px 0;"></td>
                            </tr>
                            <tr>
                                <td style="background: #0b4a6f;">
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 10px 15px;">
                                                    <a href="{frontend_url}"
                                                        style="align-items: center; display: flex; text-decoration: none;">
                                                        <img style="width: 70px; vertical-align: middle;" src="{logo_path}"
                                                            alt="Blissful Moments Logo">
                                                        <span
                                                            style="font-weight: 600;font-size: 22px;color:#0b4a6f;margin-left: 10px;">
                                                            The Blissful Moments
                                                        </span>
                                                    </a>
                                                </td>
        
                                                <td style="text-align: right; padding: 10px 40px;">
                                                    <a href="{facebook_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{facebook_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Facebook">
                                                    </a>
                                                    <a href="{twitter_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{twitter_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Twitter">
                                                    </a>
                                                    <a href="{instagram_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{instagram_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Instagram">
                                                    </a>
                                                    <a href="{youtube_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{youtube_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="YouTube">
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
        
                            <!-- Body -->
                            <tr>
                                <td>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; text-align: center; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 22px 0;">
                                                    <h2 style="font-size: 25px; margin: 0; font-weight: 600; color: #0b4a6f;">
                                                        Your Request Has Been Accepted!
                                                    </h2>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; text-align: left; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 30px 40px;">
                                                    <h3 style="font-size: 20px; margin: 0; font-weight: 600; color: #000;">
                                                        Hello {name},
                                                    </h3>
                                                    <p style="font-size: 16px; color: #000;">
                                                        We’re excited to inform you that your request has been accepted! Please use the link below to edit your details and submit your data.
                                                    </p>
                                                    <p style="font-size: 16px; color: #000;">
                                                        Please note: This link will expire within {expiry_time}.
                                                    </p>
                                                    <p style="text-align: center; margin-top: 20px;">
                                                        <a href="{{unique_link}}"
                                                            style="display: inline-block; background-color: #0b4a6f; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
                                                            Edit & Submit Data
                                                        </a>
                                                    </p>
                                                    <p style="font-size: 16px; color: #000;">Warm regards,</p>
                                                    <p style="font-size: 16px; color: #000; font-weight: bold;">Harry Godfrey</p>
                                                    <p style="font-size: 14px; color: #000;">Founder of The Blissful Moments Team</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
        
                            <!-- Footer -->
                            <tr>
                                <td>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: rgba(0,0,0,0.04); text-align: center; position: relative;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 30px 0; font-size: 20px; color: #000;">
                                                    Need more help? <br>
                                                    <a href="{frontend_url}" style="color:#0b4a6f;">We’re here, ready to talk</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 0px 20px 30px; font-size: 13px; color: #999;">
                                                    © {current_year}, Blissful Moments. All Rights Reserved.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <a href="{frontend_url}"
                                                        style="display: block; position: absolute; right: 0; bottom: 10px;">
                                                        <img style="width: 70px;" src="{footer_logo}" alt="Blissful Moments Logo">
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </body>
        
                </html>
            ',
            'replacements' => json_encode([
                '{name}' => 'Visitor Name',
                '{expiry_time}' => 'Expiry Time of the Link',
                '{unique_link}' => 'Unique link to edit and submit data'
            ]),
        ]);

        Template::create([
            'id' => 13,
            'name' => 'request_status_update_email',
            'type' => 1,
            'subject' => 'Request Status Update - Blissful Moments',
            'body' => '
                <!DOCTYPE html>
                <html>
        
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Request Status Update</title>
                </head>
        
                <body>
                    <table dir="ltr" style="font-family: Arial, sans-serif; color: #333; line-height: 26px;" width="100%"
                        cellspacing="0" cellpadding="0" border="0" bgcolor="#f5f5f5">
                        <tbody>
                            <!-- Header -->
                            <tr>
                                <td style="background: #0b4a6f; padding: 30px 0;"></td>
                            </tr>
                            <tr>
                                <td style="background: #0b4a6f;">
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 10px 15px;">
                                                    <a href="{frontend_url}"
                                                        style="align-items: center; display: flex; text-decoration: none;">
                                                        <img style="width: 70px; vertical-align: middle;" src="{logo_path}"
                                                            alt="Blissful Moments Logo">
                                                        <span
                                                            style="font-weight: 600;font-size: 22px;color:#0b4a6f;margin-left: 10px;">
                                                            The Blissful Moments
                                                        </span>
                                                    </a>
                                                </td>
        
                                                <td style="text-align: right; padding: 10px 40px;">
                                                    <a href="{facebook_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{facebook_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Facebook">
                                                    </a>
                                                    <a href="{twitter_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{twitter_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Twitter">
                                                    </a>
                                                    <a href="{instagram_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{instagram_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Instagram">
                                                    </a>
                                                    <a href="{youtube_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{youtube_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="YouTube">
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
        
                            <!-- Body -->
                            <tr>
                                <td>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; text-align: center; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 22px 0;">
                                                    <h2 style="font-size: 25px; margin: 0; font-weight: 600; color: #0b4a6f;">
                                                        Request Status Update
                                                    </h2>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; text-align: left; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 30px 40px;">
                                                    <h3 style="font-size: 20px; margin: 0; font-weight: 600; color: #000;">
                                                        Hi {name},
                                                    </h3>
                                                    <p style="font-size: 16px; color: #000;">
                                                        Your request has been <strong>{status}</strong>.
                                                    </p>
                                                    <p style="font-size: 16px; color: #000;">
                                                        {status_message}
                                                    </p>
                                                    <p style="font-size: 16px; color: #000;">Warm regards,</p>
                                                    <p style="font-size: 16px; color: #000; font-weight: bold;">Harry Godfrey</p>
                                                    <p style="font-size: 14px; color: #000;">Founder of The Blissful Moments Team</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
        
                            <!-- Footer -->
                            <tr>
                                <td>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: rgba(0,0,0,0.04); text-align: center; position: relative;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 30px 0; font-size: 20px; color: #000;">
                                                    Need more help? <br>
                                                    <a href="{frontend_url}" style="color:#0b4a6f;">We’re here, ready to talk</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 0px 20px 30px; font-size: 13px; color: #999;">
                                                    © {current_year}, Blissful Moments. All Rights Reserved.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <a href="{frontend_url}"
                                                        style="display: block; position: absolute; right: 0; bottom: 10px;">
                                                        <img style="width: 70px;" src="{footer_logo}" alt="Blissful Moments Logo">
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </body>
        
                </html>
            ',
            'replacements' => json_encode([
                '{name}' => 'Visitor Name',
                '{status}' => 'Accepted or Declined',
                '{status_message}' => 'Additional message regarding the status',
            ]),
        ]);



        Template::create([
            'id' => 14,
            'name' => 'subscription_first_reminder',
            'type' => 1,
            'subject' => 'Reminder: Your Subscription is Expiring in {first_reminder_email} Days',
            'body' => '
                <!DOCTYPE html>
                <html>
        
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Subscription Expiry Reminder</title>
                </head>
        
                <body>
                    <table dir="ltr" style="font-family: Arial, sans-serif; color: #333; line-height: 26px;" width="100%"
                        cellspacing="0" cellpadding="0" border="0" bgcolor="#f5f5f5">
                        <tbody>
                            <!-- Header -->
                            <tr>
                                <td style="background: #0b4a6f; padding: 30px 0;"></td>
                            </tr>
                            <tr>
                                <td style="background: #0b4a6f;">
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 10px 15px;">
                                                    <a href="{frontend_url}"
                                                        style="align-items: center; display: flex; text-decoration: none;">
                                                        <img style="width: 70px; vertical-align: middle;" src="{logo_path}"
                                                            alt="Blissful Moments Logo">
                                                        <span
                                                            style="font-weight: 600;font-size: 22px;color:#0b4a6f;margin-left: 10px;">
                                                            The Blissful Moments
                                                        </span>
                                                    </a>
                                                </td>
        
                                                <td style="text-align: right; padding: 10px 40px;">
                                                    <a href="{facebook_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{facebook_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Facebook">
                                                    </a>
                                                    <a href="{twitter_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{twitter_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Twitter">
                                                    </a>
                                                    <a href="{instagram_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{instagram_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Instagram">
                                                    </a>
                                                    <a href="{youtube_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{youtube_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="YouTube">
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
        
                            <!-- Body -->
                            <tr>
                                <td>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; text-align: center; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 22px 0;">
                                                    <h2 style="font-size: 25px; margin: 0; font-weight: 600; color: #0b4a6f;">
                                                        Subscription Expiry Reminder
                                                    </h2>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; text-align: left; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 30px 40px;">
                                                    <h3 style="font-size: 20px; margin: 0; font-weight: 600; color: #000;">
                                                        Hi {name},
                                                    </h3>
                                                    <p style="font-size: 16px; color: #000;">
                                                        Your subscription is set to expire in <strong>{first_reminder_email}</strong> days.
                                                    </p>
                                                    <p style="font-size: 16px; color: #000;">
                                                        Don\'t miss out on continuing your services with us! Renew your plan before your subscription ends to avoid any interruptions.
                                                    </p>
                                                    <p style="font-size: 16px; color: #000;">
                                                        Click the button below to renew your subscription:
                                                    </p>
                                                    <a href="{renewal_url}" style="display: inline-block; background-color: #4cafeb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin-top: 20px;">Renew Now</a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
        
                            <!-- Footer -->
                            <tr>
                                <td>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: rgba(0,0,0,0.04); text-align: center; position: relative;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 30px 0; font-size: 20px; color: #000;">
                                                    Need more help? <br>
                                                    <a href="{frontend_url}" style="color:#0b4a6f;">We’re here, ready to talk</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 0px 20px 30px; font-size: 13px; color: #999;">
                                                    © {current_year}, Blissful Moments. All Rights Reserved.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <a href="{frontend_url}"
                                                        style="display: block; position: absolute; right: 0; bottom: 10px;">
                                                        <img style="width: 70px;" src="{footer_logo}" alt="Blissful Moments Logo">
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </body>
                </html>
            ',
            'replacements' => json_encode([
                '{name}' => 'User Name',
                '{first_reminder_email}' => 'Days remaining for subscription expiry',
            ]),
        ]);


        Template::create([
            'id' => 15,
            'name' => 'subscription_second_reminder',
            'type' => 1,
            'subject' => 'Reminder: Your Subscription is Expiring in {second_reminder_email} Days',
            'body' => '
                <!DOCTYPE html>
                <html>
        
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Subscription Expiry Reminder</title>
                </head>
        
                <body>
                    <table dir="ltr" style="font-family: Arial, sans-serif; color: #333; line-height: 26px;" width="100%"
                        cellspacing="0" cellpadding="0" border="0" bgcolor="#f5f5f5">
                        <tbody>
                            <!-- Header -->
                            <tr>
                                <td style="background: #0b4a6f; padding: 30px 0;"></td>
                            </tr>
                            <tr>
                                <td style="background: #0b4a6f;">
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 10px 15px;">
                                                    <a href="{frontend_url}"
                                                        style="align-items: center; display: flex; text-decoration: none;">
                                                        <img style="width: 70px; vertical-align: middle;" src="{logo_path}"
                                                            alt="Blissful Moments Logo">
                                                        <span
                                                            style="font-weight: 600;font-size: 22px;color:#0b4a6f;margin-left: 10px;">
                                                            The Blissful Moments
                                                        </span>
                                                    </a>
                                                </td>
        
                                                <td style="text-align: right; padding: 10px 40px;">
                                                    <a href="{facebook_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{facebook_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Facebook">
                                                    </a>
                                                    <a href="{twitter_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{twitter_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Twitter">
                                                    </a>
                                                    <a href="{instagram_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{instagram_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Instagram">
                                                    </a>
                                                    <a href="{youtube_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{youtube_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="YouTube">
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
        
                            <!-- Body -->
                            <tr>
                                <td>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; text-align: center; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 22px 0;">
                                                    <h2 style="font-size: 25px; margin: 0; font-weight: 600; color: #0b4a6f;">
                                                        Subscription Expiry Reminder
                                                    </h2>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; text-align: left; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 30px 40px;">
                                                    <h3 style="font-size: 20px; margin: 0; font-weight: 600; color: #000;">
                                                        Hi {name},
                                                    </h3>
                                                    <p style="font-size: 16px; color: #000;">
                                                        Your subscription is set to expire in <strong>{second_reminder_email}</strong> days!
                                                    </p>
                                                    <p style="font-size: 16px; color: #000;">
                                                        It is important to renew it soon to avoid any service interruptions.
                                                    </p>
                                                    <p style="font-size: 16px; color: #000;">
                                                        Don\'t worry—renewing is quick and easy. Click below to renew your subscription:
                                                    </p>
                                                    <a href="{renewal_url}" style="display: inline-block; background-color: #4cafeb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; margin-top: 20px;">Renew Now</a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
        
                            <!-- Footer -->
                            <tr>
                                <td>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: rgba(0,0,0,0.04); text-align: center; position: relative;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 30px 0; font-size: 20px; color: #000;">
                                                    Need more help? <br>
                                                    <a href="{frontend_url}" style="color:#0b4a6f;">We’re here, ready to talk</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 0px 20px 30px; font-size: 13px; color: #999;">
                                                    © {current_year}, Blissful Moments. All Rights Reserved.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <a href="{frontend_url}"
                                                        style="display: block; position: absolute; right: 0; bottom: 10px;">
                                                        <img style="width: 70px;" src="{footer_logo}" alt="Blissful Moments Logo">
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </body>
        
                </html>
            ',
            'replacements' => json_encode([
                '{name}' => 'User Name',
                '{second_reminder_email}' => 'Days remaining for subscription expiry',
                '{renewal_url}' => 'https://example.com/renew',
            ]),
        ]);

        Template::create([
            'id' => 16,
            'name' => 'order_failed',
            'type' => 1,
            'subject' => 'Order Failed - Blissful Moments',
            'body' => '
                <!DOCTYPE html>
                <html>
        
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Order Failed - Blissful Moments</title>
                </head>
        
                <body>
                    <table dir="ltr" style="font-family: Arial, sans-serif; color: #333; line-height: 26px;" width="100%"
                        cellspacing="0" cellpadding="0" border="0" bgcolor="#f5f5f5">
                        <tbody>
                            <!-- Header -->
                            <tr>
                                <td style="background: #0b4a6f; padding: 30px 0;"></td>
                            </tr>
                            <tr>
                                <td style="background: #0b4a6f;">
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 10px 15px;">
                                                    <a href="{frontend_url}"
                                                        style="align-items: center; display: flex; text-decoration: none;">
                                                        <img style="width: 70px; vertical-align: middle;" src="{logo_path}"
                                                            alt="Blissful Moments Logo">
                                                        <span
                                                            style="font-weight: 600;font-size: 22px;color:#0b4a6f;margin-left: 10px;">
                                                            Blissful Moments
                                                        </span>
                                                    </a>
                                                </td>
        
                                                <td style="text-align: right; padding: 10px 40px;">
                                                    <a href="{facebook_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{facebook_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Facebook">
                                                    </a>
                                                    <a href="{twitter_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{twitter_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Twitter">
                                                    </a>
                                                    <a href="{instagram_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{instagram_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="Instagram">
                                                    </a>
                                                    <a href="{youtube_link}" style="text-decoration: none;" target="_blank">
                                                        <img src="{youtube_logo}" style="width: 25px; height: 25px; margin: 5px;" alt="YouTube">
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
        
                            <!-- Body -->
                            <tr>
                                <td>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; text-align: center; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 22px 0;">
                                                    <h2 style="font-size: 25px; margin: 0; font-weight: 600; color: #0b4a6f;">
                                                        Order Failed
                                                    </h2>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: #fff; text-align: left; border-bottom: 1px solid #eee;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 30px 40px;">
                                                    <h3 style="font-size: 20px; margin: 0; font-weight: 600; color: #000;">
                                                        Hi {name},
                                                    </h3>
                                                    <p style="font-size: 16px; color: #000;">
                                                        We are sorry, but your recent order could not be processed due to a
                                                        payment issue. Please check the details below and try again:
                                                    </p>
                                                    <ul style="font-size: 16px; color: #000; list-style-type: none; padding: 0;">
                                                        <li>Order ID: {order_id}</li>
                                                        <li>Payment Status: Failed</li>
                                                    </ul>
                                                    <p style="font-size: 16px; color: #000; margin-top: 20px;">
                                                        If you have any questions or need assistance, feel free to contact us.
                                                    </p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
        
                            <!-- Footer -->
                            <tr>
                                <td>
                                    <table width="600" cellspacing="0" cellpadding="0" border="0" align="center"
                                        style="background: rgba(0,0,0,0.04); text-align: center; position: relative;">
                                        <tbody>
                                            <tr>
                                                <td style="padding: 30px 0; font-size: 20px; color: #000;">
                                                    Need more help? <br>
                                                    <a href="{frontend_url}" style="color:#0b4a6f;">Contact Us</a>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 0px 20px 30px; font-size: 13px; color: #999;">
                                                    © {current_year}, Blissful Moments. All Rights Reserved.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <a href="{frontend_url}"
                                                        style="display: block; position: absolute; right: 0; bottom: 10px;">
                                                        <img style="width: 70px;" src="{footer_logo}" alt="Blissful Moments Logo">
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </body>
        
                </html>
            ',
            'replacements' => json_encode([
                '{name}' => 'Customer Name',
                '{order_id}' => 'Order ID',
                '{failure_reason}' => 'Reason for Payment Failure',
            ]),
        ]);
    }
}
