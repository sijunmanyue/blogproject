$(function () {
        var domousedown = function (e) {
            let startX = e.clientX;
            let maxSlidingDis = $('#slidingUnlock').innerWidth() - $('#slidingUnlock-btn').outerWidth();
            $(document).mousemove(function (e) {
               let slidingDis =  e.clientX - startX;
               if (slidingDis < maxSlidingDis) {
                   $('#sliding-route').width(slidingDis + 'px');
               } else {
                   $('#sliding-route').width(maxSlidingDis + 'px');
                   $('#sliding-route').text('验证通过');
                   $('#slidingUnlock-btn').removeClass('icon-double-right').addClass('icon-xuanzhong');

                   $(document).unbind('mousemove');
                   $('#send-email').removeClass('disabled');
               }
            });

            $(document).mouseup(function () {
                if ($('#slidingUnlock-btn').hasClass('icon-xuanzhong')) {
                    $(document).unbind('mousemove');
                } else {
                    doreset();
                }
            });
        };

        var doreset = function() {
            $('#send-email').addClass('disabled');
            $(document).unbind('mousemove');
            $('#sliding-route').width('0px').text('');
            $('#slidingUnlock-btn').bind('mousedown', domousedown).removeClass('icon-xuanzhong').addClass('icon-double-right');
        };

        $('#slidingUnlock-btn').bind('mousedown', domousedown).dblclick(doreset);
    });