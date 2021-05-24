<template>
  <div class="login-container">
    <video class="bg-video" src="../../assets/video.mp4" loop="loop" autoplay="autoplay" />
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">{{ title }}</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon
            :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'"
          />
        </span>
      </el-form-item>

      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >登录</el-button>

      <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: 123456</span>
      </div>
    </el-form>
    <div class="mark">{{ mark }}</div>
  </div>
</template>

<script>
import { login } from "@/api/auth.js";
import { createNamespacedHelpers } from "vuex";
const { mapMutations } = createNamespacedHelpers("user");
import { mark, title } from "@/settings";
export default {
  name: "Login",
  data() {
    return {
      mark, title,
      loginForm: {
        username: "test",
        password: "123456"
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", message: "用户名必填" },
          {
            min: 3,
            max: 10,
            trigger: "blur",
            message: "用户名在 3-10 个字符之间"
          }
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不得为空" },
          {
            min: 6,
            max: 16,
            trigger: "blur",
            message: "密码在 6-16 个字符之间"
          }
        ]
      },
      loading: false,
      passwordType: "password",
      redirect: undefined
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  created() {
    if (this.$store.state.user.menus !== "") {
      location.reload();
    }
  },
  methods: {
    ...mapMutations(["SET_TOKEN"]),
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          try {
            this.loading = true;
            const { code, message, result } = await login(this.loginForm);
            if (code === 200) {
              this.$message({
                message,
                type: "success"
              });
              this.SET_TOKEN(result.token);
              this.$router.push({ path: "/dashboard" });
            } else {
              this.$message.error(message);
            }
            this.loading = false;
          } catch (error) {
            this.loading = false;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    // background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  // background-color: $bg;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  .bg-video{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  }

  .login-form {
    position: relative;
    width: 450px;
    max-width: 100%;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .mark{
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 12px;
   color: #999;
}
}
</style>
