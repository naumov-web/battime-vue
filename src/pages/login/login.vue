<template>
    <div id="login-page">
        <form action="" class="form login-form">
            <h2>Авторизация</h2>
            <div v-if="errorMessage" class="alert alert-warning">
                {{errorMessage}}
            </div>
            <div class="form-row">
                <label>Логин</label>
                <input type="email" v-model="email" class="form-control" />
            </div>
            <div class="form-row">
                <label>Пароль</label>
                <input type="password" v-model="password" class="form-control" />
            </div>
            <div class="form-row">
                <button @click="login" type="button" class="btn btn-success">
                    Войти
                </button>
            </div>
        </form>
    </div>
</template>

<script>

    import loginApi from '@/api/login';
    import auth from '@/helpers/auth';

    export default {
        name: 'LoginPage',
        data() {
            return {
                email: '',
                password: '',
                errorMessage: null
            };
        },
        methods: {
            login() {
                loginApi.login(this.email, this.password)
                        .then(
                            (response) => {
                                let data = response.data;
                                auth.setAuthToken(data.token);
                                this.$router.push('/news');
                            }
                        )
                        .catch(
                            (error) => {
                                this.errorMessage = 'Неверный логин или пароль!';
                            }
                        );
            },
        },
    };

</script>

<style scoped>
    h2 {
        margin-bottom: 25px;
    }
    .login-form {
        margin: auto;
        max-width: 600px;
    }
</style>
