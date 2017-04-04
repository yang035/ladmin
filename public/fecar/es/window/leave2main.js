

// 登录状态超时时调用的方法
// 登录成功时会触发window.refreshToInit（见../function/leave.js和页面中的logged-out.html）

const reLogin = require("../function/leave");


window.reLogin = reLogin;
