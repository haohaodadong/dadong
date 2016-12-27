$(function() {
	var result,record;
	var time = 0;
	$(".weui-btn").click(function() {
		$.ajax({
			type :"POST",
			url  :"http://182.92.99.12:8086/note/point/list",
			contentType: "application/json",
			dataType: 'json',
			data : JSON.stringify({'page_code':'d1744ce8df7f439a824352d2b13b7d10'}),
			success : function(jsonData) {
				invoke(jsonData);
			}
		});
	})
	
	//调用方法
	function invoke (jsonData) {
		var result = JSON.parse(jsonData.data);
		console.log(result);
		/*var arrLong = [];
		for (var i = 0; i < result.length; i++) {
		    record = coordinateArray(result[i]);
		    arrLong.push(record.length);
			console.log("record.length" + record.length);	
		}
		var time = Math.max.apply(null, arrLong);
		console.log(time);
		(function() {
			var k = 0;
			record = coordinateArray(result[k]);
			drawLine(record);
			console.log(arrLong[k]);
			k++;
			var timer = setInterval(function() {
				if (k < result.length) {
					record = coordinateArray(result[k]);
					drawLine(record);
					console.log(arrLong[k]);
					k++;
				}
			}, 20*time)}
		)();*/

	    for (var i = 0; i < result.length; i++) {
	    	record = coordinateArray(result[i]);
	    	console.log(record.length);
			(function (l,record,i) {
				if (i == 0) {
						drawLine(record);
				} else {
					timer2 = setTimeout(function() {
						drawLine(record);
					},time);
				}
				time += l*20;
			})(record.length,record,i);
	   }
	}
	
	
	//换算坐标
	function coordinateArray(result) {
//		console.log(width, height);
		var a = result.onelinepoint;
//		console.log(a);
		var arr = [];
		for (var i = 0; i < a.length - 1; i++) {
			var pointX = (a[i].px) % 109;
			var pointY = a[i].py;
			var pointX2 = (a[i + 1].px) % 109;
			var pointY2 = a[i + 1].py;

			var initialObj = {
				xReality: pointX * width / 109,
				yReality: pointY * height / 153
			}
//				console.log(initialObj);
			var initialObj2 = {
				xReality: pointX2 * width / 109,
				yReality: pointY2 * height / 153
			}
			//用贝塞尔曲线，需获取的每两点的中点
			var centerObj = {
				xCenter: (initialObj.xReality + initialObj2.xReality) / 2,
				yCenter: (initialObj.yReality + initialObj2.yReality) / 2
			}
			initialObj.xCenter = (initialObj.xReality + initialObj2.xReality) / 2;
			initialObj.yCenter = (initialObj.yReality + initialObj2.yReality) / 2;
			initialObj.pointWidth = .5 + a[i].pointWidth/255;
//			console.log(initialObj.pointWidth);
			arr.push(initialObj);
		}

		//返回坐标点的数组
		return arr;
		
	};
	
	//引用贝塞尔曲线画线
	function drawLine (record) {
//	    console.log(record);
	    ctx = canvas.getContext("2d");
//	    ctx.beginPath();
	    /*for (var i = 0; i < record.length-2; i++) {
	    	(function (i) {
				ctx.beginPath();
				ctx.lineCap   = "round";
	    		ctx.lineJoin  = "round";
//		        ctx.moveTo(record[0].xReality,record[0].yReality);
//		        ctx.lineTo(record[0].xCenter,record[0].yCenter);
		    	setTimeout(function () {
		    		console.log(record[i]);
		        	ctx.moveTo(record[i].xCenter,record[i].yCenter);
		    		ctx.quadraticCurveTo(record[i+1].xReality,record[i+1].yReality,record[i+1].xCenter,record[i+1].yCenter);
			        sleep(12);
			        ctx.stroke();
		    	},10);
//		    	ctx.moveTo(record[record.length-1].xCenter,record[record.length-1].yCenter);
//			    ctx.lineTo(record[record.length-1].xReality,record[record.length-1].yReality);
	//  		setInterval("showLine()",2000);
	    	})(i);
	    }*/
//	    ctx.stroke();

	    (function () {
	    	var i = 0;
	    	var timer = setInterval(function () {
		    	if (i <record.length-1) {
		    		ctx.beginPath();
		    		ctx.pointWidth = record[i].pointWidth;
		    		ctx.moveTo(record[i].xCenter,record[i].yCenter);
				    ctx.quadraticCurveTo(record[i+1].xReality,record[i+1].yReality,record[i+1].xCenter,record[i+1].yCenter);
			    	ctx.stroke();
			    	i++;
		    	}
		    	if(i == record.length-1) {
		        	clearInterval(timer);
		        }
	    	},20);
	    })(record);
	    
	    
	    	/*for (var i = 0; i < record.length-1; i++) {
	    		(function (i) {
	    			setTimeout(function () {
	    				ctx.beginPath();
	    				ctx.pointWidth = record[i].pointWidth;
	    				ctx.moveTo(record[i].xCenter,record[i].yCenter);
					    ctx.quadraticCurveTo(record[i+1].xReality,record[i+1].yReality,record[i+1].xCenter,record[i+1].yCenter);
				    	ctx.stroke();
	    			},20)
	    			
	    		})(i);
	    	}*/
	   
	}
	
	//延时定时器函数
	function sleep(n) {
		var start = new Date().getTime(); //定义起始时间的毫秒数
		while(true) {
			var time = new Date().getTime(); //每次执行循环取得一次当前时间的毫秒数
			if(time - start > n) { //如果当前时间的毫秒数减去起始时间的毫秒数大于给定的毫秒数，即结束循环
				break;
			}
		}
	}

});