<template lang="html">

  <div class="hello">
    <h1>Hello, world.</h1>
  </div>

</template>

<script>
import { store } from '../store/store';

const huerl = 'http://'
              + process.env.INTERNAL_IP_ADDRESS
              + '/api/'
              + process.env.USER_ID;

export default {
  components: {
  },
  data() {
    return {

    }
  },
  methods: {
    fetch() {
      let _self = this;
      fetch(huerl + '/lights/9/state', {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        mode: 'cors',
        body: '{"on":true, "sat":254, "bri":254,"hue":12750}'
      })
        .then(
          function(response) {
            console.log(response);
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +
                response.status);
              return;
            }
            // Examine the text in the response
            response.json().then(function(data) {
              console.log('cool', data);
            });
          }
        )
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
        });
    }
  },
  beforeMount() {
    this.fetch();
  }
}
</script>

<style lang="css">
</style>
