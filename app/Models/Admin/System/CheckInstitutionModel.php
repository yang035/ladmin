<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/4/5
 * Time: 17:42
 */

namespace App\Models\Admin\System;


use Illuminate\Database\Eloquent\Model;

class CheckInstitutionModel extends Model
{
    protected $table = 'check_institution';
    public $timestamps = false;
    protected $fillable = ['id', 'institution_name'];
}