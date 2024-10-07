(function() {
	'use strict';
	let id = window.location.search.split("?")[1].split("&")[window.location.search.split("?")[1].split("&").map(i => {
		return i.split("=")[0].toLowerCase()
	}).indexOf("id")].split("=")[1].padStart(5, "0");
	// let id = "41362";
	let path = "";
	let urls = [
		"https://cnbilinyj.github.io/WebCat_Shared_Space_Publicizes_Project_Direct_Chain/",
		"https://jsd.cdn.zzko.cn/gh/cnbilinyj/WebCat_Shared_Space_Publicizes_Project_Direct_Chain@main/"
	]
	let send_requests = function send_requests (url_n){
		let url_ = urls[url_n];
		if (url_ === undefined) {
			class NetworkError extends Error {
				constructor(message) {
					super(message);                   	// 调用父类的constructor来设置message
					this.name = this.constructor.name;	// 设置错误的名称，默认为类名

					// 确保Error对象被正确识别为Error对象（Error.captureStackTrace用于栈追踪）
					Error.captureStackTrace(this, this.constructor);
				}
			}
			throw new NetworkError("Can't do it for any domain name in cnbilinyj.github.io and jsd.cdn.zzko.cn.")
		}
		let tenThousand_levels = new XMLHttpRequest();
		tenThousand_levels.open("GET", `${url_}index.json?timestamp=${new Date().getTime()}`, true);
		tenThousand_levels.addEventListener("load", event => {
			if(JSON.parse(event.target.responseText)[parseInt(id.slice(0, -4))]){
				let hundred_thousand = new XMLHttpRequest();
				hundred_thousand.open("GET", `${url_}${parseInt(id.slice(0, -4))}/index.json?timestamp=${new Date().getTime()}`, true);
				hundred_thousand.addEventListener("load", event => {
					console.log(parseInt(id.slice(-4, -2)));
					if(JSON.parse(event.target.responseText)[parseInt(id.slice(-4, -2))]){
						let ten_grades = new XMLHttpRequest();
						ten_grades.open("GET", `${url_}${parseInt(id.slice(0, -4))}/${parseInt(id.slice(-4 ,-2))}.json?timestamp=${new Date().getTime()}`, true);
						ten_grades.addEventListener("load", event => {
							let download_url = JSON.parse(event.target.responseText)[parseInt(id.slice(-2))];
							if(download_url){
								let element = document.querySelector("button[class=\"mdui-btn mdui-btn-icon mdui-color-pink-400 mdui-ripple\"").parentNode;
								document.querySelector("button[class=\"mdui-btn mdui-btn-icon mdui-color-pink-400 mdui-ripple\"").remove();
								setTimeout(() => {
									element.appendChild((() => {
										let e = document.createElement("a");
										e.setAttribute("class", "mdui-btn mdui-btn-icon mdui-color-blue-400 mdui-ripple");
										e.href = download_url;
										e.appendChild((() => {
											let e = document.createElement("i");
											e.setAttribute("class", "mdui-icon material-icons");
											e.innerHTML = "arrow_downward"
											return e;
										})());
										return e;
									})());
								}, 100);
							}
						});
						ten_grades.addEventListener("error", event => {
							send_requests(url_n + 1);
						});
						ten_grades.send();
					}
				});
				hundred_thousand.addEventListener("error", event => {
					send_requests(url_n + 1);
				});
				hundred_thousand.send();
			}
		});
		tenThousand_levels.addEventListener("error", event => {
			send_requests(url_n + 1);
		});
		tenThousand_levels.send();
	}
	send_requests(0);
})();
