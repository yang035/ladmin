<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::get('admin','Admin\Menu\NodeController@index');
Route::get('admin/system/city/index','Admin\System\OpenCityController@index');
Route::get('admin/system/user/index','Admin\System\UserController@index');
Route::get('admin/system/city/create','Admin\System\OpenCityController@create');

Route::get('user','Admin\System\UserController@index');

Route::group(['namespace'=>'Admin','middleware' => ['auth']], function() {
    Route::get('/', function () {
        return redirect('/admin');
    });
});







