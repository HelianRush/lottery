// 全局变量
var xy; // 坐标对象
var xyList = []; // 坐标记录(JSON)
var number = ["14", "13", "09", "02", "21", "24", "20", "33", "29", "32", "01", "06", "08", "28", "05", "27", "17",
    "07", "19", "31", "11", "18", "23", "22", "15", "03", "12", "10", "16", "04", "25", "26", "30"];

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
var WinNumberList = []; // 后台数据集合

// 获取 统计期数
function getCountSize() {
    return $("#countSize").val();
}

// 初始化子元素
function emptyEle() {
    $("#msaData").empty();
    $("#msaCount").empty();
}

function queryWinList() {
    var pageSize = getCountSize();
    $.ajax({
        async: true,//false true
        data: "pageSize=" + pageSize,
        dataType: "json",
        success: function (result, status, xhr) {
            WinNumberList = result;
            into(WinNumberList, pageSize);
        },
        type: "post",
        url: "/getWinNumberTopList"
    });
}

function querySelectWinList(issues) {
    var pageSize = issues.length;
    $.ajax({
        async: true,//false true
        data: "issues=" + issues,
        dataType: "json",
        success: function (result, status, xhr) {
            WinNumberList = result;
            into(WinNumberList, pageSize);
        },
        type: "post",
        url: "/getWinNumberSelectList"
    });
}

// 页面初始化
$(function () {
    queryWinList(); // into
});

// button - click - todo
function todo() {
    queryWinList(); // into
}


function into(WinNumberList, pageSize) {
    console.log("后台数据：");
    console.log(WinNumberList);
    emptyEle(); // 清空
    console.log("HTML数据已清空...");
    // var pageSize = getCountSize(); // 获取加载数据个数
    console.log("设置统计分析数据：" + pageSize);

    // 加载HTML元素
    intoDivMsaData(pageSize);
    console.log("加载HTML元素完成...");
    intoDivMsaCount();
    console.log("加载HTML元素完成...");

    // 加载<canvas>.Context
    for (var i = 0; i < pageSize; i++) {
        // 画图 CvsNum
        var ctxCvsNum = getCtxCvsNum(i);
        drawCvsNum(ctxCvsNum, WinNumberList[i]);
        // console.log("画图 - CvsNum:" + i);

        // 画图 CvsImg
        var ctxCvsImg = getCtxCvsImg(i);
        drawCvsImg(ctxCvsImg, WinNumberList[i]);
        // console.log("画图 - CvsImg:" + i);
    }

    var ctxCvsCount = getCtxCvsCount();
    drawCvsCount(ctxCvsCount, WinNumberList);
    // console.log("画图 - CvsCount:" + i);
}

// ===== ===== ===== ===== =====
// 加载HTML元素
// ===== ===== ===== ===== =====

// 加载 <div> msaData
function intoDivMsaData(pageSize) {
    var divMsaData = $("#msaData");
    for (var i = 0; i < pageSize; i++) {
        // <div> divData
        var divData = $("<div></div>");
        divData.attr("id", "divData" + (i + 1));
        divData.addClass("divData");
        // <div> cvsNumDiv
        var cvsNumDiv = $("<div></div>");
        cvsNumDiv.attr("id", "cvsNumDiv" + (i + 1));
        cvsNumDiv.addClass("cvsNumDiv col-md-12");
        var cvsNum = $("<canvas></canvas>");
        cvsNum.attr("id", "cvsNum" + (i + 1));
        cvsNum.attr("width", "300px");
        cvsNum.attr("height", "50px");
        cvsNum.addClass("cvsNum");
        cvsNum.appendTo(cvsNumDiv);
        // <div> cvsImgDiv
        var cvsImgDiv = $("<div></div>");
        cvsImgDiv.attr("id", "cvsImgDiv" + (i + 1));
        cvsImgDiv.addClass("cvsImgDiv col-md-12");
        var cvsImg = $("<canvas></canvas>");
        cvsImg.attr("id", "cvsImg" + (i + 1));
        cvsImg.attr("width", "300px");
        cvsImg.attr("height", "300px");
        cvsImg.addClass("cvsImg");
        cvsImg.appendTo(cvsImgDiv);
        // appendTo
        cvsNumDiv.appendTo(divData);
        cvsImgDiv.appendTo(divData);
        divData.appendTo(divMsaData);
    }
}

// 加载 <div> msaCount
function intoDivMsaCount() {
    var divMsaCount = $("#msaCount");
    var cvsCount = $("<canvas></canvas>");
    cvsCount.attr("id", "cvsCount");
    cvsCount.attr("width", "600px");
    cvsCount.attr("height", "600px");
    cvsCount.addClass("cvsCount");
    cvsCount.appendTo(divMsaCount);
}

// ===== ===== ===== ===== =====
// 加载<canvas>.Context
// ===== ===== ===== ===== =====

// <canvas>.Context cvsNum
function getCtxCvsNum(i) {
    var cvsNum = document.getElementById("cvsNum" + (i + 1));
    if (!cvsNum.getContext) return;
    var ctxNum = cvsNum.getContext("2d");
    return ctxNum;
}

// <canvas>.Context cvsImg
function getCtxCvsImg(i) {
    var cvsImg = document.getElementById("cvsImg" + (i + 1));
    if (!cvsImg.getContext) return;
    var ctxImg = cvsImg.getContext("2d");
    return ctxImg;
}

// <canvas>.Context cvsCount
function getCtxCvsCount() {
    var cvsCount = document.getElementById("cvsCount");
    if (!cvsCount.getContext) return;
    var ctxCount = cvsCount.getContext("2d");
    return ctxCount;
}

// ===== ===== ===== ===== =====
// 画图
// ===== ===== ===== ===== =====

// 画图 <canvas> cvsNum
function drawCvsNum(ctxNum, WinNumber) {
    var ctxNumX = 100;
    var ctxNumXP = 30;
    var ctxNumY = 25;
    var radis = 12;
    var startAngle = 0;
    var endAngle = 2 * Math.PI;
    var anticlockwise = false;

    // 画图
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

    // 入数
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

// 画图 <canvas> cvsImg
function drawCvsImg(ctxCvsImg, WinNumber) {
    rect = 25; // 方块 9*9
    rectCount = 9; // 方块数量
    gap = (rect / 4); //5; //间距/间隙
    brim = (rect / 2); // 10; // 边
    font_size = rect * 0.65; // 字体大小
    font_x = rect / 10; // 字体X
    font_y = rect * 0.75; // 字体Y
    canvasWidth = brim * 2 + rect * rectCount + gap * (rectCount - 1); //canvas宽高

    draw(ctxCvsImg, rect, rectCount, gap, brim);
    write(ctxCvsImg, font_size, font_x, font_y, canvasWidth);
    getInNum(ctxCvsImg, WinNumber.redNumbers);
}

// 画图 <canvas> cvsCount
function drawCvsCount(ctxCvsCount, WinNumberList) {
    rect = 50; // 方块 9*9
    rectCount = 9; // 方块数量
    gap = (rect / 4); //5; //间距/间隙
    brim = (rect / 2); // 10; // 边
    font_size = rect * 0.65; // 字体大小
    font_x = rect / 10; // 字体X
    font_y = rect * 0.75; // 字体Y
    canvasWidth = brim * 2 + rect * rectCount + gap * (rectCount - 1); //canvas宽高

    draw(ctxCvsCount, rect, rectCount, gap, brim);
    write(ctxCvsCount, font_size, font_x, font_y, canvasWidth);
    var inNum = [];
    for (var i = 0; i < WinNumberList.length; i++) {
        inNum = inNum.concat(WinNumberList[i].redNumbers);
    }
    getInNum(ctxCvsCount, inNum);
}

function draw(ctx, rect, rectCount, gap, brim) {
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
}


// ===== ===== ===== ===== =====
// 入数
// ===== ===== ===== ===== =====

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

// ===== ===== ===== ===== =====
// 渲染中奖
// ===== ===== ===== ===== =====

// 中奖号码
function getInNum(ctx, inNum) {
    var inNumberXY = new Array(); // 中奖数字坐标数组
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
    // drawInNum(ctx, inNumberXY);
    ctx.fillStyle = "#ff6140";
    ctx.globalAlpha = 0.1;
    for (var i = 0; i < inNumberXY.length; i++) {
        var tempxy = xyList[inNumberXY[i]];
        // console.log("数字坐标的数组位置：" + inNumberXY[i]);
        // console.log("数字坐标：" + tempxy.x + ":" + tempxy.y);
        ctx.fillRect(tempxy.x, tempxy.y, rect, rect);
    }
}

// ===== ===== ===== ===== =====
// 数据分析
// ===== ===== ===== ===== =====
// 空区
