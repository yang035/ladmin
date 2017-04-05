<?php
namespace App\Presenters\Admin;
use App\Repositories\Admin\CityRepository;

/**
 * Created by PhpStorm.
 * User: admin
 * Date: 2017/4/4
 * Time: 10:03
 * 主要处理在Controller之后并且在显示到View之前对数据进行处理操作
 */
class PublicPresenter
{
    protected $city;
    public function __construct(CityRepository $city)
    {
        $this->city = $city;
    }
    function system_city_optgroup( $city_id_str = '') {

        $str = '';
        $arr =[];
        $arr = $this->city->getCityLists()->toArray();
//        print_r($arr);
        if ( $arr ) {
            $city_id_arr = explode(',', $city_id_str);
            $arr = $this->list_to_tree( $arr );

            foreach ( $arr as &$v ) {
                $str .= '<optgroup label="' . $v['name'] . '">';

                foreach ($v['children'] as $val) {
                    $str .= '<option value="' . $val['id'] . '" ' . ( in_array($val['id'], $city_id_arr) ? 'selected' : '' ) . '>' . $val['name'] . '</option>';
                }

                $str .= '</optgroup>';
            }
        }

        return $str;
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