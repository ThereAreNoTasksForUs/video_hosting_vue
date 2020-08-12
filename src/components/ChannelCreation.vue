<template>
  <div>
    <form>
      <label>
        Channel name:
        <input v-model="name" type="text">
      </label>
      <label>
        Channel information:
        <input v-model="inform" type="text">
      </label>
      <button type="button" @click="submit">Submit</button>
    </form>
  </div>
</template>

<script>
  import {HTTP} from "@/http-common";
  export default {
    name: "ChannelCreation",
    data() {
      return {
        response: null,
        name: null,
        inform: null,
        error: null,
      }
    },
    methods: {
      post_request: async function(){
        return HTTP.post(`channel/create`, {
          name: this.name,
          info: this.inform
        }, {
          headers: {
          'Authorization': 'TOKEN_' + this.$cookies.get('session')
          },
        })
      },
      submit: async function(){
        await this.post_request()
            .then(response => {
              this.response = response.data;
            })
            .catch(e => {
              this.error = e.response.data.Error;
            });
      }
    },
  }
</script>

<style scoped>

</style>