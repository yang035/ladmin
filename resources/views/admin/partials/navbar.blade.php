<aside class="main-sidebar">
    <section class="sidebar js-router-list">
        <ul class="sidebar-menu">
            <li><a target="tab" href="/admin"><i class="fa fa-home text-aqua js-main-index"></i> <span>首页</span></a></li>

            @foreach($tree_menu as $vo)
                    <li class="treeview">
                        <a href="#" role="button">
                            <i class="fa {{$vo['icon']}}"></i> <span>{{$vo['name']}}</span>
                            <span class="pull-right-container">
                                        <i class="fa fa-angle-left pull-right"></i>
                                    </span>
                        </a>

                        <ul class="treeview-menu">
                            @foreach($vo['children'] as $v)
                                <li><a target="tab" href="admin/{{$v['url']}}"><i class="fa fa-circle-o"></i>{{$v['name']}}</a></li>
                            @endforeach
                        </ul>
                    </li>
            @endforeach
        </ul>
    </section>
</aside>