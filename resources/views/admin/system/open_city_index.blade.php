@extends('admin.common')

@section('styles')
    <link href="/inspinia/css/style.css" rel="stylesheet">
@stop
@section('content')
    <div class="box">
        <div class="box-body">

            <div class="box-body">
                <div class="col-md-6">
                    <div class="btn btn-primary mt-md mb-md js-add">
                        <i class="fa fa-plus"></i>
                        <span>新增</span>
                    </div>
                    <div class="btn bg-olive mt-md mb-md ml-md js-modify">
                        <i class="fa fa-wrench"></i>
                        <span>编辑</span>
                    </div>
                    <div class="btn btn-danger mt-md mb-md ml-md js-del">
                        <i class="fa fa-trash"></i>
                        <span>删除</span>
                    </div>
                </div>
            </div>

            <script class="js-be-url" type="text/plain">
				{
					"add": "create",
					"modify": "edit",
					"delete": "del"
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
                                    <table id="posts-table"
                                           class="table table-striped table-bordered table-hover dataTables-example">


                                        <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>城市名称</th>
                                            <th>车检区域</th>
                                            <th>车检时间表</th>
                                            <th>门店地址</th>
                                            <th>开通时间</th>
                                            <th>状态</th>
                                            <th>操作人</th>
                                        </tr>
                                        </thead>
                                        <tbody class="js-tr-single">
                                        @foreach ($opencities as $opencity)
                                            <tr data-id="{{$opencity->id}}">
                                                <td>{{$opencity->id}}</td>
                                                <td>{{$opencity->name}}</td>
                                                <td><a target="tab" href="{{$opencity->id}}">查看</a></td>
                                                <td><a target="tab" href="{{$opencity->id}}">查看</a></td>
                                                <td><a target="tab" href="{{$opencity->id}}">查看</a></td>
                                                <td>{{$opencity->code}}</td>
                                                <td>{{$opencity->fc}}</td>
                                                <td>{{$opencity->status}}</td>
                                            </tr>
                                        @endforeach
                                        </tbody>
                                        <tfoot>
                                        <tr>
                                            <th>ID</th>
                                            <th>城市名称</th>
                                            <th>车检区域</th>
                                            <th>车检时间表</th>
                                            <th>门店地址</th>
                                            <th>开通时间</th>
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
    </div>
@stop
@section('scripts')
    <script src="/plugins/slimScroll/jquery.slimscroll.min.js"></script>
    <script src="/fecar/js/main.js"></script>
    <script src="/fecar/js/system/city.js"></script>
    <script>
        $(document).ready(function () {
            $('#posts-table').DataTable({
                pageLength: 10,
                responsive: true,
                dom: '<"html5buttons"B>lTfgitp',
                buttons: [
                    {extend: 'copy'},
                    {extend: 'csv'},
                    {extend: 'excel', title: 'ExampleFile'},
                    {extend: 'pdf', title: 'ExampleFile'},

                    {
                        extend: 'print',
                        customize: function (win) {
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