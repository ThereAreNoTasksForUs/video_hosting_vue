<template>
    <div>
        <form>
            <label>
                Email:
                <input type="email" v-model="email">
            </label>
            <label>
                Username:
                <input v-model="username">
            </label>
            <label>
                Password:
                <input type="password" v-model="password">
            </label>
            <button type="button" @click="post_request">Submit</button>
        </form>

        <p v-if="error">
            {{error.message}}
        </p>

        {{ this.username }}
        {{ this.email }}
        {{ this.response }}
    </div>
</template>

<script>
    import {HTTP} from '../http-common.js'

    export default {
        data() {
            return {
                response: [],
                email: '',
                username: '',
                password: '',
                error: null,
            }
        },
        methods: {
            post_request: function(){
                HTTP.post(`auth/register`, {
                    email: this.email,
                    username: this.username,
                    password: this.password,
                })
                    .then(response => {
                        this.response = response.data
                        console.log(this.response)
                    })
                    .catch(e => {
                        this.error = e;
                    })
            }
        }
    }
</script>

<style scoped>

</style>