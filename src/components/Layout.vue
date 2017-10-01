<template lang="html">

  <div class="hello">
    <!-- <div class="turnOn" @click="setGroup()"></div> -->

    <svg height="900" width="1300" class="sup" viewBox="0 0 1300 900">
      <polyline points="1,1 1260,1 1260,630 630,630 630,450 1,450 1,1"
                style="fill:white;stroke:black;stroke-width:2" />
      <polyline points="1,1 1260,1 1260,630 630,630 630,450 1,450 1,1"
                style="fill:white;stroke:black;stroke-width:4" />
      <polyline points="955,630 955,250 1260,250"
                style="fill:white;stroke:black;stroke-width:2" />

      <!-- <foreignObject>
        <div class="light"></div>
      </foreignObject> -->
      <light class="light" />

    </svg>


  </div>

</template>

<script>
import Light from './Light';
import { store } from '../store/store';

const huerl = 'http://'
              + process.env.INTERNAL_IP_ADDRESS
              + '/api/'
              + process.env.USER_ID;

export default {
  components: {
    Light
  },
  data() {
    return {
      groupToggle: 'false'
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
        // body: '{"on":true, "sat":254, "bri":254,"hue":25500}'
        body: '{"effect":"none"}'
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
    },
    setGroup() {
      this.groupToggle === 'true' ? this.groupToggle = 'false' : this.groupToggle = 'true';
      let _self = this;
      fetch(huerl + '/groups/1/action', {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        mode: 'cors',
        body: '{"on":' + this.groupToggle + ',"hue": 12750}'
        // body: '{"effect":"none"}'
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
    // this.setGroup();
  }
}
</script>

<style lang="css" scoped>

  .sup {
    width: 75%;
    height: auto;
  }

  .light {
    height: 50px;
    width: 50px;
    background-color: orange;
    border-radius: 10px;
    position: fixed;
    left: 870px;
    top: 550px;
  }

</style>
