<?php

namespace App\Http\Controllers\Admin\System;

use App\Models\System\AdminCityModel;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminCityController extends Controller
{
    //
    public function index()
    {
        $adminCities = AdminCityModel::where('id', '>', 0)
            ->orderBy('id', 'desc')
            ->take(10)
            ->get();
        return view('admin.system.city_index')->with('cities',$adminCities);
    }
}
