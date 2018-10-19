
export default {
  name: 'UserInfo',
  props: ['Campaign', 'User', 'ip'],
  data() {
    return {
      info: { "Campaign IDs" : { "Campaign ID" : "Campaign 7", "ImagePath":"/images/shrug.jpg"}},
    };
  },
  mounted () {
    const url = 'http://localhost:3000/api/v1/users/'
    let urlString = url.concat(this.ip);
    axios
      .get(urlString)
          .then(response => (this.info = response.data[0]))
          .catch(err=> (this.info = err))
  },
  template: `
    <div>
      <h2>Welcome {{ info["Campaign IDs"]["Campaign ID"] }} User</h2>
      <img id="targetImg" :src="info['Campaign IDs']['ImagePath']" />
    </div>`
};
