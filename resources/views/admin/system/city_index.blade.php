@extends('admin.layout')

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
                    <span>删除</span
                </div>
            </div>
        </div>

        <script class="js-be-url" type="text/plain">
				{
					"add": "{:U('system/city/add')}",
					"modify": "{:U('system/city/edit')}",
					"delete": "{:U('system/city/del')}"
				}
			</script>


        <div class="box-body mh-table">
            <table class="table table-bordered text-center table-hover">
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
                @foreach ($cities as $city)
                    <tr data-id="{{$city->id}}">
                        <td>{{$city->id}}}</td>
                        <td>{{$city->name}}</td>
                        <td><a target="tab" href="{{$city->id}}">查看</a></td>
                        <td><a target="tab" href="{{$city->id}}">查看</a></td>
                        <td><a target="tab" href="{{$city->id}}">查看</a></td>
                        <td>{{$city->code}}</td>
                        <td>{{$city->fc}}</td>
                        <td>{{$city->status}}</td>
                    </tr>
                @endforeach
                </tbody>
            </table>

            <div class="mt-lg mb-lg">
                {$link}
            </div>
        </div>

    </div>
</div>


@stop