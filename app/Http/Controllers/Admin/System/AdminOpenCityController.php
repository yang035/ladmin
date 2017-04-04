<?php

namespace App\Http\Controllers\Admin\System;

use App\Http\Controllers\Menu\AdminNodeController;
use App\Models\System\AdminOpenCityModel;
use App\Repositories\AdminOpenCityRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminOpenCityController extends Controller
{
    //
    protected $openCity;
    public function __construct(AdminOpenCityRepository $openCity)
    {
        $this->openCity = $openCity;
    }

    public function index(){
        $openCity = $this->openCity->getOpenCityList();
        return view('admin.system.open_city_index')->with('opencities',$openCity);
//        $adminOpenCities = AdminOpenCityModel::where('id','>',0)
//            ->orderBy('id','desc')
//            ->take(10)
//            ->get();
//        $adminOpenCities = AdminOpenCityModel::with('users')
//            ->where('op_admin_id', '=', 1)
//            ->orderBy('id', 'desc')
//            ->get();
//        dd($adminOpenCities);
//        exit();
//        return view('admin.system.open_city_index')->with('opencities',$adminOpenCities);
    }
}
