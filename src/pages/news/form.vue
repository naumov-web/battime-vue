<template>
    <div id="news-form-page" class="left-oriented">
        <form action="" method="post" class="form news-form">
            <h2>{{ page_title }}</h2>
            <div class="form-row">
                <label>Заголовок новости</label>
                <input type="text" v-validate="'required'" v-model="name" name="name" class="form-control" />
                <div class="error-message" v-show="errors.has('name')">Поле должно быть заполнено</div>
            </div>
            <div class="form-row">
                <label>Аннотация</label>
                <textarea rows="5" v-validate="'required'" v-model="annotation" name="annotation" class="form-control"></textarea>
                <div class="error-message" v-show="errors.has('annotation')">Поле должно быть заполнено</div>
            </div>
            <div class="form-row text-editor-row">
                <label>Текст</label>
                <vue-editor v-model="text"></vue-editor>
            </div>
            <div class="form-row files-row">
                <label>Фотографии</label>
                <div class="files">
                    <div v-for="file in files" class="file">
                        <img :src="file.url" alt="File" />
                        <button type="button" @click="deleteFile(file)" class="delete-button">
                            <img src="./../../assets/delete.svg" alt="" />
                        </button>
                        <div>
                            <input type="radio" @click="setMainFile(file)" v-bind:checked="file.is_main" />
                        </div>
                    </div>
                </div>
                <input type="file" @change="addFile" />
                <div class="files">
                    <div v-for="file in new_files" class="file">
                        <img :src="file.content" alt="New file" />
                        <button type="button" @click="deleteFile(file)" class="delete-button">
                            <img src="./../../assets/delete.svg" alt="" />
                        </button>
                        <div>
                            <input type="radio" @click="setMainFile(file)" v-bind:checked="file.is_main" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="form-row categories-row">
                <label>Категории:</label>
                <div class="category" v-for="category in all_categories">
                    <label>
                        <input type="checkbox" @click="toggleCategory(category.id)" 
                            v-bind:checked="isCategoryChecked(category.id)"
                            v-bind:id="'category' + category.id" />
                        {{ category.name }}
                    </label>
                </div>
            </div>
            <div class="form-row">
                <label>
                    <input type="checkbox" v-model="visible" />
                    Опубликовано
                </label>
            </div>
            <div class="form-row">
                <label>
                    <input type="checkbox" v-model="is_main" />
                    Тема номера
                </label>
            </div>
            <div class="form-row">
                <label>
                    <input type="checkbox" v-model="is_day_main" />
                    Новость дня
                </label>
            </div>
            <div class="form-row">
                <button @click="save" type="button" class="btn btn-success submit">
                    Сохранить
                </button>
                <router-link class="btn btn-light" to="/news">Назад</router-link>
            </div>
        </form>
    </div>
</template>

<script>

    import { VueEditor } from "vue2-editor";
    import Files from '@/helpers/files';
    import apiNews from '@/api/news';
    import apiHandbooks from '@/api/handbooks';
    import { required, email, minLength } from "vuelidate/lib/validators";

    export default {
        components: {
            VueEditor
        },

        name: 'NewsFormPage',

        data() {
            return {
                page_title: 'Добавить новость',
                id: null,
                name: '',
                annotation: '',
                text: '',
                visible: false,
                new_files: [],
                files: [],
                category_ids: [],
                all_categories: [],
                is_main: false,
                is_day_main: false,
            };
        },

        mounted() {
            this.id = this.$route.params.id;
            if (this.id) {
                this.page_title = 'Редактировать новость';
                apiNews.fetchOne(this.id)
                .then((response) => {
                    var data = response.data;
                    for(var k in data) {
                        this[k] = data[k];
                    }
                })
                .catch(
                        (errors) => {
                            alert('Что-то пошло не так :-(');
                        }
                    );
            }
            apiHandbooks.categories()
                .then(
                    (response) => {
                        this.all_categories = response.data;
                    }
                );
        },

        methods: {
            setMainFile(file){
                for(let i = 0, len = this.files.length; i < len; i++) {
                    this.files[i].is_main = false;
                }
                for(let i = 0, len = this.new_files.length; i < len; i++) {
                    this.new_files[i].is_main = false;
                }
                file.is_main = true;
            },
            toggleCategory(id) {
                var index = this.category_ids.indexOf(id);
                if (index !== -1) {
                    this.category_ids.splice(index, 1);
                }
                else {
                    this.category_ids.push(id);
                }
            },
            isCategoryChecked(id) {
                return this.category_ids.indexOf(id) !== -1;
            },
            deleteFile(file) {
                for(let i = 0, len = this.files.length; i < len; i++) {
                    if (this.files[i] == file) {
                        this.files.splice(i, 1);
                        break;
                    }
                }
                for(let i = 0, len = this.new_files.length; i < len; i++) {
                    if (this.new_files[i] == file) {
                        this.new_files.splice(i, 1);
                        break;
                    }
                }
                return false;
            },
            addFile(event){
                var files = event.target.files;
                for(let i = 0, len = files.length; i < len; i++)
                {
                    Files.toBase64(files[i]).then(
                        (data) => {
                            this.new_files.push({
                                name: files[i].name,
                                type: files[i].type,
                                content: data,
                                is_main: false
                            });
                        }
                    );
                }
            },
            save(){
                let payload = {
                    name: this.name,
                    annotation: this.annotation,
                    text: this.text,
                    visible: this.visible,
                    files: this.files,
                    new_files: this.new_files,
                    category_ids: this.category_ids,
                    is_main: this.is_main,
                    is_day_main: this.is_day_main
                };
                
                if (!this.id) {
                    this.$validator.validateAll().then((result) => {
                        if (result) {
                            apiNews.create(payload)
                                .then(
                                    (response) => {
                                        this.$router.push('/news');
                                    }
                                )
                                .catch(
                                    (errors) => {
                                        alert('Что-то пошло не так :-(');
                                    }
                                );
                        }
                    });
                }
                else {
                    this.$validator.validateAll().then((result) => {
                        if (result) {
                            apiNews.update(this.id, payload)
                                .then(
                                    (response) => {
                                        this.$router.push('/news');
                                    }
                                )
                                .catch(
                                    (errors) => {
                                        alert('Что-то пошло не так :-(');
                                    }
                                );
                        }
                    });
                }
            },
        },
    };

</script>

<style scoped>
    .news-form .submit {
        margin-right: 20px;
    }
    .news-form textarea {
        resize: none;
    }
    .text-editor-row {
        flex-direction: column;
    }
    .files-row {
        flex-direction: column;
    }
    .files {
        padding-top: 10px;
        padding-bottom: 10px;
        display: flex;
    }
    .files .file {
        margin-right: 10px;
        position: relative;
    }
    .files .file img {
        max-height: 100px;
    }
    .files .file > div {
        text-align: center;
    }
    .delete-button {
        width: 30px;
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
    }
    .delete-button img {
        width: 15px;
    }
    .categories-row {
        display: block;
    }
</style>
