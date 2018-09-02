$(function () {

    $('.comments').on('click', '.comment-item > ul a.appreciate', function () {
        let $this = $(this);
        let comment_id = $this.parents('.comment-item').get(0).dataset.commentid;
        $.ajax({
            url:'/blog/comment/appreciate/',
            method:'get',
            data:{'comment_id': comment_id},
            success:function (result) {
                if (result.status){
                    $this.find('span.count').text(result.count);
                } else {
                    console.log(result.message)
                }
            }
        });
    });

    $('.comments').on('click', '.comment-item > ul a.dislike', function () {
        let $this = $(this);
        let comment_id = $this.parents('.comment-item').get(0).dataset.commentid;
        $.ajax({
            url:'/blog/comment/dislike/',
            method:'get',
            data:{'comment_id': comment_id},
            success:function (result) {
                if (result.status){
                    $this.find('span.count').text(result.count);
                } else {
                    console.log(result.message)
                }
            }
        });
    });

    $('.comments').on('click', '.reply-item a.dislike', function () {
        let $this = $(this);
        let reply_id = $this.parents('.reply-item').get(0).dataset.replyid;
        $.ajax({
            url:'/blog/reply/dislike/',
            method:'get',
            data:{'reply_id':reply_id},
            success:function (result) {
                if (result.status){
                    $this.find('span.count').text(result.count);
                } else {
                    console.log(result.message)
                }
            }
        });
    });

    $('.comments').on('click', '.reply-item a.appreciate', function () {
        let $this = $(this);
        let reply_id = $this.parents('.reply-item').get(0).dataset.replyid;
        $.ajax({
            url:'/blog/reply/appreciate/',
            method:'get',
            data:{'reply_id':reply_id},
            success:function (result) {
                if (result.status){
                    $this.find('span.count').text(result.count);
                } else {
                    console.log(result.message)
                }
            }
        });
    });


    $('.comments').on('click', '.reply-item .to-reply', function () {
        $(this).parents('.reply-list').find('.reply-box').hide();
        $(this).parents('.reply-item').find('.reply-box').show();
    });

    $('.comments').on('click', '.comment-item>ul .to-reply', function () {
        $(this).parents('.comment-item').children('.reply-box').show();
    });

    $('.comments').on('click', '.reply-item .btn-cancel', function () {
        $(this).parents('.reply-item').find('textarea').val('');
        $(this).parents('.reply-item').find('.reply-box').hide();
    });

    $('.comments').on('click', '.comment-item>ul .btn-cancel', function () {
        $(this).parents('.comment-item').children('.reply-box').find('textarea').val('');
        $(this).parents('.comment-item').children('.reply-box').hide();
    });

    $('.comments').on('click', '.btn-reply', function () {
        let $this = $(this);
        let msg = $(this).parents('.comment-item').get(0);
        let article_id = $('#article_id').val();
        let reply_content = $(this).parent().prev().val();
        let comment_id = msg.dataset.commentid;
        let reply_to = msg.dataset.replyto;
        let type = msg.dataset.type;
        let data = {'type':type, 'content':reply_content,'article_id':article_id, 'comment_id':comment_id, 'reply_to':reply_to};

        console.log(data);
        $.ajax({
            url:'/blog/reply/',
            method:'post',
            data:data,
            success:function (result) {
                console.log(result);
                if (result.status){
                    $this.parents('.comment-item').find('.reply-list').append($(result.content)).show();
                    $this.parents('.reply-box').hide();
                } else {
                    console.log(result.message)
                }
            }
        });
    });

    $('.comment-box .btn-reply.active').click(function () {
        if ($('.comment-box textarea').val() !== '') {
            let $this = $(this);
            let article_id = $('#article_id').val();
            let content = $('.comment-box textarea').val();

            let data = {content:content, article_id:article_id};

            console.log(data);
            $.ajax({
                url:'/blog/comment/',
                method:'post',
                data:data,
                success:function (result) {
                    if (result.status){
                        $('.comments').prepend($(result.content));
                        $('.comments .comment-item:first-child').addClass('new-comment');
                        $('.comment-box textarea').val('');
                    } else {
                        console.log(result.message)
                    }
                }
            });
        }
    });


    $('.comment-box .btn-cancel').click(function () {
        $('.comment-box textarea').val('');
    });

    let global_count = 0;
    let global_page_size = 10;

    let get_more = function (page_size) {
        console.log('======load more======');
        let filter_ids = '';
        $('.new-comment').each(function () {
            filter_ids += (',' + $(this).get(0).dataset.commentid);
        });
        $.ajax({
            url:'/blog/comment/load_more/',
            method:'get',
            data:{'article_id': $('#article_id').val(), 'count': global_count, 'page_size': global_page_size, 'filter_ids':filter_ids},
            success:function (result) {
                if (result.status){
                    if (result.length > 0) {
                        global_count += result.length;
                        $('.comments').append($(result.content));
                    }
                    if (!result.has_more) {
                        $('#load-more').addClass('disabled').text('没有更多数据了');
                    }
                } else {
                    console.log(result.message)
                }
            }
        });
    };

    get_more(global_page_size);

    $('#load-more').click(function () {
        get_more(global_page_size);
    });


});