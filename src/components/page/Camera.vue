<template>
<div class="container">
    <div width="100%" height="400px" id='ActiveXDivOne'></div>
    <select id="Resolution" name="D2" @change="ChangeResolution"></select>
    <input id="Button2" type="button" value="拍照" @click="Capture" />
</div>
</template>

<script>
export default {
    name: 'hello',
    data() {
        return {
            isIE: true, //是否IE
            isSecondDev: false, //是否有两个canvas显示视频
            camidMain: 0, //主头ID
            camidSub: 0 //副头ID  
        }
    },
    mounted() {
        window['GetDeviceResolution'] = val => {
            this.GetDeviceResolution(val)
        }
        window['StartVideo'] = val => {
            this.StartVideo(val)
        }
        window['GetDevName'] = val => {
            this.GetDevName(val)
        }
        this.loadActiveX()
    },
    methods: {
        loadActiveX() {
            if (!!window.ActiveXObject || "ActiveXObject" in window) {
                this.isIE = true;
                //IE浏览器加载控件
                document.getElementById("ActiveXDivOne").innerHTML = "<OBJECT id=\"axCam_Ocx\"  classid=\"clsid:D5BD5B4A-4FC0-4869-880B-27EE9869D706\" width=\"500px\" height=\"400px\" ></OBJECT>";
                OcxInit();
            } else {
                this.isIE = false;
                if (!window.WebSocket) {
                    alert("WebSocket not supported by this browser!");
                }
                //其他浏览器加载控件
                document.getElementById("ActiveXDivOne").innerHTML = " <canvas id=\"cameraCanvas\" width=\"500px\" height=\"400px\" style=\"border:1px solid #d3d3d3;\">";
                WsInit(500, 400, 500, 400, true);
            }

            if (document.addEventListener) {
                document.addEventListener('DOMMouseScroll', scrollFunc, false);
            } //W3C 
            window.onmousewheel = document.onmousewheel = scrollFunc
        },
        GetDeviceResolution(data) {
            var obj = document.getElementById("Resolution");
            var max = 0;
            var maxIndex = 0;
            obj.options.length = 0;
            if (data.length > 0) {
                for (var i = 0; i < data.length / 2; i++) {
                    var objOption = document.createElement("option");
                    var ww = data[i * 2];
                    var hh = data[i * 2 + 1];
                    objOption.text = "" + ww + "*" + hh;
                    objOption.value = i;
                    obj.options.add(objOption);
                    if (max < ww) {
                        max = ww;
                        maxIndex = i;
                    }
                }
                obj.options[maxIndex].selected = true;
            }
        },
        //切换分辨率
        ChangeResolution() {
            CloseCam();
            var obj = document.getElementById("Resolution");
            var restr = obj[obj.selectedIndex].text;
            var pos = restr.lastIndexOf("*");
            var width = parseInt(restr.substring(0, pos));
            var height = parseInt(restr.substring(pos + 1, restr.length));
            StartCam(camidMain, width, height);
        },
        //开启摄像头
        StartVideo() {
            var obj = document.getElementById("Resolution");
            var restr = obj[obj.selectedIndex].text;
            var pos = restr.lastIndexOf("*");
            var width = parseInt(restr.substring(0, pos));
            var height = parseInt(restr.substring(pos + 1, restr.length));
            StartCam(camidMain, width, height);
        },
        //抓图拍照
        Capture() {
            CaptureImage(1);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
</style>
