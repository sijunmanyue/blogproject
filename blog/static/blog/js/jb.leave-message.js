$(function () {
    $('#leaveMessageForm button').click(function () {
        if (global_is_login) {
            let value = $('#message').val();
            if (value === '') {
                layer.msg('请输入您想说的话！');
            } else if (value.replace(/[^\x00-\xff]/g,"aa").length > 60) {
                layer.msg('您的留言太长了！');
            } else {
                $.ajax({
                    method: 'POST',
                    url: '/blog/message/',
                    data: {content: value},
                    success: function (result) {
                        if (result.status) {
                            layer.msg('留言成功！');
                            $('#message').val('');
                        } else {
                            layer.msg('留言失败！');
                        }
                    },
                    error: function () {
                        layer.msg('服务器开小差！');
                    }
                });
            }
        } else {
            layer.msg('请先登录！');
        }
    });
});