<template>
    <div id="banners-page" class="left-oriented">
        <h2>Баннеры</h2>
        <div>
            <router-link class="btn btn-success" to="banners/add">Добавить</router-link>
        </div>
        <div class="table-wrapper">
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Наименование</th>
                        <th>Компания</th>
                        <th>Количество переходов</th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in items">
                        <td>{{ item.id }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.company_name }}</td>
                        <td>{{ item.redirects_count }}</td>
                        <td>
                            <img v-if="item.image" class="preview-image" v-bind:src="item.image.url" alt="" />
                        </td>
                        <td>
                            <router-link v-bind:to="'banners/' + item.id" class="btn btn-warning">Редактирование</router-link>
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

    import apiBanners from '@/api/banners';

    export default {

        name: 'BannersListPage',

        data() {
            return {
                items: []
            };
        },

        methods: {
            deleteItem(id){
                if (confirm("Вы уверены, что хотите удалить баннер?")) {
                    apiBanners.delete(id)
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
                apiBanners.fetch().then((data) => {
                    if (data.data.items) {
                        this.items = data.data.items;
                    }
                });
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

    .preview-image {
        max-width: 100px;
    }
    
</style>