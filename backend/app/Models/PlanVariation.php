<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PlanVariation extends Model
{
    protected $fillable = ['plan_id', 'duration', 'price' , 'stripe_price_id'];

    public function plan()
    {
        return $this->belongsTo(Plan::class);
    }
}
