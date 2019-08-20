var rect = 25; // 方块 9*9
var rectCount = 9; // 方块数量
var gap = (rect / 4); //5; //间距/间隙
var brim = (rect / 2); // 10; // 边
var font_size = rect * 0.65; // 字体大小
var font_x = rect / 10; // 字体X
var font_y = rect * 0.75; // 字体Y
var canvasWidth = brim * 2 + rect * rectCount + gap * (rectCount - 1); //canvas宽高

var xy; // 坐标对象
var xyList = []; // 坐标记录(JSON)
var number = ["14", "13", "09", "02", "21", "24", "20", "33", "29", "32", "01", "06", "08", "28", "05", "27", "17",
    "07", "19", "31", "11", "18", "23", "22", "15", "03", "12", "10", "16", "04", "25", "26", "30"];
var inNumberXY = new Array(); // 中奖数字坐标数组
var region = ["西北", "北", "东北", "西", "中", "东", "西南", "南", "东南"]; // 9区
var region0 = ["14", "02", "20", "32"]; // 西北
var region1 = ["13", "21", "33", "01"]; // 北
var region2 = ["09", "24", "29", "06"]; // 东北
var region3 = ["08", "28", "05", "27"]; // 西
var region4 = ["17"]; // 中
var region5 = ["07", "19", "31", "11"]; // 东
var region6 = ["18", "15", "10", "25"]; // 西南
var region7 = ["23", "03", "16", "26"]; // 南
var region8 = ["22", "12", "04", "30"]; // 东南

// 后台数据
var WinNumber = null;
var WinNumberList = [];

// 获取 统计期数
function getCountSize() {
    return $("#countSize").val();
}

// button - todo
function todo() {
    WinNumber = null;
    WinNumberList = [];
    emptyEle();
    // getCountSize();
    into();
}

function queryWinList() {
    WinNumberList = [];
    var pageSize = getCountSize();
    $.ajax({
        async: true,//false true
        data: "pageSize=" + pageSize,
        dataType: "json",
        success: function (result, status, xhr) {
            WinNumberList = result;
            // console.log(WinNumberList);
            // console.log(result);
            // console.log(status);
            // console.log(xhr);
        },
        type: "post",
        url: "/getWinNumberTopList"
    });
    // console.log(WinNumberList);
    return WinNumberList;
}

/**
 * 获取后台2-5个分析数据
 * 默认为3个
 * */
$(function () {
    into();
});

function into() {
    var pageSize = getCountSize();
    emptyEle();
    queryWinList();
    console.log(WinNumberList);

    var divMsaData = $("#msaData");
    for (var i = 0; i < pageSize; i++) {
        // 包装单条分析数据
        var divData = $("<div></div>");
        divData.attr("id", "divData" + (i + 1));
        divData.addClass("divData");

        var cvsNumDiv = $("<div></div>");
        cvsNumDiv.attr("id", "cvsNumDiv" + (i + 1));
        cvsNumDiv.addClass("cvsNumDiv col-md-12");
        var cvsNum = $("<canvas></canvas>");
        cvsNum.attr("id", "cvsNum" + (i + 1));
        cvsNum.attr("width", "300px");
        cvsNum.attr("height", "50px");
        cvsNum.addClass("cvsNum");
        cvsNum.appendTo(cvsNumDiv);

        var cvsImgDiv = $("<div></div>");
        cvsImgDiv.attr("id", "cvsImgDiv" + (i + 1));
        cvsImgDiv.addClass("cvsImgDiv col-md-12");
        var cvsImg = $("<canvas></canvas>");
        cvsImg.attr("id", "cvsImg" + (i + 1));
        cvsImg.attr("width", "300px");
        cvsImg.attr("height", "300px");
        cvsImg.addClass("cvsImg");
        cvsImg.appendTo(cvsImgDiv);

        cvsNumDiv.appendTo(divData);
        cvsImgDiv.appendTo(divData);
        divData.appendTo(divMsaData);
    }
    intoContext(pageSize);

    var divMsaCount = $("#msaCount");
    var cvsCount = $("<canvas></canvas>");
    cvsCount.attr("id", "cvsCount");
    cvsCount.attr("width", "800px");
    cvsCount.attr("height", "800px");
    cvsCount.addClass("cvsCount");
    cvsCount.appendTo(divMsaCount);
    drawCount();
}

// 加载
function intoContext(cvsCount) {

    console.log(WinNumberList);

    rect = 25; // 方块 9*9
    rectCount = 9; // 方块数量
    gap = (rect / 4); //5; //间距/间隙
    brim = (rect / 2); // 10; // 边
    font_size = rect * 0.65; // 字体大小
    font_x = rect / 10; // 字体X
    font_y = rect * 0.75; // 字体Y
    canvasWidth = brim * 2 + rect * rectCount + gap * (rectCount - 1); //canvas宽高

    for (var i = 0; i < cvsCount; i++) {
        WinNumber = WinNumberList[i];

        var cvsNum = document.getElementById("cvsNum" + (i + 1));
        if (!cvsNum.getContext) return;
        var ctxNum = cvsNum.getContext("2d");
        draw_cvsNum(ctxNum, WinNumber);

        var cvsImg = document.getElementById("cvsImg" + (i + 1));
        if (!cvsImg.getContext) return;
        var ctxImg = cvsImg.getContext("2d");

        draw(ctxImg, WinNumber);
        write(ctxImg);
    }
}

// 渲染中奖数字 w=300 h=50 by canvas Number
function draw_cvsNum(ctxNum, WinNumber) {
    // console.log(WinNumber);
    var ctxNumX = 100;
    var ctxNumXP = 30;
    var ctxNumY = 25;
    var radis = 12;
    var startAngle = 0;
    var endAngle = 2 * Math.PI;
    var anticlockwise = false;

    ctxNum.fillStyle = "rgba(101,255,134,0.2)"; // "#3dd17a";
    ctxNum.fillRect(10, 10, 70, 30);
    // context.font="italic small-caps bold 12px arial";// font01
    ctxNum.font = "bold 15px sans-serif"; // Georgia sans-serif Times New Roman
    ctxNum.fillStyle = "#000000";
    ctxNum.fillText(WinNumber.issue, 13, 30);

    for (var i = 0; i < 7; i++) {
        ctxNum.beginPath();
        ctxNum.arc(ctxNumX + (ctxNumXP * i), ctxNumY, radis, startAngle, endAngle, anticlockwise);
        ctxNum.fillStyle = (i < 6) ? "#ff6329" : "#2274FF";
        ctxNum.fill();
        ctxNum.stroke();
    }

    var ctxNumTX = 91.5;
    var ctxNumTXP = 30;
    var ctxNumTY = 30;
    ctxNum.font = "bold 14px sans-serif"; // Georgia sans-serif Times New Roman
    ctxNum.fillStyle = "#ffffff";
    for (var i = 0; i < 7; i++) {
        if (i < 6)
            ctxNum.fillText(WinNumber.redNumbers[i], ctxNumTX + (ctxNumTXP * i), ctxNumTY);
        else
            ctxNum.fillText(WinNumber.blueNumber, ctxNumTX + (ctxNumTXP * i), ctxNumTY);
    }
}

// 画图
function draw(ctx, WinNumber) {

    xyList = [];
    ctx.strokeStyle = "#5874D7";

    // 上
    for (var i = 0; i < 4; i++) {

        /* ----- ----- ----- */ // 左
        var x1 = brim + (i * rect) + (i * gap);
        var y0 = brim + (i * rect) + (i * gap);

        xy = {
            x: x1,
            y: y0
        };
        xyList.push(xy);

        ctx.strokeRect(x1, y0, rect, rect);

        /* ----- ----- ----- */ // 中
        var x2 = brim + ((5 - 1) * rect) + ((5 - 1) * gap);
        xy = {
            x: x2,
            y: y0
        };
        xyList.push(xy);

        ctx.strokeRect(x2, y0, rect, rect);

        /* ----- ----- ----- */ // 右
        var x3 = brim + ((rectCount - 1 - i) * rect) + ((rectCount - 1 - i) * gap);
        xy = {
            x: x3,
            y: y0
        };
        xyList.push(xy);

        ctx.strokeRect(x3, y0, rect, rect);
    }

    // 中
    for (var i = 0; i < rectCount; i++) {
        var x1 = brim + (i * rect) + (i * gap);
        var y1 = brim + (rect * 5);
        xy = {
            x: x1,
            y: y1
        };
        xyList.push(xy);

        ctx.strokeRect(x1, y1, rect, rect);
    }

    // 下
    for (var i = 0; i < 4; i++) {

        /* ----- ----- ----- */ // 左
        var x1 = brim + ((4 - 1 - i) * rect) + ((4 - 1 - i) * gap);
        var y0 = brim + ((5 + i) * rect) + ((5 + i) * gap);
        xy = {
            x: x1,
            y: y0
        };
        xyList.push(xy);

        ctx.strokeRect(x1, y0, rect, rect);

        /* ----- ----- ----- */ // 中
        var x2 = brim + ((5 - 1) * rect) + ((5 - 1) * gap);
        xy = {
            x: x2,
            y: y0
        };
        xyList.push(xy);

        ctx.strokeRect(x2, y0, rect, rect);

        /* ----- ----- ----- */ // 右
        var x3 = brim + ((5 + i) * rect) + ((5 + i) * gap);
        xy = {
            x: x3,
            y: y0
        };
        xyList.push(xy);

        ctx.strokeRect(x3, y0, rect, rect);

    }

    // 渲染中奖
    // WinNumber.redNumbers
    var inNum = null;
    if (null != WinNumber) {
        // console.log(WinNumber);
        inNum = WinNumber.redNumbers;
    }
    getInNum(ctx, inNum);

}

// 入数
function write(ctx) {
    // console.log("方块的数量：" + xyList.length);
    // console.log("数字的数量：" + number.length);
    if (!xyList.length == number.length) return;
    ctx.fillStyle = "#000000";
    ctx.globalAlpha = 1;
    ctx.font = "" + font_size + "px sans-serif";
    for (var i = 0; i < xyList.length; i++) {
        ctx.fillText(number[i], xyList[i].x + font_x, xyList[i].y + font_y);
    }
}

// 中奖号码
function getInNum(ctx, inNum) {
    // var inNum = $("#inNum").val();
    if (null == inNum || "" == inNum) return;
    // console.log("中奖号码为：" + inNum);

    // inNums = inNum.split(",");
    inNums = inNum;

    // if (6 != inNums.length)
    // 	alert("中奖号码个数不对!");

    // console.log("数组长度：" + inNums.length);
    // console.log("数组：" + inNums);

    for (var i = 0; i < inNums.length; i++) {
        for (var j = 0; j < number.length; j++) {
            if (33 < inNums[i] || 1 > inNums[i]) {
                alert("号码填写错误:" + inNums[i] + "");
                var inNum = $("#inNum").val("");
                return;
            }
            if (inNums[i] == parseInt(number[j])) {
                inNumberXY[i] = j;
            }
        }
    }
    // console.log("inNumberXY:" + inNumberXY);
    drawInNum(ctx, inNumberXY);
}

// 渲染中奖数字
function drawInNum(ctx, inNumberXY) {
    ctx.fillStyle = "#ff6140";
    ctx.globalAlpha = 0.2;
    for (var i = 0; i < inNumberXY.length; i++) {
        var tempxy = xyList[inNumberXY[i]];
        // console.log("数字坐标的数组位置：" + inNumberXY[i]);
        // console.log("数字坐标：" + tempxy.x + ":" + tempxy.y);
        ctx.fillRect(tempxy.x, tempxy.y, rect, rect);
    }
}

//
function drawCount() {
    rect = 50; // 方块 9*9
    rectCount = 9; // 方块数量
    gap = (rect / 4); //5; //间距/间隙
    brim = (rect / 2); // 10; // 边
    font_size = rect * 0.65; // 字体大小
    font_x = rect / 10; // 字体X
    font_y = rect * 0.75; // 字体Y
    canvasWidth = brim * 2 + rect * rectCount + gap * (rectCount - 1); //canvas宽高

    // console.log("cvsCount.canvasWidth = " + canvasWidth);

    var cvsCount = document.getElementById("cvsCount");
    if (!cvsCount.getContext) return;
    var ctxCount = cvsCount.getContext("2d");
    draw(ctxCount, null);
    write(ctxCount);

    // 综合渲染数据 WinNumberList
    var inNum = [];
    for (var i = 0; i < WinNumberList.length; i++) {
        inNum = inNum.concat(WinNumberList[i].redNumbers);
    }
    // console.log(inNum);
    getInNum(ctxCount, inNum);
    // drawInNum(ctxCount,);
}


// 初始化子元素
function emptyEle() {
    $("#msaData").empty();
    $("#msaCount").empty();
}
