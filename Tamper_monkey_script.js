// ==UserScript==
// @name			WebCat共享空间项目直链获取与下载器	WebCat Shared Space Project Direct Link Finder and Downloader
// @namespace		cnbilinyj-WebCat
// @version			2024-10-05
// @description		从外部获取WebCat共享空间项目下载链接并通过下载链接直接进行下载。	Obtain the download link for the WebCat shared space project from external sources and download it directly through the download link.
// @author			cnbilinyj
// @match			http://space.webcat.top/page/detail.html*
// @icon			http://x.webcat.top/img/icon.png
// @grant			none
// ==/UserScript==
(function() {
	'use strict';
	let element = document.querySelector("button[class=\"mdui-btn mdui-btn-icon mdui-color-pink-400 mdui-ripple\"").parentNode;
	document.querySelector("button[class=\"mdui-btn mdui-btn-icon mdui-color-pink-400 mdui-ripple\"").remove();
	setTimeout(() => {
		element.appendChild((() => {
			let e = document.createElement("a");
			e.setAttribute("class", "mdui-btn mdui-btn-icon mdui-color-blue-400 mdui-ripple");
			e.href = "javascript:vue.download()";
			e.appendChild((() => {
				let e = document.createElement("i");
				e.setAttribute("class", "mdui-icon material-icons");
				e.innerHTML = "more";
				return e;
			})());
			return e;
		})());
	}, 100);
	element = document.querySelector("a[class=\"mdui-btn mdui-btn-icon mdui-color-blue-400 mdui-ripple\"");
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
			throw new Error("Can't do it for any domain name in cnbilinyj.github.io and jsd.cdn.zzko.cn.")
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
							element.classList.remove("mdui-color-blue-400");
							if(download_url){
								element.href = download_url;
								element.classList.add("mdui-color-green-500");
								element.children[0].innerHTML = "arrow_downward";
							}else{
								element.classList.add("mdui-color-red-500");
							}
						});
						ten_grades.addEventListener("error", event => {
							send_requests(url_n + 1);
						});
						ten_grades.send();
					}else{
						element.classList.remove("mdui-color-blue-400");
						element.classList.add("mdui-color-red-500");
						element.children[0].innerHTML = "arrow_downward";
					}
				});
				hundred_thousand.addEventListener("error", event => {
					send_requests(url_n + 1);
				});
				hundred_thousand.send();
			}else{
				element.classList.remove("mdui-color-blue-400");
				element.classList.add("mdui-color-red-500");
				element.children[0].innerHTML = "arrow_downward";
			}
		});
		tenThousand_levels.addEventListener("error", event => {
			send_requests(url_n + 1);
		});
		tenThousand_levels.send();
	}
	send_requests(0);
})();
