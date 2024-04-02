// const pixel = {
// 	// Constant static variables
// 	// url: "https://coopcommerce-app.herokuapp.com/static/coop-pixel.html",
// 	// url: "https://d2psqamb38d0mh.cloudfront.net/static/coop-pixel.html",
// 	// Prod url:
// 	url: "https://d1zcmvsklxjbur.cloudfront.net/static/coop-pixel.html",
// 	devUrl: "http://localhost:5500/server/static/coop-pixel.html",
// 	// stagingUrl: "https://widget.coopcommerce-staging.com/static/coop-pixel.html",
// 	stagingUrl: "https://d2psqamb38d0mh.cloudfront.net/static/coop-pixel.html",
// 	styles: { height: "0px", width: "0px", opacity: 0 },

// 	// Set dynamically
// 	env: null,
// 	publisher: null,
// 	iFrame: null,
// 	loaded: false,
// 	eventQueue: [],

// 	// Event Queue

// 	addEvent(event) {
// 		if (this.loaded) {
// 			this.postEvent(event);
// 		} else {
// 			this.eventQueue.push(event);
// 		}
// 	},

// 	postEvent(event) {
// 		this.iFrame.contentWindow.postMessage(event, "*");
// 	},

// 	processQueue() {
// 		for (const event of this.eventQueue) {
// 			this.postEvent(event);
// 		}
// 	},

// 	addParam(url, name, value) {
// 		if (value) {
// 			const last = url.charAt(url.length - 1);
// 			url +=
// 				(last !== "?" ? "&" : "") +
// 				`${name}=${encodeURIComponent(value)}`;
// 		}
// 		return url;
// 	},

// 	makeUrl() {
// 		let url =
// 			(this.env === "production"
// 				? this.url
// 				: this.env === "staging"
// 				? this.stagingUrl
// 				: this.devUrl) + "?";

// 		url = this.addParam(url, "environment", this.env || "production");
// 		url = this.addParam(url, "publisher", this.publisher);
// 		return url;
// 	},

// 	getPublisherFromUrl() {
// 		let params = document.currentScript.src.split("?")[1].split("=");
// 		if (params[0] === "publisher_id" && params[1]) {
// 			return params[1].split("&")[0];
// 		} else {
// 			return null;
// 		}
// 	},

// 	handleLoad() {
// 		this.loaded = true;
// 		this.processQueue();
// 	},

// 	mount() {
// 		const iFrame = document.createElement("iframe");
// 		this.iFrame = iFrame;
// 		this.iFrame.src = this.makeUrl();
// 		this.iFrame.id = "coopcommerce-pixel";
// 		document.body.appendChild(this.iFrame);
// 		Object.entries(this.styles).forEach((p) => (iFrame.style[p[0]] = p[1]));
// 		this.iFrame.addEventListener("load", this.handleLoad.bind(this));
// 	},

// 	init() {
// 		this.env =
// 			document.currentScript.getAttribute("environment") || "production";
// 		this.publisher = document.currentScript.getAttribute("publisher_id");
// 		if (!this.publisher) {
// 			this.publisher = this.getPublisherFromUrl();
// 		}
// 		this.mount();
// 	},
// };

// pixel.init();
