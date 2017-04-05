<?php

/**
 * Created by PhpStorm.
 * User: admin
 * Date: 2017/4/3
 * Time: 22:33
 */


namespace App\Repositories\Admin;

use App\Models\Admin\System\OpenCityModel;

class OpenCityRepository
{
//    protected $openCity;
//
//    public function __construct(AdminOpenCityModel $openCity)
//    {
//        $this->$openCity = $openCity;
//    }

    public function getOpenCityList()
    {
        return OpenCityModel::with('users')
//            ->where('op_admin_id', '=', 1)
            ->orderBy('id', 'desc')
            ->get();
    }
}