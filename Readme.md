# The Blissful Moments.

## Overview
The Blissful Moments is a memorial website where individuals can share memories of their loved ones. The platform allows users to create personalized memorial pages, preserving and cherishing the legacy of those who have passed away.

## Features

### User Features
- **User Registration & OTP Verification**: Secure signup process with OTP verification via email.
- **Custom Memorial Page**: Users can create a unique memorial page with a custom URL.
- **URL Change & Backward Compatibility**: If a URL is changed, the old URL redirects to the new one.
- **Online Payment Integration**: Secure payment gateway for subscription plans.
- **Automated Emails & Reminders**: System-generated notifications and reminders for users.
- **Data Retention**: User data is retained for 30 days after plan expiration.
- **Plan Validity**: Subscription plans remain active for one year.

### Admin Panel
- **User Management**: Manage registered users and their activity.
- **Plan Management**: Configure and oversee available subscription plans.
- **Email Logs & Dynamic Templates**: Monitor email communication and customize email templates.
- **Order Management**: Track and manage user subscriptions and payments.
- **Site Configuration**: Modify website settings and preferences.
- **Payment Gateway Configuration**: Manage payment providers and transactions.

## Tech Stack
- **Frontend**: Next.js
- **Backend**: Laravel
- **Database**: MySQL
- **Authentication**: OTP verification via email
- **Payments**: Integrated payment gateway
- **Styling**: Tailwind CSS

## Installation & Setup

### Prerequisites
- Node.js and npm
- PHP and Composer
- MySQL Database
- Laravel and Next.js installed

### Backend (Laravel)
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/the-blissful-moments-backend.git
   cd the-blissful-moments-backend
   ```
2. Install dependencies:
   ```sh
   composer install
   ```
3. Configure environment variables:
   ```sh
   cp .env.example .env
   ```
4. Update the `.env` file:
   - Set `APP_URL` to your local domain or server domain.
   - Configure email SMTP settings for email delivery.
   - Set up the database connection details.
5. Generate application key:
   ```sh
   php artisan key:generate
   ```
6. Run migrations:
   ```sh
   php artisan migrate --seed
   ```
7. Start the Laravel queue worker for email delivery:
   ```sh
   php artisan queue:work
   ```
8. Start the server:
   ```sh
   php artisan serve
   ```

### Frontend (Next.js)
1. ```sh
   cd the-blissful-moments-frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables:
   ```sh
   cp .env.example .env
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

## Contribution
Feel free to contribute to The Blissful Moments. Submit a pull request or report issues on GitHub.

## License
This project is licensed under the MIT License.

