<template lang="html">

  <div class="hello">
    <h1>Hello, world.</h1>
  </div>

</template>

<script>
import { store } from '../store/store';
require('dotenv').config();

export default {
  components: {
  },
  data() {
    return {

    }
  },
  methods: {

    // TODO: Move these fetches out of the component.
    // TODO: They should be actions in your Vuex store.
    fetch() {
      let _self = this;
      let url = ''
      fetch(url, {
        headers: {
          "Content-Type": "application/json"
        }
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
  }
}
</script>

<style lang="css">
</style>
