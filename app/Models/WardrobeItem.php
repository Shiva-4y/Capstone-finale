<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WardrobeItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'description',
        'category',
        'subcategory',
        'color',
        'size',
        'brand',
        'condition',
        'price',
        'is_for_sale',
        'image_path',
        'tags'
    ];

    protected $casts = [
        'tags' => 'array',
        'is_for_sale' => 'boolean',
        'price' => 'decimal:2'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
