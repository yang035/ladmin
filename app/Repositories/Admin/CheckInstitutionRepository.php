<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/4/5
 * Time: 14:49
 */

namespace App\Repositories\Admin;


use App\Models\Admin\System\CheckInstitutionModel;

class CheckInstitutionRepository
{
    public function getCheckInstitution()
    {
        return CheckInstitutionModel::all();
    }
}