<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie' , 'storage/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => [
        'http://admin.blissful-moments.app.local',
        'http://blissful-moments.app.local',
        'http://blissful-moments.app.local:3000',
        'http://localhost',
        'http://localhost:3000',
        'http://admin.theblissfulmoments.com',
        'https://staging.theblissfulmoments.com',
        'https://theblissfulmoments.com',
        'https://ca93-2401-4900-1c70-b34b-e84c-917e-c222-4c2a.ngrok-free.app',
    ],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,

];
