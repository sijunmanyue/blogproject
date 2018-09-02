
$(function () {
    // 添加密码的规则校验
    $.validator.addMethod('password', function (value, element, params) {
        let password_regex = /^[A-Za-z]\w{7,19}$/;
        return password_regex.test(value);
    }, '请输入以字母开头的8到20位字母、数字、下划线的组合');


    // 添加用户名的规则校验
    $.validator.addMethod('regex_username', function (value, element, params) {
        let password_regex = /^[A-Za-z]\w{7,19}$/;
        return password_regex.test(value)
    }, '请输入以字母开头的8到20位字母、数字、下划线的组合');

        // 添加用户名的规则校验
    $.validator.addMethod('check_username', function (value, element, params) {
        let pass = false;
        $.ajax({
            type:'post',
            url:'/blog/user/check_username/',
            async: false,
            data:{username:value},
            success:function (result) {
                console.log(result);
                pass = result.valid;
            },
            error:function (result) {
                pass = false;
            }
         });
        return pass;
    }, '用户名已经存在，请重新输入');

    // 初始化validator
    $.HSCore.components.HSValidation.init('.js-validate', {
        rules: {
          reg_confirm_password: {
            equalTo: '#reg_password'
          },
          reg_password: 'password',
          reg_username: {
              regex_username: true,
              check_username: true
          }
        }
    });

    // 用户登录
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
                    }
                },
                error:function (result) {
                    console.log(result);
                }
            });
        }
    });


    // 用户注册
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
                    }
                },
                error:function (result) {
                    console.log(result);
                }
            });
        } else {
            console.log('error');
        }
    });

    $('#send-email').click(function() {
        let email = $('#forgotPassword input[name="email"]').val(),
            captcha = $('#forgotPassword input[name="captcha"]').val();
        if (email === '' || captcha ==='') {
            return;
        }
        $.ajax({
            method:'post',
            url:'/blog/user/forget_password/',
            data: {email:email, captcha:captcha},
            success:function (result) {
                if (result.status) {
                    layer.msg('邮件已发送');
                } else {
                    layer.msg(result.message);
                }
            }
        });
    });
});