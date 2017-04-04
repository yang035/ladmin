<?php

namespace App\Http\Controllers\Admin\System;

use App\Models\System\AdminUserModel;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AdminUserController extends Controller
{
    //
    public function index(){
        $adminUsers = AdminUserModel::where('id','>',0)
            ->orderBy('id','desc')
            ->take(10)
            ->get();
//        dd($adminUsers);exit();
        return view('admin.system.user_index')->with('users',$adminUsers);
    }
}
