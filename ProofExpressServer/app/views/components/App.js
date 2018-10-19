import UserLogin from './UserLogin.js'

export default {
	name: 'App',
	components: {
			UserLogin,
	},
	template: `
     <div class="container mx-auto p-4">
	      <h1>Proof Coding Test</h1>
	      <user-login class="mt-6"></user-login>
     </div>
   `,
}
