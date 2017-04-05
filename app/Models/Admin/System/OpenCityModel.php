<?php

namespace App\Models\Admin\System;

use Illuminate\Database\Eloquent\Model;

class OpenCityModel extends Model
{
    //
    protected $table = 'admin_open_city';
    const CREATED_AT = 'open_time';//修改默认添加时间字段
    const UPDATED_AT = 'operate_time';//修改默认修改时间字段
    protected $dateFormat = 'U';//修改时间显示格式

    public function users()
    {
        return $this->hasMany('App\Models\Admin\System\UserModel', 'op_admin_id', 'id');
    }

}
