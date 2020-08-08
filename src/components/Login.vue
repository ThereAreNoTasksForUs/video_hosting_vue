<template>
    <div>
        <form>
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
        <a>{{ this.token }}</a>
    </div>
</template>

<script>
    import {HTTP} from "../http-common";

    export default {
        name: "Login",
        data() {
            return {
                response: null,
                token: null,
                username: '',
                password: '',
                error: null,
            }
        },
        methods: {
            post_request: function(){
                HTTP.post(`auth/login`, {
                    username: this.username,
                    password: this.password,
                })
                    .then(response => {
                        this.response = response.data
                        this.token = this.response['token']
                    })
                    .catch(e => {
                        this.error = e;
                    })
            }
        }
    }
</script>

<style scoped>
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