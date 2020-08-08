<template>
    <div>
        <form>
            <p>
            <label>
                Email:
                <input type="email" v-model="email">
                </label>
            </p>
            <p>
                <label>
                    Username:
                    <input v-model="username">
                </label>
            </p>
            <p>
                <label>
                    Password:
                    <input type="password" v-model="password">
                </label>
            </p>
            <button type="button" @click="post_request">Submit</button>
        </form>

        <p v-if="error">
            {{error.message}}
        </p>
        <p>
            {{ this.response }}
        </p>
    </div>
</template>

<script>
    import {HTTP} from '../http-common.js'

    export default {
        name: "Register",
        data() {
            return {
                response: '',
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
                        this.response = response.data;
                        this.$router.push("login");
                    })
                    .catch(e => {
                        this.error = e;
                    })
            }
        }
    }
</script>

<style>
    button {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        background-color: #4CAF50;
        border: none;
        color: white;
        padding: 10px 16px;
        text-decoration: none;
        margin: 4px 2px;
        cursor: pointer;
    }
</style>