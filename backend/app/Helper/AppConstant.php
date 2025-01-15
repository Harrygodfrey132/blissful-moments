<?php

namespace App\Helper;

class AppConstant
{
    public const IN_ACTIVE = 0;
    public const ACTIVE = 1;
    public const EXPIRING_SOON = 2;
    public const EXPIRED = 3;

    public const PENDING = 0;
    public const ACCEPTED = 1;
    public const DECLINED = 2;
    public const SUBMITTED = 3;
    public const ACCEPTED_CHANGES = 4;
    public const DECLINED_CHANGES = 5;
}
