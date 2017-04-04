<?php if(Session::has('success')): ?>
    <div class="alert alert-success">
        <button type="button" class="close" data-dismiss="alert">×</button>
        <strong>
            <i class="fa fa-check-circle fa-lg fa-fw"></i> Success. 
        </strong>
        <?php echo e(Session::get('success')); ?>

    </div>
<?php endif; ?>