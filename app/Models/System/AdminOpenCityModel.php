<?php

namespace App\Models\System;

use Illuminate\Database\Eloquent\Model;

class AdminOpenCityModel extends Model
{
    //
    protected $table = 'admin_open_city';
    const CREATED_AT = 'open_time';//修改默认添加时间字段
    const UPDATED_AT = 'operate_time';//修改默认修改时间字段
    protected $dateFormat = 'U';//修改时间显示格式

    public function users()
    {
        return $this->hasMany('App\Models\System\AdminUserModel', 'op_admin_id', 'id');
    }

}
