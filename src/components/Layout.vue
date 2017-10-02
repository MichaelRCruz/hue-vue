<template lang="html">

  <svg height="900" width="1300" class="sup" viewBox="0 0 1300 900">
    <polyline points="2,2 1260,2 1260,630 630,630 630,450 2,450 2,2"
              style="fill:white;stroke:black;stroke-width:2" />
    <polyline points="955,630 955,250 1260,250"
              style="fill:white;stroke:black;stroke-width:2" />
    <rect class="light" x="10" y="210" rx="10" ry="10" @click="setLightState('4')" />
    <rect class="light" x="400" y="390" rx="10" ry="10" @click="setLightState('5')" />
    <rect class="light" x="400" y="10" rx="10" ry="10" @click="setLightState('6')" />
    <rect class="light" x="895" y="570" rx="10" ry="10" @click="setLightState('7')" />
    <rect class="light" x="1050" y="10" rx="10" ry="10" @click="setLightState('8')" />
    <rect class="light" x="1200" y="270" rx="10" ry="10" @click="setLightState('9')" />
  </svg>

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
        groupToggle: 'false',
        lightToggle: 'true',
        lightStates: {}
      }
    },
    methods: {
      getLightStates() {
        fetch(huerl + '/lights/', {
          method: 'GET',
          headers: {
            "Content-Type": "application/json"
          },
          mode: 'cors'
        })
          .then(
            function(response) {
              if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                  response.status);
                return;
              }
              // Examine the text in the response
              response.json().then(function(data) {
                this.lightStates = data;
              });
            }
          )
          .catch(function(err) {
            console.log('Fetch Error :-S', err);
          });
      },
      setLightState(lightId) {
        if (this.LightToggle === 'true') {
          this.lightToggle = 'false'
        } else {
          this.lightToggle = 'true'
        }
        console.log(this.lightToggle);
        fetch(huerl + '/lights/' + lightId + '/state', {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json"
          },
          mode: 'cors',
          body: '{"on":' + this.lightToggle + ', "sat":0, "bri":255,"hue":12750}'
          // body: '{"effect":"none"}'
        })
          .then(
            function(response) {
              if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                  response.status);
                return;
              }
              // Examine the text in the response
              response.json().then(function(data) {
              });
            }
          )
          .catch(function(err) {
            console.log('Fetch Error :-S', err);
          });
      },
      setGroup() {
        this.groupToggle === 'true' ? this.groupToggle = 'false' : this.groupToggle = 'true';
        fetch(huerl + '/groups/1/action', {
          method: 'PUT',
          headers: {
            "Content-Type": "application/json"
          },
          mode: 'cors',
          body: '{"on":' + this.groupToggle + '}'
          // body: '{"effect":"none"}'
        })
          .then(
            function(response) {
              if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                  response.status);
                return;
              }
              // Examine the text in the response
              response.json().then(function(data) {
              });
            }
          )
          .catch(function(err) {
            console.log('Fetch Error :-S', err);
          });
      }
    },
    beforeMount() {
      this.getLightStates();
    }
  }
</script>

<style lang="css" scoped>

  .sup {
    width: 75%;
    height: auto;
  }

  .light {
    fill: orange;
    width: 50px;
    height: 50px;
  }

</style>
