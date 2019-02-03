<template>
    <div id="banners-form-page" class="left-oriented">
        <form action="" method="post" class="form banners-form">
            <h2>{{ page_title }}</h2>
            <div class="form-row">
                <label>Заголовок баннера</label>
                <input type="text" v-validate="'required'" v-model="name" name="name" class="form-control" />
                <div class="error-message" v-show="errors.has('name')">Поле должно быть заполнено</div>
            </div>
            <div class="form-row">
                <label>Наименование компании</label>
                <input type="text" v-model="company_name" name="company_name" class="form-control" />
            </div>
            <div class="form-row">
                <label>Ссылка для перехода</label>
                <input type="text" v-model="link" name="link" class="form-control" />
            </div>
            <div class="form-row">
                <label>Место расположения</label>
                <select name="place_id" v-model="place_id" class="form-control">
                    <option v-for="place in banner_places" :selected="place.id == place_id" :value="place.id">{{place.name}}</option>
                </select>
            </div>
            <div class="form-row files-row">
                <label>Изображение</label>
                <input type="file" @change="addFile" />
                <div class="files">
                    <div v-if="new_file" class="file">
                        <img :src="new_file.content" alt="New file" />
                        <button type="button" @click="deleteFile(new_file)" class="delete-button">
                            <img src="./../../assets/delete.svg" alt="" />
                        </button>
                    </div>
                    <div v-if="image" class="file">
                        <img :src="image.url" alt="File" />
                    </div>
                </div>
            </div>
            <div class="form-row files-row">
                <label>Изображение для мобильной версии</label>
                <input type="file" @change="addFileMobile" />
                <div class="files">
                    <div v-if="new_file_mobile" class="file">
                        <img :src="new_file_mobile.content" alt="New file" />
                        <button type="button" @click="deleteFile(new_file_mobile)" class="delete-button">
                            <img src="./../../assets/delete.svg" alt="" />
                        </button>
                    </div>
                    <div v-if="image_mobile" class="file">
                        <img :src="image_mobile.url" alt="File" />
                    </div>
                </div>
            </div>
            <div class="form-row">
                <label>
                    <input type="checkbox" v-model="is_enabled" />
                    Опубликовано
                </label>
            </div>
            <div class="form-row">
                <button @click="save" type="button" class="btn btn-success submit">
                    Сохранить
                </button>
                <router-link class="btn btn-light" to="/banners">Назад</router-link>
            </div>
        </form>
    </div>
</template>

<script>

    import Files from '@/helpers/files';
    import apiHandbooks from '@/api/handbooks';
    import apiBanners from '@/api/banners';

    export default {
        name: 'BannersFormPage',

        data() {
            return {
                banner_places: [],
                page_title: 'Добавить баннер',
                id: null,
                name: '',
                company_name: '',
                link: '',
                image: null,
                image_mobile: null,
                new_file: null,
                new_file_mobile: null,
                is_enabled: false,
                place_id: null,
            };
        },

        mounted() {
            this.id = this.$route.params.id;
            if (this.id) {
                this.page_title = 'Редактировать баннер';
                this.resetFiles();
                apiBanners.fetchOne(this.id)
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
            apiHandbooks.bannerPlaces()
                .then(
                    (response) => {
                        this.banner_places = response.data;
                    }
                );
        },

        methods: {
            resetFiles() {
                this.new_file = null;
                this.new_file_mobile = null;
                this.image = null;
                this.image_mobile = null;
            },
            save() {
                let payload = {
                    name: this.name,
                    company_name: this.company_name,
                    link: this.link,
                    new_file: this.new_file,
                    new_file_mobile: this.new_file_mobile,
                    is_enabled: this.is_enabled,
                    place_id: this.place_id,
                };
                if (!this.id) {
                    this.$validator.validateAll().then((result) => {
                        if (result) {
                            apiBanners.create(payload)
                                .then(
                                    (response) => {
                                        this.$router.push('/banners');
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
                            apiBanners.update(this.id, payload)
                                .then(
                                    (response) => {
                                        this.$router.push('/banners');
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
            addFile(event) {
                var files = event.target.files;
                for(let i = 0, len = files.length; i < len; i++)
                {
                    Files.toBase64(files[i]).then(
                        (data) => {
                            this.new_file = {
                                name: files[i].name,
                                type: files[i].type,
                                content: data,
                                is_main: false
                            };
                            this.image = null;
                        }
                    );
                    break;
                }
            },
            addFileMobile(event) {
                var files = event.target.files;
                for(let i = 0, len = files.length; i < len; i++)
                {
                    Files.toBase64(files[i]).then(
                        (data) => {
                            this.new_file_mobile = {
                                name: files[i].name,
                                type: files[i].type,
                                content: data,
                                is_main: false
                            };
                            this.image_mobile = null;
                        }
                    );
                    break;
                }
            },
            deleteFile(file) {
                if (file == this.new_file) {
                    this.new_file = null;
                }
                if (file == this.new_file_mobile) {
                    this.new_file_mobile = null;
                }
            }
        }

    };

</script>

<style scoped>
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
</style>