<template>
    <div>
        <p>Username: {{ response.data.username }}</p>
        <p>Email: {{ response.data.email }}</p>
    <hr>
        <p>First Name: {{ response.data.firstName }}</p>
        <p>Last Name: {{ response.data.lastName }}</p>
    <hr>
    </div>
</template>

<script>
    import {HTTP} from "../http-common";

    export default {
        name: "Profile",
        data() {
            return {
                response: null,
                error: null,
            }
        },
        methods: {
            get_request: function() {
                return HTTP.get('user', {
                    headers: {
                        'Authorization': 'TOKEN_' + this.$cookies.get('session')
                    }
                })
            },
            set_data: function() {
                this.get_request()
                    .then(response => {
                        this.response = response;
                    })
                    .catch(e => {
                        this.error = e;
                    })
            }
        },
        created() {
            if (!this.$cookies.get('session')) {
                this.$router.push('/');
            }
            this.set_data()
        }
    }
</script>

<style scoped>

</style>