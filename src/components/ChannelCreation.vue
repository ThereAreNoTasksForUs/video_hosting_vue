<template>
  <div>
    <form>
      <label>
        Channel name:
        <input v-model="name" type="text" maxlength="100" @blur="$v.name.$touch()">
      </label>
      <label>
        Channel information:
        <input v-model="inform" type="text" @blur="$v.inform.$touch()">
      </label>
      <button type="button" @click="submit">Submit</button>
    </form>
  </div>
</template>

<script>
  import {HTTP} from "@/http-common";
  import { required } from 'vuelidate/lib/validators';

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
        this.$v.$touch();
        if (this.$v.$invalid) {
          return;
        }

        await this.post_request()
            .then(response => {
              this.response = response.data;
            })
            .catch(e => {
              this.error = e;
            });
      }
    },
    validations: {
      name: {
        required,
      },
      inform: {
        required,
      }
    }
  }
</script>

<style scoped>

</style>