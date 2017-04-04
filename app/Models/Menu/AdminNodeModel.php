<?php

namespace App\Models\Menu;

use Illuminate\Database\Eloquent\Model;

class AdminNodeModel extends Model
{
    //
    protected $table = 'admin_node';
//    const CREATED_AT = 'open_time';//修改默认添加时间字段
//    const UPDATED_AT = 'operate_time';//修改默认修改时间字段
    protected $dateFormat = 'U';//修改时间显示格式

    public function stations(){
        return $this->belongsToMany('App\Models\Menu\AdminStationModel','admin_station_node','node_id','station_id');
    }
}
