<template>
    <div>
        <a href="" @click="logout">Logout</a>
    </div>
</template>

<script>
    export default {
        name: "Logout",
        methods: {
            logout: function() {
                this.$cookies.remove('session')
            }
        }
    }
</script>
