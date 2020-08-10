<template>
    <div>
        <form>
            <p>
                <label>
                    Username:
                    <input v-model="username" @blur="$v.username.$touch()">
                </label>
                <span v-if="$v.username.$error">
                    Field required!
                </span>
            </p>
            <p>
                <label>
                    Password:
                    <input type="password" v-model="password" @blur="$v.password.$touch()">
                </label>
                <span v-if="$v.password.$error">
                    Field required!
                </span>
            </p>
            <button type="button" @click="submit">Submit</button>
        </form>
        <a>{{ this.error }}</a>
        <a>{{ this.token }}</a>
        <a>{{ this.response }}</a>
    </div>
</template>

<script>
    import {HTTP} from "../http-common";
    import { required } from 'vuelidate/lib/validators';


    export default {
        name: "Login",
        data() {
            return {
                response: null,
                token: null,
                username: null,
                password: null,
                error: null,
            }
        },
        methods: {
            post_request: async function(){
                return HTTP.post(`auth/login`, {
                    username: this.username,
                    password: this.password,
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
                        this.error = e.response.data.Error;
                });

                if (this.error === null) {
                    this.token = this.response.token
                    this.$cookies.set('session', this.token, 0);
                    await this.$router.push("index");
                }
            }
        },
        validations: {
            username: {
                required,
            },
            password: {
                required,
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