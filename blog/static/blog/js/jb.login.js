$(function () {

    $('button.login-btn').click(function () {
        let username = $('#lg_username').val();
        let password = $('#lg_password').val();
        if (username !== '' && password !== '') {
            $.ajax({
                type:'post',
                url:'/blog/user/login/',
                data:{username:username, password:password},
                success:function (result) {
                    if (result.status) {
                        window.location.reload();
                    } else {
                        layer.msg('用户名或密码错误！');
                    }
                },
                error:function (result) {
                    layer.msg('服务器开小差！');
                }
            });
        }
    });

    $('button.register-btn').click(function () {
        let username = $('#reg_username').val();
        let password = $('#reg_password').val();
        let confirmPassword = $('#reg_confirm_password').val();
        if (username !== '' && password !== '' && password === confirmPassword) {
            $.ajax({
                type:'post',
                url:'/blog/user/do_register/',
                data:{username:username, password:password},
                success:function (result) {
                    if (result.status) {
                        window.location.reload();
                    } else {
                        layer.msg('注册失败！');
                    }
                },
                error:function (result) {
                    layer.msg('服务器开小差！');
                }
            });
        } else {
            console.log('error');
        }
    });

});