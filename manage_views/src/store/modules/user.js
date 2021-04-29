import { getInfo } from "@/api/auth";
import { getToken, setToken, removeToken } from "@/utils/auth";
import router from "@/router";

const getDefaultState = () => {
  return {
    token: getToken(),
    name: "",
    avatar: ""
  };
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    setToken(token);
    state.token = token;
  },
  RESET_TOKEN: (state) => {
    removeToken();
    state.token = null;
  },
  SET_NAME: (state, name) => {
    state.name = name;
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar;
  }
};

const actions = {
  async getInfo({ commit }) {
    const { code, result } = await getInfo();
    if (code === 200) {
      commit("SET_NAME", result.nickname);
      commit("SET_AVATAR", result.avatar);
    } else {
      commit("RESET_TOKEN");
      router.push({ path: `/login?redirect=${router.currentRoute.path}` });
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};

