<template>
    <div>
        <form>
            <p>
                <label>
                    Email:
                    <input type="email" v-model.trim="email" @blur="$v.email.$touch()">
                </label>
                <span v-if="$v.email.$error">
                    <template v-if="!$v.email.email">
                        Here should be an email
                    </template>
                    <template v-else>
                        Field required!
                    </template>
                </span>
            </p>
            <p>
                <label>
                    Username:
                    <input v-model.trim="username" @blur="$v.username.$touch()">
                </label>
                <span v-if="$v.username.$error">
                    Field required!
                </span>
            </p>
            <p>
                <label>
                    Password:
                    <input type="password" v-model.trim="password" @blur="$v.password.$touch()">
                </label>
                <span v-if="$v.password.$error">
                    <template v-if="!$v.password.minLength">
                        Insert more than 8 symbols
                    </template>
                    <template v-else-if="!$v.password.containsUppercase">
                        At least 1 uppercase symbol
                    </template>
                    <template v-else-if="!$v.password.containsLowercase">
                        At least 1 lowercase symbol
                    </template>
                    <template v-else-if="!$v.password.containsNumber">
                        At least 1 number
                    </template>
                    <template v-else-if="!$v.password.containsSpecial">
                        At least 1 special symbol
                    </template>
                    <template v-else>
                        Field required!
                    </template>
                </span>
            </p>
            <p>
                <label>
                    Confirm password:
                    <input type="password" v-model.trim="confirm_password" @blur="$v.confirm_password.$touch()">
                </label>
                <span v-if="$v.confirm_password.$error">
                    <template v-if="!$v.confirm_password.sameAsPassword">
                        Its not the same
                    </template>
                    <template v-else>
                        Field required!
                    </template>
                </span>
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
    import { required, minLength, email, sameAs } from 'vuelidate/lib/validators';

    export default {
        name: "Register",
        data() {
            return {
                response: null,
                email: null,
                username: null,
                password: null,
                confirm_password: null,
                error: null,
            }
        },
        methods: {
            post_request: function(){

                this.$v.$touch();

                if (this.$v.$invalid) {
                    return;
                }

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
        },
        validations: {
            email: {
                email,
                required
            },
            username: {
                required,
            },
            password: {
                required,
                minLength: minLength(8),
                containsUppercase: value => /[A-Z]/.test(value),
                containsLowercase: value => /[a-z]/.test(value),
                containsNumber: value => /[0-9]/.test(value),
                containsSpecial: value => /[#?!@$%^&*-]/.test(value),
            },
            confirm_password: {
                required,
                sameAsPassword: sameAs('password')
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