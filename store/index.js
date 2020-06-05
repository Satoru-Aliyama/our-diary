import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../axios-auth';
import router from '../router';
import axiosRefresh from '../axios-refresh';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        idToken: null
    },
    getters: {
        idToken: state => state.idToken
    },
    mutations: {
        updateIdToken(state, idToken) {
            state.idToken = idToken;
        }
    },
    actions: {
        autoLogin({commit, dispatch}) {
            const idToken = localStorage.getItem('idToken');
            if(!idToken) return;
            const now = new Date();
            const expiryTimesMs = localStorage.getItem('expiryTimesMs');
            const isExpired = now.getTime() >= expiryTimesMs;
            const refreshToken = localStorage.getItem('refreshToken');
            if(isExpired) {
                dispatch('refreshIdToken', refreshToken);
            } else {
                const expiresInMs = expiryTimesMs - now.getTime();
                setTimeout(() => {
                    dispatch('refreshIdToken', idToken);
                }, expiresInMs)
                commit('updateIdToken', idToken);
            }
            commit('updateIdToken', idToken);
        },
        login({dispatch}, authData) {
            axios.post('/accounts:signInWithPassword?key=AIzaSyCM3v5hI7oTqJKzbXpJfFpzDwm2SBmvXUo'
          , {
              email: authData.email,
              password: authData.password,
              returnSecureToken: true,
          })
          .then(response => {
              dispatch('setAuthData',{
                  idToken: response.data.idToken,
                  expiresIn: response.data.expiresIn,
                  refreshToken: response.data.refreshToken,
              });
              router.push('/');
          });
        },
        logout({commit}) {
            commit('updateIdToken', null);
            localStorage.removeItem('idToken');
            localStorage.removeItem('expiryTimesMs');
            localStorage.removeItem('refreshToken');
            router.replace('/login');
        },
        refreshIdToken({dispatch}, refreshToken) {
            axiosRefresh.post('/token?key=AIzaSyCM3v5hI7oTqJKzbXpJfFpzDwm2SBmvXUo'
                  , {
                      grant_type: 'refresh_token',
                      refresh_token: refreshToken,
                  }
                  ).then(response => {
                    dispatch('setAuthData',{
                        idToken: response.data.id_token,
                        expiresIn: response.data.expires_in,
                        refreshToken: response.data.refresh_token,
                    });
                  });
        },
        register({dispatch}, authData) {
            axios.post('/accounts:signUp?key=AIzaSyCM3v5hI7oTqJKzbXpJfFpzDwm2SBmvXUo'
          , {
              email: authData.email,
              password: authData.password,
              returnSecureToken: true,
          })
          .then(response => {
            dispatch('setAuthData',{
                idToken: response.data.idToken,
                expiresIn: response.data.expiresIn,
                refreshToken: response.data.refreshToken,
            });
              router.push('/');
          });
        },
        setAuthData({commit, dispatch}, authData) {
            const now = new Date();
              const expiryTimesMs = now.getTime() + authData.expiresIn * 1000;
              commit('updateIdToken', authData.idToken);
              localStorage.setItem('idToken', authData.idToken);
              localStorage.setItem('expiryTimesMs', expiryTimesMs);
              localStorage.setItem('refreshToken', authData.refreshToken);
              setTimeout(() => {
                  dispatch('refreshIdToken', authData.refreshToken);
              }, authData.expiresIn * 1000)
        }
    }
});