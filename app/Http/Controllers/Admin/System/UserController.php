<?php

namespace App\Http\Controllers\Admin\System;

use App\Repositories\Admin\UserRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    //
    protected $user;
    public function __construct(UserRepository $user)
    {
        $this->user = $user;
    }

    public function index(){
        $adminUsers = $this->user->getUserLists();
        return view('admin.system.user_index')->with('users',$adminUsers);
    }
}
