<template>
  <div class="auth-overflow" v-show="isOpen">
    <div class="auth-background" @click="emits('close-modal')"></div>
    <div
        class="auth"
        id="auth"
        :class="{
        'right-panel-active': selectedTab === 1,
      }"
    >
      <div class="main">
        <input type="checkbox" id="chk" aria-hidden="true">
        <div class="signup">
          <form @submit.prevent="onRegister">
            <label for="chk" aria-hidden="true">Регистрация</label>
            <input v-model="registerData.username" type="text" name="txt" placeholder="User name" required="">
            <input v-model="registerData.email" type="email" name="email" placeholder="Email" required="">
            <input v-model="registerData.password" type="password" name="pswd" placeholder="Password" required="">
            <button>Sign up</button>
          </form>
        </div>

        <div class="login">
          <form @submit.prevent="onRegister">
            <label for="chk" aria-hidden="true">Вход</label>
            <input v-model="loginData.email" type="email" name="email" placeholder="Email" required="">
            <input v-model="loginData.password" type="password" name="pswd" placeholder="Password" required="">
            <button>Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const isOpen = useState("isAuthOpen", () => false);

const selectedTab = ref(0);

const emits = defineEmits(["close-modal"]);

const registerData = ref({
  username: "",
  email: "",
  password: "",
});

const loginData = ref({
  name: "",
  email: "",
});

const {login, register} = useStrapiAuth();

const loginError = ref(false);
const registerError = ref(false);

const onLogin = async () => {
  const {password, email: identifier} = loginData.value;
  loginError.value = false;

  try {
    await login({identifier, password});

    emits("close-modal");
  } catch (e) {
    loginError.value = true;
  }
};

const onRegister = async () => {
  const {password, email, username} = registerData.value;
  registerError.value = false;

  try {
    await register({name: username, email, password, username});
    emits("close-modal");
  } catch (e) {
    console.log(e);
    registerError.value = true;
  }
};
</script>

<style lang="scss" scoped>
.auth-overflow {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000;
}

.auth-background {
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.auth {
  position: relative;
  background: white;

  //.close {
  //  width: 15px;
  //  height: 15px;
  //  position: absolute;
  //  top: 20px;
  //  right: 20px;
  //  z-index: 1000;
  //  opacity: 0.5;
  //  cursor: pointer;
  //  transition: all 0.2s;
  //
  //  &:hover {
  //    opacity: 1;
  //  }
  //
  //  img {
  //    width: 100%;
  //    height: 100%;
  //    object-fit: contain;
  //    object-position: center;
  //  }
  //}
  //
  //h1 {
  //  font-size: 28px;
  //  font-weight: normal;
  //  margin: 0;
  //}
  //
  //h2 {
  //  text-align: center;
  //}
  //
  //p {
  //  font-size: 14px;
  //  font-weight: 100;
  //  line-height: 20px;
  //  letter-spacing: 0.5px;
  //  margin: 20px 0 30px;
  //}
  //
  //span {
  //  font-size: 12px;
  //}
  //
  //a {
  //  color: #333;
  //  font-size: 14px;
  //  text-decoration: none;
  //  margin: 15px 0;
  //}
  //
  //button {
  //  border-radius: 20px;
  //  border: 1px solid $green-400;
  //  background-color: $green-300;
  //  color: #ffffff;
  //  font-size: 12px;
  //  font-weight: bold;
  //  padding: 12px 45px;
  //  letter-spacing: 1px;
  //  text-transform: uppercase;
  //  transition: transform 80ms ease-in;
  //
  //  cursor: pointer;
  //
  //  &:not(.ghost) {
  //    margin-top: 10px;
  //  }
  //}
  //
  //button:active {
  //  transform: scale(0.95);
  //}
  //
  //button:focus {
  //  outline: none;
  //}
  //
  //button.ghost {
  //  background-color: transparent;
  //  border-color: #ffffff;
  //}
  //
  //form {
  //  background-color: #ffffff;
  //  display: flex;
  //  align-items: center;
  //  justify-content: center;
  //  flex-direction: column;
  //  padding: 0 50px;
  //  height: 100%;
  //  text-align: center;
  //
  //  h1 {
  //    margin-bottom: 10px;
  //  }
  //
  //  &.error {
  //    input {
  //      border-color: red;
  //    }
  //  }
  //}
  //
  //input {
  //  background-color: #eee;
  //  border: 1px solid #eee;
  //  padding: 12px 15px;
  //  margin: 8px 0;
  //  width: 100%;
  //  border-radius: 10px;
  //
  //  &:focus {
  //    outline: none;
  //  }
  //}
  .main {
    width: 100%;
    height: 500px;
    background: red;
    overflow: hidden;
    background: $green-300;
    border-radius: 10px;
    box-shadow: 5px 20px 50px #000;
  }

  #chk {
    display: none;
  }

  .signup {
    position: relative;
    width: 100%;
    height: 100%;
  }

  label {
    color: #fff;
    font-size: 2.3em;
    justify-content: center;
    display: flex;
    margin: 60px;
    font-weight: bold;
    cursor: pointer;
    transition: .5s ease-in-out;
  }

  input {
    width: 70%;
    //height: 20px;
    background: #e0dede;
    justify-content: center;
    display: flex;
    margin: 20px auto;
    padding: 10px;
    border: none;
    outline: none;
    border-radius: 5px;
  }

  button {
    width: 70%;
    height: 40px;
    margin: 20px auto 10px;
    justify-content: center;
    display: block;
    color: #fff;
    background: $green-500;
    font-size: 1em;
    font-weight: bold;
    outline: none;
    border: none;
    border-radius: 5px;
    transition: .2s ease-in;
    cursor: pointer;
  }

  button:hover {
    background: $green-600;
  }

  .login {
    height: 460px;
    background: #eee;
    border-radius: 60% / 10%;
    transform: translateY(-180px);
    transition: .8s ease-in-out;
  }

  .login label {
    color: $green-500;
    transform: scale(.6);
  }

  #chk:checked ~ .login {
    transform: translateY(-500px);
  }

  #chk:checked ~ .login label {
    transform: scale(1);
  }

  #chk:checked ~ .signup label {
    transform: scale(.6);
  }

}

.auth {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  overflow: hidden;
  //width: 768px;
  width: 100%;
  max-width: 400px;
  min-height: 480px;
}

.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}

.auth.right-panel-active .sign-in-container {
  transform: translateX(100%);
}

.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}

.auth.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  animation: show 0.6s;
}

@keyframes show {
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.auth.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: $green-400;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.auth.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 50%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
}

.overlay-left {
  transform: translateX(-20%);
}

.auth.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.auth.right-panel-active .overlay-right {
  transform: translateX(20%);
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #dddddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  height: 40px;
  width: 40px;
}
</style>
