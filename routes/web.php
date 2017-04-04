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
Route::get('/', function () {
    return redirect('/admin');
});



Route::get('admin','Admin\Menu\AdminNodeController@index');
Route::get('admin/system/city/index','Admin\System\AdminOpenCityController@index');

Route::get('user','Admin\System\AdminUserController@index');

//Route::group(['namespace'=>'Admin','middleware' => ['auth']], function() {
////    Auth::routes();
//// Login Routes...
//    Route::get('login', ['as' => 'login', 'uses' => 'Auth\LoginController@showLoginForm']);
//    Route::post('login', ['as' => 'login.post', 'uses' => 'Auth\LoginController@login']);
//    Route::post('logout', ['as' => 'logout', 'uses' => 'Auth\LoginController@logout']);
//
//// Registration Routes...
//    Route::get('register', ['as' => 'register', 'uses' => 'Auth\RegisterController@showRegistrationForm']);
//    Route::post('register', ['as' => 'register.post', 'uses' => 'Auth\RegisterController@register']);
//
//// Password Reset Routes...
//    Route::get('password/reset', ['as' => 'password.reset', 'uses' => 'Auth\ForgotPasswordController@showLinkRequestForm']);
//    Route::post('password/email', ['as' => 'password.email', 'uses' => 'Auth\ForgotPasswordController@sendResetLinkEmail']);
//    Route::get('password/reset/{token}', ['as' => 'password.reset.token', 'uses' => 'Auth\ResetPasswordController@showResetForm']);
//    Route::post('password/reset', ['as' => 'password.reset.post', 'uses' => 'Auth\ResetPasswordController@reset']);
//});







