    <?php
    // routes/breadcrumbs.php

    use Diglactic\Breadcrumbs\Breadcrumbs;
    use Diglactic\Breadcrumbs\Generator as BreadcrumbTrail;

    // Home
    Breadcrumbs::for('dashboard', function (BreadcrumbTrail $trail) {
        $trail->push('Home', route('dashboard'));
    });

    // Home > Users
    Breadcrumbs::for('users.index', function (BreadcrumbTrail $trail) {
        $trail->parent('dashboard');
        $trail->push('Users', route('users.index'));
    });

    // Home > Plans
    Breadcrumbs::for('plans.index', function (BreadcrumbTrail $trail) {
        $trail->parent('dashboard');
        $trail->push('Plans', route('plans.index'));
    });

    // Home > Plans > Create

    Breadcrumbs::for('plans.create', function (BreadcrumbTrail $trail) {
        $trail->parent('dashboard');
        $trail->push('Setup Plan', route('plans.create'));
    });

    // // Home > Users > [User Name]
    // Breadcrumbs::for('users.show', function (BreadcrumbTrail $trail, $user) {
    //     $trail->parent('users.index');
    //     $trail->push($user->name, route('users.show', $user->id));
    // });
