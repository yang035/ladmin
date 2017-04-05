
<div class="w-layer mt-lg">
    <form class="box-body form-horizontal js-layer-form" action="{:U('system/city/edit')}" method="post">
        <div class="form-group">
            <label class="col-md-2 control-label require">城市名称</label>
            <div class="col-md-4">
                <input type="text" class="form-control" name="name" value="{$item['name']}" readonly>
                <input type="hidden" class="form-control" name="id" value="{$item['id']}">
            </div>
        </div>
        <div class="form-group">
            <label class="col-md-2 control-label require">开通日期</label>
            <div class="col-md-4">
                <input type="text" class="form-control js-date-picker" name="open_time"  value="{$item['open_time']|date='Y-m-d',###}">
            </div>
        </div>
        <div class="form-group">
            <label class="col-md-2 control-label require">状态</label>
            <div class="col-md-9">
                <label class="m-radio">
                    <input type="radio" name="status" value="0" required {$item["status"] == 0?"checked":"" }>
                    <span>正常</span>
                </label>
                <label class="m-radio">
                    <input type="radio" name="status" value="1" required {$item["status"] == 1?"checked":"" }>
                    <span>禁用</span>
                </label>
            </div>
        </div>

        <div class="layui-layer-footer">
            <div class="col-md-12">
                <button type="submit" class="btn bg-olive pull-right">保存</button>
            </div>
        </div>

    </form>
</div>
