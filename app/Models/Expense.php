<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Expense extends Model
{
    use HasFactory;

    // Colonnes modifiables
    protected $fillable = ['department', 'salaries', 'marketing', 'logistics'];
}
