/*播放暂停按钮*/
var btnMp3 = document.getElementById("btn_mp3");
btnMp3.onclick = function() {
	var audio = document.getElementById("music");
	if (audio.paused) {
		audio.play();
	} else {
		audio.pause();
	}
}
