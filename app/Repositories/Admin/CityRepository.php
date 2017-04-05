<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/4/5
 * Time: 14:49
 */

namespace App\Repositories\Admin;


use App\Models\Admin\System\CityModel;

class CityRepository
{
public function getCityLists(){
    return CityModel::all();
}
}