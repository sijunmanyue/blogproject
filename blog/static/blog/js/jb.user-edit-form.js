$(function () {
    $('#editForm button').click(function () {
        console.log($('.u-has-error').size());
        if ($('.u-has-error').size() === 0) {
            let nickname = $('input[name="nickname"]').val(),
            email = $('input[name="email"]').val(),
            avatar = $('input[name="avatar"]'),
            gender = $('input[name="gender"]:checked').val(),
            f_avatar = avatar.get(0).files[0],
            formData = new FormData();

            formData.append('nickname', nickname);
            formData.append('email', email);
            formData.append('avatar', f_avatar);
            formData.append('gender', gender);


            $.ajax({
                   url: "/blog/user/do_edit/",
                   data: formData,
                   type: "post",
                   dataType: "json",
                   cache: false,        //上传文件无需缓存
                   processData: false,  //用于对data参数进行序列化处理 这里必须false
                   contentType: false,  //必须
                   headers:{"X-CSRFToken":$.cookie('csrftoken')},
                   success: function (result) {
                       if (result.status) {
                           layer.msg(result.message, {icon: 6});
                       } else {
                           layer.msg(result.message, {icon: 5});
                       }
                   },
             });
        }
    });
});