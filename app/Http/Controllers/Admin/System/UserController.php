<?php

namespace App\Http\Controllers\Admin\System;

use App\Repositories\Admin\CheckInstitutionRepository;
use App\Repositories\Admin\UserRepository;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    //
    protected $user;
    protected $institution;
    public function __construct(UserRepository $user,CheckInstitutionRepository $institution)
    {
        $this->user = $user;
        $this->institution = $institution;
    }

    public function index(){
        $adminUsers = $this->user->getUserLists()->toArray();
        $checkInstitution = $this->institution->getCheckInstitution()->toArray();
        foreach ($adminUsers as &$val) {
            $tmp = explode(',', $val['institution_id']);
            foreach ($tmp as $value) {
                $tmparr[] = $checkInstitution[$value-1]['institution_name'];
            }
            $val['institution_name'] = implode(',', $tmparr);
            unset($tmparr);
        }
//        print_r($adminUsers);exit();
        return view('admin.system.user_index')->with('users',$adminUsers);
    }
}
