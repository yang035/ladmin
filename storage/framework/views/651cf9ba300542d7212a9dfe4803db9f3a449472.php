<aside class="main-sidebar">
    <section class="sidebar js-router-list">
        <ul class="sidebar-menu">
            <li><a target="tab" href="/admin"><i class="fa fa-home text-aqua js-main-index"></i> <span>首页</span></a></li>

            <?php $__currentLoopData = $tree_menu; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $vo): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <li class="treeview">
                        <a href="#" role="button">
                            <i class="fa <?php echo e($vo['icon']); ?>"></i> <span><?php echo e($vo['name']); ?></span>
                            <span class="pull-right-container">
                                        <i class="fa fa-angle-left pull-right"></i>
                                    </span>
                        </a>

                        <ul class="treeview-menu">
                            <?php $__currentLoopData = $vo['children']; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $v): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                <li><a target="tab" href="admin/<?php echo e($v['url']); ?>"><i class="fa fa-circle-o"></i><?php echo e($v['name']); ?></a></li>
                            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                        </ul>
                    </li>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
        </ul>
    </section>
</aside>