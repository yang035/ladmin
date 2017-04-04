<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>首页</title>
    <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="/adminlte/css/AdminLTE.min.css">
    <link rel="stylesheet" href="/adminlte/css/skins/_all-skins.min.css">
    <link rel="stylesheet" href="/adminlte/css/font-awesome.min.css">
    <link rel="stylesheet" href="/adminlte/css/ionicons.min.css">
    <link rel="stylesheet" href="/adminlte/css/font.sourcesanspro.css">
    <link rel="stylesheet" href="/plugins/layer/skin/layer.css">
    <link rel="stylesheet" href="/fecar/css/index.css">
    <?php echo $__env->yieldContent('styles'); ?>

</head>

<body class="hold-transition skin-blue">

<div class="wrapper">
<?php if(!Auth::guest()): ?>
    <header class="main-header">
        <a class="logo">
            <span class="logo-mini">e</span>
            <span class="logo-lg"><?php echo e(Auth::user()->name); ?></span>
        </a>

        <nav class="navbar navbar-static-top">
            <a href="" class="sidebar-toggle" data-toggle="offcanvas" role="button">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
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
                            <span class="hidden-xs"><?php echo e(Auth::user()->name); ?></span>
                        </a>
                        <ul class="dropdown-menu m-user">
                            <li class="wrap">
                                <a href="/login" class="item js-user-leave">离开</a>
                                <a target="tab" href="/password/reset" class="item js-user-modpwd">修改密码</a>
                                <a href="" class="item js-user-logout">退出</a>
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

        <?php echo $__env->make('admin.partials.navbar', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>



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
                        <li class="{{ id }}" title="" data-id="{{ id }}">
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
            <?php echo $__env->yieldContent('content'); ?>
        </section>

    </div>

    <!-- ----------------------------------------------------------- -->

    <aside class="control-sidebar control-sidebar-dark">
        <p class="control-sidebar-heading text-center">消息</p>

        <div class="jsl-message">
            <!-- message will be loaded asyn here 消息会以异步方式在此载入 -->
        </div>

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
    </aside>
    <div class="control-sidebar-bg"></div>

    <div class="m-message-pop">
        <div class="fa fa-close close"></div>
        <p>您有<span class="js-num num"></span>条新消息，请点击查看。</p>
    </div>
    <?php endif; ?>
</div>





<script src="/plugins/jQuery/jquery-2.2.3.min.js"></script>
<script src="/bootstrap/js/bootstrap.min.js"></script>
<script src="/plugins/slimScroll/jquery.slimscroll.min.js"></script>
<script src="/adminlte/js/app.js"></script>
<script src="/plugins/layer/layer.js"></script>
<script src="/plugins/artTemplate/template.js"></script>

<script src="/plugins/jQueryForm/jquery.form.min.js"></script>
<script src="/fecar/js/main.js"></script>

<?php echo $__env->yieldContent('scripts'); ?>

</body>
</html>
