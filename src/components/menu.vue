<template>
    <div class="menu">
        <div class="btn-group" role="group">
            <router-link to="/news" class="btn btn-info">Новости</router-link>
            <router-link v-if="false" to="/news-requests" class="btn btn-info">Предложения новостей</router-link>
            <router-link to="/banners" class="btn btn-info">Баннеры</router-link>
            <router-link to="/questions" class="btn btn-info">Опросы</router-link>
            <router-link to="/login" class="btn btn-secondary">Выход</router-link>
        </div>
    </div>
</template>

<script>
    export default {};
</script>