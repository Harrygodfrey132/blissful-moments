<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Plan extends Model
{
    use Sluggable , SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'status',
        'features',
        'stripe_product_id'
    ];

    protected $casts = [
        'features' => 'array',
    ];

    /**
     * Return the sluggable configuration array for this model.
     *
     * @return array
     */
    public function sluggable(): array
    {
        return [
            'slug' => [
                'source' => 'name'
            ]
        ];
    }

    public function planVariations()
    {
        return $this->hasMany(PlanVariation::class);
    }

    public function scopePlansSearchFilter(Builder $query, $data)
    {

        // Filter by search term if provided
        if (!empty($data['search'])) {
            $query->where(function ($subQuery) use ($data) {
                $subQuery->where('name', 'like', '%' . $data['search'] . '%')
                    ->orWhere('description', 'like', '%' . $data['search'] . '%')
                    ->orWhere('price', 'like', '%' . $data['search'] . '%');
            });
        }

        // Filter by status if provided
        if (isset($data['status']) && $data['status'] !== '') {
            $query->where('status', $data['status']);
        }

        // Filter by start date if provided
        if (!empty($data['start_date'])) {
            $query->whereDate('created_at', '>=', $data['start_date']);
        }

        // Filter by end date if provided
        if (!empty($data['end_date'])) {
            $query->whereDate('created_at', '<=', $data['end_date']);
        }

        return $query;
    }
}
