<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>
    <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="/adminlte/css/AdminLTE.min.css">
    <link rel="stylesheet" href="/adminlte/css/skins/_all-skins.min.css">
    <link rel="stylesheet" href="/adminlte/css/font-awesome.min.css">
    <link rel="stylesheet" href="/adminlte/css/ionicons.min.css">
    <link rel="stylesheet" href="/adminlte/css/font.sourcesanspro.css">
    <link rel="stylesheet" href="/plugins/layer/skin/layer.css">
    <link rel="stylesheet" href="/fecar/css/index.css">
    @yield('styles')
<!-- Scripts -->
    <script>
        window.Laravel = {!! json_encode([
            'csrfToken' => csrf_token(),
        ]) !!};
    </script>

</head>

<body class="hold-transition skin-blue">

<div class="wrapper">
    @if (Auth::guest())
        <li><a href="{{ route('login') }}">Login</a></li>
        <li><a href="{{ route('register') }}">Register</a></li>
    @else
        <header class="main-header">
            <a class="logo">
                <span class="logo-mini">e</span>
                <span class="logo-lg">{{Auth::user()->name}}</span>
            </a>

            <nav class="navbar navbar-static-top">
                <a href="" class="sidebar-toggle" data-toggle="offcanvas" role="button">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </a>

                <a class="navbar-brand" href="{{ url('/') }}">
                    {{ config('app.name', 'Laravel') }}
                </a>

                <div class="navbar-custom-menu">
                    <ul class="nav navbar-nav">
                        <li class="messages-menu js-btn-message">
                            <a href="#" title="消息列表">
                                <i class="fa fa-envelope-o"></i>
                                <span class="label label-success js-message-count"></span>
                            </a>
                        </li>
                        <li class="dropdown user user-menu mr-lg">
                            <a href="" class="dropdown-toggle" data-toggle="dropdown" role="button">
                                <span class="hidden-xs">{{Auth::user()->name}}</span>
                            </a>
                            <ul class="dropdown-menu m-user">
                                <li class="wrap">
                                    <a href="/login" class="item js-user-leave">离开</a>
                                    <a target="tab" href="/password/reset" class="item js-user-modpwd">修改密码</a>
                                    <a href="{{ route('logout') }}"
                                       onclick="event.preventDefault();
                                                     document.getElementById('logout-form').submit();">
                                        退出
                                    </a>

                                    <form id="logout-form" action="{{ route('logout') }}" method="POST" style="display: none;">
                                        {{ csrf_field() }}
                                    </form>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
            <script class="js-be-url" type="text/plain">
            {
                "userLeave": "",
                "userLogin": "http://127.0.0.1/webmock/post.php",
                "userModpwd": "http://127.0.0.1/webmock/post.php",
                "userLogout": "http://127.0.0.1/webmock/post.php"
            }
			</script>
        </header>

        <form autocomplete="off" class="m-user-leave form-horizontal js-layer-leave pt-lg dn" action="{:U('Home/Public/leaveLogin')}" method="post">
            <div class="form-group col-md-12 mt-lg">
                <label class="control-label col-md-4">当前帐号</label>
                <div class="col-md-7">
                    <input class="form-control" type="text" disabled value="{$_SESSION[C('SESSION_PREFIX')]['admin_auth']['username']}" name="username">
                    <input class="form-control" type="hidden" value="{$_SESSION[C('SESSION_PREFIX')]['admin_auth']['username']}" name="username">
                </div>
            </div>
            <div class="form-group col-md-12">
                <label class="control-label col-md-4">请输入密码</label>
                <div class="col-md-7">
                    <input class="form-control js-pwd" type="password" name="password">
                </div>
            </div>
            <div class="text-center">
                <button class="mt-md btn btn-primary js-user-leave-login" type="submit">登录</button>
            </div>
        </form>

        @include('admin.partials.navbar')



        <div class="content-wrapper">
            <section class="m-tab">
                <div class="wrap">
                    <div class="m-tab-nav prev js-tab-prev">
                        <span class="fa fa-angle-double-left"></span>
                    </div>
                    <div class="m-tab-refresh js-tab-refresh">
                        <span class="fa fa-refresh"></span>
                    </div>
                    <div class="m-tab-wrap jsw-main-tab">
                        <ul class="list jsl-main-tab">

                        </ul>
                        <script class="jst-main-tab" type="text/html">
                            <li class="@{{ id }}" title="" data-id="@{{ id }}">
                                <span class="js-title">加载中...</span>
                                <span class="fa fa-close close"></span>
                            </li>
                        </script>
                    </div>
                    <div class="m-tab-nav next js-tab-next">
                        <span class="fa fa-angle-double-right"></span>
                    </div>
                </div>
            </section>

            <section id="page-content" class="js-main-content">
                <!--  pages will be loaded by ajax here 页面会以异步方式在此载入 -->
                @yield('content')
            </section>

        </div>



        <!-- ----------------------------------------------------------- -->

        <aside class="control-sidebar control-sidebar-dark">
            <p class="control-sidebar-heading text-center">消息</p>

            <div class="jsl-message">
                <!-- message will be loaded asyn here 消息会以异步方式在此载入 -->
            </div>

            {{--<script class="jst-message" type="text/html">--}}
            {{--{{each $adminCitys}}--}}
            {{--{{if $value.is_read}}--}}
            {{--<a target="tab" href="{{ $value.url }}" class="m-message-item" data-id="{{ $value.id }}" data-type="{{ $value.type }}">--}}
            {{--{{else}}--}}
            {{--<a target="tab" href="{{ $value.url }}" class="m-message-item active" data-id="{{ $value.id }}" data-type="{{ $value.type }}">--}}
            {{--{{/if}}--}}
            {{--<p class="tt">{{ $value.title }}</p>--}}
            {{--<p class="time">{{ $value.create_time }}</p>--}}
            {{--<p class="ct">{{ $value.content }}</p>--}}
            {{--</a>--}}
            {{--{{/each}}--}}
            {{--</script>--}}
            {{--<script class="js-be-url" type="text/plain">--}}
            {{--{--}}
            {{--"poll": "{:U('home/index/pushData')}",--}}
            {{--"getMsg": "{:U('home/index/unreadMsg')}",--}}
            {{--"postMsgStatus": "{:U('home/index/changeReadedStatus')}"--}}
            {{--}--}}
            {{--</script>--}}
        </aside>
        <div class="control-sidebar-bg"></div>

        <div class="m-message-pop">
            <div class="fa fa-close close"></div>
            <p>您有<span class="js-num num"></span>条新消息，请点击查看。</p>
        </div>
    @endif
</div>





<script src="/plugins/jQuery/jquery-2.2.3.min.js"></script>
<script src="/bootstrap/js/bootstrap.min.js"></script>
<script src="/plugins/slimScroll/jquery.slimscroll.min.js"></script>
<script src="/adminlte/js/app.js"></script>
<script src="/plugins/layer/layer.js"></script>
<script src="/plugins/artTemplate/template.js"></script>
{{--<script src="/fecar/js/index.js"></script>--}}
<script src="/plugins/jQueryForm/jquery.form.min.js"></script>
<script src="/fecar/js/main.js"></script>

@yield('scripts')

</body>
</html>
