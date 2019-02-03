<template>
    <div id="index-page">
        <h2>Для работы в административной панели необходима авторизация</h2>
        <div>
            <router-link class="btn btn-success" to="login">Авторизация</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'IndexPage',
    }
</script>

<style scoped>
    h2 {
        margin-bottom: 30px;
    }
</style>
