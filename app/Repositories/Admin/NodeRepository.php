<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/4/5
 * Time: 13:39
 */

namespace App\Repositories\Admin;


use App\Models\Admin\Menu\NodeModel;

class NodeRepository
{
    public function getNodeLists()
    {
        return NodeModel::with('stations')->get();
    }
}