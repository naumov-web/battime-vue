<template>
    <div id="news-form-page" class="left-oriented">
        <form action="" method="post" class="form questions-form">
            <h2>{{ page_title }}</h2>
            <div class="form-row">
                <label>Текст вопроса</label>
                <input type="text" v-validate="'required'" v-model="name" name="name" class="form-control" />
                <div class="error-message" v-show="errors.has('name')">Поле должно быть заполнено</div>
            </div>
            <div class="form-row">
                <label>
                    <input type="checkbox" v-model="is_enabled" />
                    Опубликовано
                </label>
            </div>
            <div class="form-row">
                <label>Варианты ответов</label>
                <div class="answer-row" v-for="answer in answers">
                    <input type="text" class="form-control" v-model="answer.name" />
                    <button type="button" @click="deleteAnswer(answer)" class="btn btn-danger btn-sm">Удалить</button>
                </div>
                <div class="add-answer-row">
                    <button type="button" @click="addAnswer" class="btn btn-success btn-sm">Добавить</button>
                </div>
            </div>
            <div class="form-row">
                <button @click="save" type="button" class="btn btn-success submit">
                    Сохранить
                </button>
                <router-link class="btn btn-light" to="/questions">Назад</router-link>
            </div>
        </form>
    </div>
</template>

<script>

    import apiQuestions from '@/api/questions';

    export default {
        name: 'QuestionsFormPage',

        data() {
            return {
                page_title: 'Добавить опрос',
                id: null,
                name: '',
                is_enabled: false,
                answers: []
            }
        },

        mounted() {
            this.id = this.$route.params.id;
            if (this.id) {
                this.page_title = 'Редактировать опрос';
                apiQuestions.fetchOne(this.id)
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
        },

        methods: {
            addAnswer() {
                this.answers.push({
                    name: ''
                });
            },
            deleteAnswer(answer) {
                for(let i = 0, len = this.answers.length; i < len; i++) {
                    if (this.answers[i] == answer) {
                        this.answers.splice(i, 1);
                        break;
                    }
                }
            },
            save() {
                let payload = {
                    name: this.name,
                    is_enabled: this.is_enabled,
                    answers: this.answers,
                };
                if (!this.id) {
                    this.$validator.validateAll().then((result) => {
                        if (result) {
                            apiQuestions.create(payload)
                                .then(
                                    (response) => {
                                        this.$router.push('/questions');
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
                            apiQuestions.update(this.id, payload)
                                .then(
                                    (response) => {
                                        this.$router.push('/questions');
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

            }
        }

    };

</script>

<style scoped>
    label {
        display: block;
    }
    .form-row {
        display: block;
    }
    .answer-row {
        display: flex;
        margin-bottom: 15px;
    }
    .answer-row input {
        margin-right: 15px;
    }
    .add-answer-row {
        margin-top: 20px;
    }
</style>