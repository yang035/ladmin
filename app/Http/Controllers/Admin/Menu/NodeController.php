<?php

namespace App\Http\Controllers\Admin\Menu;

use App\Repositories\Admin\NodeRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class NodeController extends Controller
{
    protected $nodes;
    public function __construct(NodeRepository $nores)
    {
        $this->middleware('auth');
        $this->nodes = $nores;
    }

    //
    public function index(){
        $adminNodes = $this->nodes->getNodeLists();
        $sss = $this->list_to_tree($adminNodes);

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
