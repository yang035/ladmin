<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/4/5
 * Time: 12:57
 */

namespace App\Repositories\Admin;


use App\Models\Admin\System\UserModel;

class UserRepository
{
public function getUserLists(){
    return UserModel::where('id','>',0)
        ->orderBy('id','desc')
        ->take(10)
        ->get();
}
}