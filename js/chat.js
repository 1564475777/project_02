$(function () {
    // 初始化右侧滚动条
    // 这个方法定义在scroll.js中
    resetui()

    // 发送按钮绑定鼠标点击事件
    $('#btnSend').on('click', function () {
        var text = $('#ipt').val().trim();
        if (text.length <= 0) {
            return $('#ipt').val('')
        }
        //输入聊天内容，并将聊天内容追加到页面上显示
        $('#talk_list').append(' <li class="right_word"><img src="img/person02.png" /> <span>' + text + '</span></li>')
        $('#ipt').val('')
        resetui()
        getMsg(text)
    })

    function getMsg(text) {
        $.ajax({
            method: 'GET',
            url: 'http://ajax.frontend.itheima.net:3006/api/robot',
            data: {
                spoken: text
            },
            success: function (res) {
                // console.log(res);
                if (res.message === 'success') {
                    //接受聊天信息
                    var msg = res.data.info.text;
                    $('#talk_list').append('<li class="left_word"><img src="img/person01.png" /> <span>' + msg + '</span></li>')
                    // 重置滚动条位置
                    resetui();
                    // 调用getvoice
                    getVoice(msg);
                }

            }
        })
    }

    //把文字转化为语音进行播放
    function getVoice(text) {
        $.ajax({
            method: 'GET',
            url: 'http://ajax.frontend.itheima.net:3006/api/synthesize',
            data: {
                text: text
            },
            success: function (res) {
                // console.log(res);
                if (res.status === 200) {
                    $('#voice').attr('src', res.voiceUrl);
                }

            }
        })
    }

    // 为文本框绑定keyup事件
    $('#ipt').on('keyup', function (e) {
        // console.log(e.keyCode);
        if (e.keyCode === 13) {
            $('#btnSend').click();
        }
    })
})