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
				e.innerHTML = "more_horiz";
				return e;
			})());
			return e;
		})());
		element = document.querySelector("a[class=\"mdui-btn mdui-btn-icon mdui-color-blue-400 mdui-ripple\"");
		send_requests(0);
	}, 300);
	let id = window.location.search.split("?")[1].split("&")[window.location.search.split("?")[1].split("&").map(i => {
		return i.split("=")[0].toLowerCase()
	}).indexOf("id")].split("=")[1].padStart(5, "0");
	// let id = "41362";
	let path = "";
	let urls = [
		"https://cnbilinyj.github.io/WebCat_Shared_Space_Publicizes_Project_Direct_Chain/",
		"https://jsd.cdn.zzko.cn/gh/cnbilinyj/WebCat_Shared_Space_Publicizes_Project_Direct_Chain@main/"
	];
	let no_get = function no_get () {
		element.classList.remove("mdui-color-blue-400");
		element.classList.add("mdui-color-red-500");
		element.children[0].innerHTML = "downward";
	}
	let data = JSON.parse(localStorage.getItem("cnbilinyj-WebCat-WCSSPDLF&D")) || [];
	let get_5 = function get_5 (urln) {
		if (urln >= urls.length) {
			no_get();
			return;
		}
		let idn = parseInt(id.slice(0, -4));
		if (data[idn]) {
			/*
			如果本地存在这一等级的记录则直接使用本地的
			原本可以直接存储是否有当前ID的项目的下载链接
			但是考虑到这种情况出现率较低，所以才做成查找本地同等级记录的形式
			这样可以使得比如当前项目ID是45678，曾经从网络记录得到过45623
			即可节省从网络请求万级(4)和百级(56)的数据
			可以节省下这一部分的网络请求时间和次数以及网络请求所消耗的流量
			*/
			get_34(urln, true);
		} else {
			let url_ = urls[urln];
			let get_5_xhr = new XMLHttpRequest();
			get_5_xhr.open("GET", `${url_}index.json?timestamp=${new Date().getTime()}`, true);
			get_5_xhr.addEventLister("load", event => {
				let net_data = JSON.parse(event.target.responseText);
				if (net_data[idn]) {
					get_34(urln, false);
				} else {
					no_get();
					return;
				}
			});
			get_5_xhr.addEventLister("error", event => {
				get_5(urln + 1);
			});
		}
	}
	let get_34 = function get_34 (urln, get_local) {
		if (get_local && data[parseInt(id.slice(0, -4))])
	}
})();
