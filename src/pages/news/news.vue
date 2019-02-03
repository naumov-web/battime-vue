<template>
    <div id="news-page" class="left-oriented">
        <h2>Новости</h2>
        <div>
            <router-link class="btn btn-success" to="news/add">Добавить</router-link>
        </div>
        <div class="table-wrapper">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Наименование</th>
                        <th>Последнее обновление</th>
                        <th>Опубликовано</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in items">
                        <td>{{ item.id }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.updated_at }}</td>
                        <td><input type="checkbox" v-bind:checked="item.visible" @click="toggleEnabled(item)" /></td>
                        <td>
                            <router-link v-bind:to="'news/' + item.id" class="btn btn-warning">Редактирование</router-link>
                        </td>
                        <td>
                            <button @click="deleteItem(item.id)" class="btn btn-danger">Удалить</button>
                        </td>
                        <td>
                            <router-link v-bind:to="'news/' + item.id + '/comments'" class="btn btn-primary">Комментарии</router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

    import apiNews from '@/api/news';

    export default {

        name: 'NewsListPage',

        data() {
            return {
                items: []
            };
        },

        methods: {
            deleteItem(id){
                if (confirm("Вы уверены, что хотите удалить новость?")) {
                    apiNews.delete(id)
                        .then((data) => {
                            this.loadItems();
                        })
                        .catch(
                            (errors) => {
                                alert('Что-то пошло не так :-(');
                            }
                        );
                }
                return false;
            },
            loadItems(){
                apiNews.fetch().then((data) => {
                    if (data.data.items) {
                        this.items = data.data.items;
                    }
                });
            },
            toggleEnabled(item) {
                item.visible = !item.visible;
                if (item.visible) {
                    apiNews.showOne(item.id);
                }
                else {
                    apiNews.hideOne(item.id);
                }
            }
        },

        created() {
            this.loadItems();
        }
    };

</script>

<style scoped>

    .table-wrapper {
        margin-top: 20px;
    }
    
</style>