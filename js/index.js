window.onload = function () {
    let header = document.getElementById('header')
    let arrowNode = document.querySelector('#header .headerMain .arrow')
    let listLiNodes = document.querySelectorAll('#header .headerMain .nav .items')
    let listLiUpNodes = document.querySelectorAll('#header .headerMain .nav .items .up')
    let content = document.getElementById('content');
    let contentList = document.querySelector('#content .list');
    let contentLi = document.querySelectorAll('#content .list>li');
    let ulNodes = document.querySelectorAll('#wrap #content .list .about div .about3 .item>ul')
    let homeLiNodes = document.querySelectorAll('#wrap #content .list .home div .homeList>li');
    let homeIconNodes = document.querySelectorAll('#wrap #content .list .home div .homeIcon>li');
    let teamUlNode = document.querySelector('#wrap #content .list .team div .team3>ul');
    let teamLiNodes = document.querySelectorAll('#wrap #content .list .team div .team3>ul>li');
    let sideBarNavLis = document.querySelectorAll('#wrap #sideBarNav>ul>li')
    let musicNode = document.querySelector('#wrap #header .headerMain .music')
    let audioNode = document.querySelector('#wrap #header .headerMain .music>audio')
    let mask = document.getElementById('mask')
    let maskDiv = document.querySelectorAll('#wrap #mask>div')
    let maskLine = document.querySelector('#wrap #mask .maskLine')
    let maskDown = document.querySelector('#wrap #mask .maskDown')
    //定义变量标识控制当前显示屏的下标
    let now = 0;
    //设置定时器标识，控制滚轮事件别滑太快
    let srollTimer = null
    let autoTimer = null
    let outTimer = null
    let preIndex = 0
    let oldIndex = 0;
    let autoIndex = 0;

    //绑定出入场动画
    let animationArr = [
        // 第一屏入场动画
        {
            inAni: function () {
                let homeList = document.querySelector('#wrap #content .list .home div .homeList')
                let homeIcon = document.querySelector('#wrap #content .list .home div .homeIcon')

                homeList.style.transform = 'translateY(0px)'
                homeIcon.style.transform = 'translate(-50%,0)'

                homeList.style.opacity = '1'
                homeIcon.style.opacity = '1'
            },
            outAni: function () {
                let homeList = document.querySelector('#wrap #content .list .home div .homeList')
                let homeIcon = document.querySelector('#wrap #content .list .home div .homeIcon')

                homeList.style.transform = 'translateY(-200px)'
                homeIcon.style.transform = 'translate(-50%,200px)'

                homeList.style.opacity = '0'
                homeIcon.style.opacity = '0'
            }
        },
        // 第二屏入场动画
        {
            inAni: function () {
                let plane1 = document.querySelector('#wrap #content .list .course .plane1')
                let plane2 = document.querySelector('#wrap #content .list .course .plane2')
                let plane3 = document.querySelector('#wrap #content .list .course .plane3')

                plane1.style.left = '300px'
                plane1.style.top = '-100px'

                plane2.style.left = '-100px'
                plane2.style.top = '200px'

                plane3.style.left = '300px'
                plane3.style.top = '400px'

            },
            outAni: function () {
                let plane1 = document.querySelector('#wrap #content .list .course .plane1')
                let plane2 = document.querySelector('#wrap #content .list .course .plane2')
                let plane3 = document.querySelector('#wrap #content .list .course .plane3')

                plane1.style.left = '0px'
                plane1.style.top = '-200px'

                plane2.style.left = '-300px'
                plane2.style.top = '400px'

                plane3.style.left = '400px'
                plane3.style.top = '300px'
            }
        },
        // 第三屏入场动画
        {
            inAni: function () {
                let pencel1 = document.querySelector('#wrap #content .list .works .pencel1')
                let pencel2 = document.querySelector('#wrap #content .list .works .pencel2')
                let pencel3 = document.querySelector('#wrap #content .list .works .pencel3')

                pencel1.style.left = '500px'
                pencel1.style.top = '0'

                pencel2.style.left = '300px'
                pencel2.style.top = '250px'

                pencel3.style.left = '650px'
                pencel3.style.top = '300px'

            },
            outAni: function () {
                let pencel1 = document.querySelector('#wrap #content .list .works .pencel1')
                let pencel2 = document.querySelector('#wrap #content .list .works .pencel2')
                let pencel3 = document.querySelector('#wrap #content .list .works .pencel3')

                pencel1.style.left = '600px'
                pencel1.style.top = '-100px'

                pencel2.style.left = '300px'
                pencel2.style.top = '200px'

                pencel3.style.left = '750px'
                pencel3.style.top = '400px'

            }
        },
        // 第四屏入场动画
        {
            inAni: function () {
                let item1 = document.querySelector('#wrap #content .list .about div .about3 .item:first-child')
                let item2 = document.querySelector('#wrap #content .list .about div .about3 .item:last-child')

                item1.style.transform = 'rotate(0)'
                item2.style.transform = 'rotate(0)'

            },
            outAni: function () {
                let item1 = document.querySelector('#wrap #content .list .about div .about3 .item:first-child')
                let item2 = document.querySelector('#wrap #content .list .about div .about3 .item:last-child')

                item1.style.transform = 'rotate(45deg)'
                item2.style.transform = 'rotate(-45deg)'

            }

        },
        // 第五屏入场动画
        {
            inAni: function () {
                let team1 = document.querySelector('#wrap #content .list .team div .team1')
                let team2 = document.querySelector('#wrap #content .list .team div .team2')

                team1.style.transform = 'translate(0)'
                team2.style.transform = 'translate(0)'

            },
            outAni: function () {
                let team1 = document.querySelector('#wrap #content .list .team div .team1')
                let team2 = document.querySelector('#wrap #content .list .team div .team2')

                team1.style.transform = 'translate(-200px)'
                team2.style.transform = 'translate(200px)'

            }

        }
    ]

    // 默认所有页面开始都执行出场动画
    for (let i = 0; i < 5; i++) {
        animationArr[i].outAni()
    }
    //默认执行第一屏入场动画 
    setTimeout(() => {
        animationArr[0].inAni()
    }, 2000);

    //绑定头部小尖尖的位置
    // 侧边栏导航控制页面切换逻辑
    headerBind()
    //绑定音频点击播放并且切换图标样式逻辑
    audio()
    //动态绑定内容区高度逻辑
    contentBind()
    //动态生成第四屏的li图片炸裂列表
    //第四屏图片炸裂逻辑
    photoBoom()
    // 第五屏myCanvas气泡逻辑
    bubble()
    // 开机动画逻辑
    loading()
    autoHome3D()


    // 解决改变窗口尺寸导致内容区和小尖尖位置不对问题
    window.onresize = function(){
        arrowNode.style.left = listLiNodes[now].offsetLeft + listLiNodes[now].offsetWidth / 2 - arrowNode.offsetWidth / 2 + 'px';
        content.style.height = document.documentElement.offsetHeight - header.offsetHeight + 'px'
        for (let i = 0; i < contentLi.length; i++) {
            contentLi[i].style.height = document.documentElement.offsetHeight - header.offsetHeight + 'px'
        }
    }

    // 开机动画
    function loading() {
        // 定义变量记录加载完成的图片数
        let count = 0;
        let arr = ['bg1.jpg', 'bg2.jpg', 'bg3.jpg', 'bg4.jpg', 'bg5.jpg', 'about1.jpg', 'about2.jpg', 'about3.jpg', 'about4.jpg', 'worksimg1.jpg', 'worksimg2.jpg', 'worksimg3.jpg', 'worksimg4.jpg', 'team.png', 'greenLine.png'];
        // 循环加载图片
        for (let i = 0; i < arr.length; i++) {
            let img = new Image()
            img.src = 'img/' + arr[i]
            img.onload = function () {
                count++
                maskLine.style.width = Math.round(count / arr.length) * 100 + '%'
            }
        }
        // 检测进度条加载完毕后使上下遮罩层退去，最终移除遮罩层容器
        maskLine.addEventListener('transitionend', function () {
            maskDiv[0].style.height = '0'
            maskDiv[2].style.height = '0'
            // maskDown.style.height = '0'
            maskLine.remove()
        })
        maskDiv[0].addEventListener('transitionend', function () {
            mask.remove()
            home3D()
        })

    }

    // 第五屏canvas气泡动画
    function bubble() {
        let timer1 = null
        let timer2 = null
        let myCanvas = null
        teamUlNode.onmouseleave = function () {
            for (let j = 0; j < teamLiNodes.length; j++) {
                teamLiNodes[j].style.opacity = '1'
            }
            // 移除myCanvas
            removeMyCanvas()
        }
        for (let i = 0; i < teamLiNodes.length; i++) {
            teamLiNodes[i].onmouseenter = function () {
                for (let j = 0; j < teamLiNodes.length; j++) {
                    teamLiNodes[j].style.opacity = '0.5'
                }
                this.style.opacity = '1'
                // 创建myCanvas
                createMyCanvas()
                // 确定画布位置
                myCanvas.style.left = this.offsetLeft + 'px'
            }
        }
        function createMyCanvas() {
            if (!myCanvas) {
                // 创建画布
                myCanvas = document.createElement('canvas')
                // 指定画布大小
                myCanvas.width = teamLiNodes[0].offsetWidth
                myCanvas.height = 300
                // 插入画布
                teamUlNode.appendChild(myCanvas)
                // 执行绘制动画
                drawBubble()
            }
        }

        function removeMyCanvas() {
            clearInterval(timer1)
            clearInterval(timer2)
            myCanvas.remove()
            myCanvas = null
        }

        function drawBubble() {
            let ctx = myCanvas.getContext('2d')
            // 创建数组保存随机生成的圆的信息
            let arr = []
            // 设置循环定时器循环绘制圆形
            timer1 = setInterval(() => {
                ctx.clearRect(0, 0, myCanvas.width, myCanvas.height)
                //for循环改变绘制圆形的半径以及透明度
                for (let j = 0; j < arr.length; j++) {
                    arr[j].deg += 10
                    arr[j].x = arr[j].startX + Math.sin(arr[j].deg * Math.PI / 180) * arr[j].scale * 1.2
                    arr[j].y = arr[j].startY - (arr[j].deg * Math.PI / 180) * arr[j].scale
                    if (arr[j].y < 50) {
                        arr.splice(j, 1)
                    }
                }
                for (let i = 0; i < arr.length; i++) {
                    ctx.beginPath()
                    ctx.fillStyle = 'rgba(' + arr[i].red + ',' + arr[i].green + ',' + arr[i].blue + ',' + arr[i].alpha + ')';
                    ctx.arc(arr[i].x, arr[i].y, arr[i].r, 0, Math.PI * 2)
                    ctx.fill()
                }
            }, 20);
            // 定义循环定时器循环生成圆信息
            timer2 = setInterval(() => {
                // 定义生成圆的半径
                let r = Math.floor(Math.random() * 6) + 5;
                // 定义生成圆的X坐标
                let x = Math.floor(Math.random() * myCanvas.offsetWidth)
                // 定义生成圆的Y坐标
                let y = myCanvas.height + r

                // 定义生成圆的颜色
                let red = Math.floor(Math.random() * 256)
                let green = Math.floor(Math.random() * 256)
                let blue = Math.floor(Math.random() * 256)
                // 定义生成圆的透明度
                let alpha = 1
                //曲线运动
                let startX = x
                let startY = y
                let deg = 0
                // 随机生成曲线运动比例，范围不得超过画布大小
                let scale = Math.floor(Math.random() * 30) + 30
                arr.push({
                    x: x,
                    y: y,
                    r: r,
                    red: red,
                    green: green,
                    blue: blue,
                    alpha: alpha,
                    //曲线运动
                    startX: startX,
                    startY: startY,
                    deg: deg,
                    scale: scale
                })
            }, 30);
        }
    }

    //自动3D翻页逻辑
    function home3D() {
        for (let i = 0; i < homeIconNodes.length; i++) {
            homeIconNodes[i].index = i
            homeIconNodes[i].onclick = function () {
                // 点击停止自动轮播
                clearInterval(autoTimer)
                // 点击停止延时开启轮播
                clearTimeout(outTimer)
                for (let i = 0; i < homeIconNodes.length; i++) {
                    homeIconNodes[i].className = ''
                }
                homeIconNodes[this.index].className = 'active'
                //通过小圆点导航控制页面切换
                if (oldIndex < this.index) {
                    // 执行右显示左隐藏翻页逻辑
                    homeLiNodes[this.index].className = 'rightShow'
                    homeLiNodes[oldIndex].className = 'leftHide'
                }
                else if (oldIndex > this.index) {
                    // 执行左显示右隐藏翻页逻辑
                    homeLiNodes[this.index].className = 'leftShow'
                    homeLiNodes[oldIndex].className = 'rightHide'
                }
                // 更新下标
                oldIndex = this.index
                autoIndex = this.index
                autoHome3D()
            }
        }
    }

    function autoHome3D() {
        setTimeout(() => {
            autoTimer = setInterval(() => {
                autoIndex++
                if (autoIndex === homeIconNodes.length) {
                    autoIndex = 0
                }
                homeLiNodes[autoIndex].className = 'rightShow'
                homeLiNodes[oldIndex].className = 'leftHide'
                // 更新小圆点
                for (let i = 0; i < homeIconNodes.length; i++) {
                    homeIconNodes[i].className = ''
                }
                homeIconNodes[autoIndex].className = 'active'
                //更新下标
                oldIndex = autoIndex
            }, 3000);
        }, 3000);

    }

    //滚轮事件控制屏幕切换
    //兼容绑定滚轮事件
    //兼容低版本浏览器没有dom2,兼容火狐浏览器
    if (document.addEventListener) {
        document.addEventListener('DOMMouseScroll', function (event) {
            clearTimeout(srollTimer)
            srollTimer = setTimeout(function () {
                fun(event)
            }, 200)
        })
    }
    //兼容IE/chrome
    document.onmousewheel = function (event) {
        clearTimeout(srollTimer)
        srollTimer = setTimeout(function () {
            fun(event)
        }, 200)
    }
    // 滚轮事件回调函数
    function fun(event) {
        event = event || window.event
        let flag = ''
        if (event.wheelDelta) {
            event.wheelDelta > 0 ? flag = 'up' : flag = 'down'
        }
        else if (event.detail) {
            event.detail < 0 ? flag = 'up' : flag = 'down'
        }
        preIndex = now
        if (preIndex === 0 && flag === 'up' || preIndex === listLiUpNodes.length - 1 && flag === 'down') {
            return;
        }
        if (now !== 0) {
            clearInterval(autoTimer)
        } else {
            autoHome3D()
        }
        switch (flag) {
            case "up":
                now--
                move(now)
                break
            case "down":
                now++
                move(now)
                break
        }
        event.preventDefault && event.preventDefault()
        return false;
    }

    //点击绑定导航按钮切换样式
    function headerBind() {
        //第一个up宽度
        listLiUpNodes[0].style.width = '100%'
        //默认小尖尖位置
        arrowNode.style.left = listLiNodes[0].offsetLeft + listLiNodes[0].offsetWidth / 2 - arrowNode.offsetWidth / 2 + 'px';
        //为每个items绑定点击相应事件
        for (let i = 0; i < listLiNodes.length; i++) {
            listLiNodes[i].index = i
            listLiNodes[i].onclick = function () {
                preIndex = now
                now = this.index
                //点击items改变样式
                if (preIndex === now) {
                    return
                }
                if (now !== 0) {
                    clearInterval(autoTimer)
                } else {
                    autoHome3D()
                }
                move(now)
            }
        }
        for (let i = 0; i < sideBarNavLis.length; i++) {
            sideBarNavLis[i].index = i
            sideBarNavLis[i].onclick = function () {
                preIndex = now
                now = this.index
                //点击items改变样式
                if (preIndex === now) {
                    return
                }
                if (now !== 0) {
                    clearInterval(autoTimer)
                } else {
                    autoHome3D()
                }
                move(now)
            }
        }
    }
    //显示屏切换逻辑
    function move(now) {
        for (let j = 0; j < listLiUpNodes.length; j++) {
            listLiUpNodes[j].style.width = ''
        }
        //this 下 up宽度 == 100%
        listLiUpNodes[now].style.width = '100%'
        //小尖位置
        arrowNode.style.left = listLiNodes[now].offsetLeft + listLiNodes[now].offsetWidth / 2 - arrowNode.offsetWidth / 2 + 'px';
        //屏幕切换
        contentList.style.top = -now * (document.documentElement.offsetHeight - header.offsetHeight) + 'px'
        // 侧边栏小圆点样式更新
        for (let i = 0; i < sideBarNavLis.length; i++) {
            sideBarNavLis[i].className = ''
        }
        sideBarNavLis[now].className = 'active'
        // 移动触发入场动画
        animationArr[now].inAni()
        // 移动触发上一次的出场动画
        animationArr[preIndex].outAni()
    }

    //动态绑定内容区高度逻辑
    function contentBind() {
        //设置内容区高
        content.style.height = document.documentElement.offsetHeight - header.offsetHeight + 'px'
        //设置内容区中每屏内容高度
        for (let i = 0; i < contentLi.length; i++) {
            contentLi[i].style.height = document.documentElement.offsetHeight - header.offsetHeight + 'px'
        }
    }

    //图片炸裂逻辑
    function photoBoom() {
        for (let i = 0; i < ulNodes.length; i++) {
            changeImg(ulNodes[i]);
        }

        function changeImg(ul) {
            //定义变量保存ul的宽高，方便计算其中的li的宽高
            let w = ul.offsetWidth / 2
            let h = ul.offsetHeight / 2
            //定义变量存储ul标签中data-src属性中对应的li需要用到的图片资源信息
            let imgSrc = ul.dataset.src

            //循环创建多个li
            for (let i = 0; i < 4; i++) {
                //创建li节点
                let liNode = document.createElement('li')
                //创建图片节点
                let imgNode = new Image()
                // 为li元素节点设置宽高
                liNode.style.width = w + 'px'
                liNode.style.height = h + 'px'
                //为图片节点赋值路径信息
                imgNode.src = imgSrc
                //指定每次添加的图片在相应li中显示的位置
                imgNode.style.left = -(i % 2) * w + 'px'
                imgNode.style.top = -Math.floor(i / 2) * h + 'px'
                //将图片节点添加到li节点中
                liNode.appendChild(imgNode)
                //将li节点添加到ul中
                ul.appendChild(liNode)
            }
            //获取ul下的所有img节点
            let imgNodes = ul.querySelectorAll('img')
            //为ul绑定鼠标移入移出事件
            ul.onmouseover = function () {
                //移入修改每张图片位置，显示背景图
                imgNodes[0].style.top = h + 'px'
                imgNodes[1].style.left = -2 * w + 'px'
                imgNodes[2].style.left = w + 'px'
                imgNodes[3].style.top = -2 * h + 'px'
            }
            ul.onmouseout = function () {
                imgNodes[0].style.top = '0px'
                imgNodes[1].style.left = -w + 'px'
                imgNodes[2].style.left = '0px'
                imgNodes[3].style.top = -h + 'px'
            }

        }
    }

    // 音频播放逻辑
    function audio() {
        musicNode.onclick = function () {
            if (audioNode.paused) {
                musicNode.style.background = 'url(img/musicon.gif)'
                audioNode.play()
            } else {
                musicNode.style.background = 'url(img/musicoff.gif)'
                audioNode.pause()
            }
        }
    }
}