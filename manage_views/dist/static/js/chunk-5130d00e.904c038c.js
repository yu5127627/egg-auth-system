(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5130d00e"],{2017:function(e,t,s){"use strict";s("cafe")},4636:function(e,t,s){"use strict";s("e62e")},"9ed6":function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"login-container"},[a("video",{staticClass:"bg-video",attrs:{src:s("ae46"),loop:"loop",autoplay:"autoplay"}}),a("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:e.loginForm,rules:e.loginRules,"auto-complete":"on","label-position":"left"}},[a("div",{staticClass:"title-container"},[a("h3",{staticClass:"title"},[e._v(e._s(e.title))])]),a("el-form-item",{attrs:{prop:"username"}},[a("span",{staticClass:"svg-container"},[a("svg-icon",{attrs:{"icon-class":"user"}})],1),a("el-input",{ref:"username",attrs:{placeholder:"Username",name:"username",type:"text",tabindex:"1","auto-complete":"on"},model:{value:e.loginForm.username,callback:function(t){e.$set(e.loginForm,"username",t)},expression:"loginForm.username"}})],1),a("el-form-item",{attrs:{prop:"password"}},[a("span",{staticClass:"svg-container"},[a("svg-icon",{attrs:{"icon-class":"password"}})],1),a("el-input",{key:e.passwordType,ref:"password",attrs:{type:e.passwordType,placeholder:"Password",name:"password",tabindex:"2","auto-complete":"on"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleLogin(t)}},model:{value:e.loginForm.password,callback:function(t){e.$set(e.loginForm,"password",t)},expression:"loginForm.password"}}),a("span",{staticClass:"show-pwd",on:{click:e.showPwd}},[a("svg-icon",{attrs:{"icon-class":"password"===e.passwordType?"eye":"eye-open"}})],1)],1),a("el-button",{staticStyle:{width:"100%","margin-bottom":"30px"},attrs:{loading:e.loading,type:"primary"},nativeOn:{click:function(t){return t.preventDefault(),e.handleLogin(t)}}},[e._v("登录")]),a("div",{staticClass:"tips"},[a("span",{staticStyle:{"margin-right":"20px"}},[e._v("username: admin")]),a("span",[e._v(" password: 123456")])])],1),a("div",{staticClass:"mark"},[e._v(e._s(e.mark))])],1)},r=[],n=s("1da1"),o=s("5530"),i=(s("96cf"),s("3786")),l=s("2f62"),c=s("83d6"),u=Object(l["a"])("user"),p=u.mapMutations,d={name:"Login",data:function(){return{mark:c["mark"],title:c["title"],loginForm:{username:"test",password:"123456"},loginRules:{username:[{required:!0,trigger:"blur",message:"用户名必填"},{min:3,max:10,trigger:"blur",message:"用户名在 3-10 个字符之间"}],password:[{required:!0,trigger:"blur",message:"密码不得为空"},{min:6,max:16,trigger:"blur",message:"密码在 6-16 个字符之间"}]},loading:!1,passwordType:"password",redirect:void 0}},watch:{$route:{handler:function(e){this.redirect=e.query&&e.query.redirect},immediate:!0}},created:function(){""!==this.$store.state.user.menus&&location.reload()},methods:Object(o["a"])(Object(o["a"])({},p(["SET_TOKEN"])),{},{showPwd:function(){var e=this;"password"===this.passwordType?this.passwordType="":this.passwordType="password",this.$nextTick((function(){e.$refs.password.focus()}))},handleLogin:function(){var e=this;this.$refs.loginForm.validate(function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(s){var a,r,n,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!s){t.next=18;break}return t.prev=1,e.loading=!0,t.next=5,Object(i["b"])(e.loginForm);case 5:a=t.sent,r=a.code,n=a.message,o=a.result,200===r?(e.$message({message:n,type:"success"}),e.SET_TOKEN(o.token),e.$router.push({path:"/dashboard"})):e.$message.error(n),e.loading=!1,t.next=16;break;case 13:t.prev=13,t.t0=t["catch"](1),e.loading=!1;case 16:t.next=20;break;case 18:return console.log("error submit!!"),t.abrupt("return",!1);case 20:case"end":return t.stop()}}),t,null,[[1,13]])})));return function(e){return t.apply(this,arguments)}}())}})},m=d,g=(s("2017"),s("4636"),s("2877")),f=Object(g["a"])(m,a,r,!1,null,"789ae140",null);t["default"]=f.exports},ae46:function(e,t,s){e.exports=s.p+"static/media/video.992adea4.mp4"},cafe:function(e,t,s){},e62e:function(e,t,s){}}]);