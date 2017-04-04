<?php

namespace App\Http\Controllers\Admin\Menu;

use App\Models\Menu\AdminNodeModel;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminNodeController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    //
    public function index(){
//        $adminOpenCities = AdminOpenCityModel::where('id','>',0)
//            ->orderBy('id','desc')
//            ->take(10)
//            ->get();
        $adminNodes = AdminNodeModel::with('stations')->get();
//        $aa = $adminNodes->toArray();
//            ->where('id', '>', 1)
//            ->orderBy('id', 'desc')
//            ->get();
        $sss = $this->list_to_tree($adminNodes);
//        print_r($sss);
//        exit();

        return view('admin.layout')->with('tree_menu',$sss);
    }

    public function list_to_tree($object) {
        // 创建Tree
        $tree = [];
        if (is_object($object)){
            foreach ($object as $k=> $value) {
                $list[$k] = $value['original'];

            }
        }
        if($list) {
            // 创建基于主键的数组引用
            $refer = [];
            foreach ($list as $k => $v) {
                $refer[ $v['id'] ] =& $list[$k];
            }

            foreach ($list as $k => $v) {
                // 判断是否存在parent
                $pid = $v['pid'];
                if ( isset($refer[$pid]) ) {
                    $parent =& $refer[$pid];
                    $parent['children'][] =& $list[$k];
                } else {
                    $tree[] =& $list[$k];
                }
            }
        }

        return $tree;
    }


}
