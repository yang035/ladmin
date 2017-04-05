<?php

namespace App\Models\Admin\System;

use Illuminate\Database\Eloquent\Model;

class UserModel extends Model
{
    //
    protected $table = 'admin_user';
    const CREATED_AT = 'create_time';//修改默认添加时间字段
    const UPDATED_AT = 'operate_time';//修改默认修改时间字段
    protected $dateFormat = 'U';//修改时间显示格式

}
