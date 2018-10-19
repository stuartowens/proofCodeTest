const UserInfo = () => import('./UserInfo.js');

export default {
  name: 'UserLogin',
  components: {
    UserInfo,
  },
  data() {
    return {
      info: null,
      ip: '201.111.240.66',
      message: '',
      user:{
        showInfo: false
      }
    };
  },
  template: `
    <ul class="list-reset">
      <div>
        <h2>Please Enter Your IP Address for Your Username</h2>
        <input id="memberIP" v-model="message" placeholder="IP Address" />
        <button id="loginButton" class="bg-blue hover:bg-blue-dark text-white py-1 px-2 rounded"
          @click="user.showInfo = !user.showInfo">
            {{ !user.showInfo ? 'LOGIN' : 'LOGOUT' }}
          </button>
        <h1>Member IP: {{ message }}</h1>
        <user-info v-if="user.showInfo" :ip="message" class="mt-2">
        </user-info>
      </div>
    </ul>
  `,
};
