<template>
    <div id="questions-page" class="left-oriented">
        <h2>Опросы</h2>
        <div>
            <router-link class="btn btn-success" to="questions/add">Добавить</router-link>
        </div>
        <div class="table-wrapper">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Вопрос</th>
                        <th>Изменено</th>
                        <th>Опубликовано</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in items">
                        <td>{{ item.id }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.updated_at }}</td>
                        <td>
                            <input type="checkbox" v-bind:checked="item.is_enabled" @click="toggleEnabled(item)" />
                        </td>
                        <td>
                            <router-link v-bind:to="'questions/' + item.id" class="btn btn-warning">Редактирование</router-link>
                        </td>
                        <td>
                            <button @click="deleteItem(item.id)" class="btn btn-danger">Удалить</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>

    import apiQuestions from '@/api/questions';

    export default {

        name: 'QuestionsListPage',

        data() {
            return {
                items: []
            };
        },

        methods: {
            deleteItem(id){
                if (confirm("Вы уверены, что хотите удалить опрос?")) {
                    apiQuestions.delete(id)
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
                apiQuestions.fetch().then((data) => {
                    if (data.data.items) {
                        this.items = data.data.items;
                    }
                });
            },
            toggleEnabled(item) {
                item.is_enabled = !item.is_enabled;
                if (item.is_enabled) {
                    apiQuestions.enableOne(item.id);
                }
                else {
                    apiQuestions.disableOne(item.id);
                }
            }
        },

        created() {
            this.loadItems();
        }

    }

</script>

<style scoped>

    .table-wrapper {
        margin-top: 20px;
    }
    
</style>