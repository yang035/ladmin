@extends('admin.common')

@section('content')
    <div class="box">
        <div class="box-body">

            <div class="col-md-2">
                <div class="box-body">
                    <div class="js-bonsai">
                        {:system_org_tree_html('system/user/index', false)}
                    </div>
                </div>
            </div>
                <div class="col-md-6">
                    <if condition="menu_can('system/user/add')">
                        <div class="btn btn-primary mt-md mb-md js-add">
                            <i class="fa fa-plus"></i>
                            <span>新增</span>
                        </div>
                    </if>
                    <if condition="menu_can('system/user/edit')">
                        <div class="btn bg-olive mt-md mb-md ml-md js-modify">
                            <i class="fa fa-wrench"></i>
                            <span>编辑</span>
                        </div>
                    </if>
                    <if condition="menu_can('system/user/del')">
                        <div class="btn btn-danger mt-md mb-md ml-md js-del">
                            <i class="fa fa-trash"></i>
                            <span>删除</span>
                        </div>
                    </if>
                    <if condition="menu_can('system/user/reset')">
                        <div class="btn bg-purple ml-md mr-lg js-forget">
                            <i class="fa fa-trash"></i>
                            <span>重置密码</span>
                        </div>
                    </if>
                </div>

            <script class="js-be-url" type="text/plain">
                {
                    "add": "{:U('system/user/add')}",
                    "modify": "{:U('system/user/edit')}",
                    "delete": "{:U('system/user/del')}",
                    "forget": "{:U('system/user/reset')}"
                }
                </script>
            <div>
                <div class="row">
                    <div class="col-lg-12">
                        <div class="ibox float-e-margins">

                            <div class="ibox-content">

                                <div class="table-responsive">
                                    @include('admin.partials.errors')
                                    @include('admin.partials.success')
                                    <table id="users-table" class="table table-striped table-bordered table-hover dataTables-example" >


                                        <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>员工姓名</th>
                                            <th>登录账号</th>
                                            <th>联系电话</th>
                                            <th>所属组织</th>
                                            <th>岗位名称</th>
                                            <th>岗位属性</th>
                                            <th>车检机构</th>
                                            <th>状态</th>
                                            <th>操作人</th>
                                        </tr>
                                        </thead>
                                        <tbody class="js-tr-single">
                                        @foreach ($users as $vo)
                                            <tr data-id="{{$vo['id']}}">
                                                <td>{{$vo['id']}}</td>
                                                <td>{{$vo['realname']}}</td>
                                                <td>{{$vo['username']}}</td>
                                                <td>{{$vo['mobile']}}</td>
                                                <td>{{$vo['org_id']}}</td>
                                                <td>{{$vo['station_id']}}</td>
                                                <td>{{$vo['station_property'] }}</td>
                                                <td>{{$vo['institution_name']}}</td>
                                                <td>@if($vo['status'])禁用@else正常@endif</td>
                                                <td>{{$vo['op_admin_id']}} {{$vo['operate_time']}}</td>
                                            </tr>
                                        @endforeach
                                        </tbody>
                                        <tfoot>
                                        <tr>
                                            <th>ID</th>
                                            <th>员工姓名</th>
                                            <th>登录账号</th>
                                            <th>联系电话</th>
                                            <th>所属组织</th>
                                            <th>岗位名称</th>
                                            <th>岗位属性</th>
                                            <th>车检机构</th>
                                            <th>状态</th>
                                            <th>操作人</th>
                                        </tr>
                                        </tfoot>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
@stop
@section('scripts')
    <script src="/fecar/js/system/staff.js"></script>
    <script>
        $(document).ready(function(){
            $('#users-table').DataTable({
                pageLength: 10,
                responsive: true,
                dom: '<"html5buttons"B>lTfgitp',
                buttons: [
                    { extend: 'copy'},
                    {extend: 'csv'},
                    {extend: 'excel', title: 'ExampleFile'},
                    {extend: 'pdf', title: 'ExampleFile'},

                    {extend: 'print',
                        customize: function (win){
                            $(win.document.body).addClass('white-bg');
                            $(win.document.body).css('font-size', '10px');

                            $(win.document.body).find('table')
                                .addClass('compact')
                                .css('font-size', 'inherit');
                        }
                    }
                ]

            });

        });

    </script>

@stop