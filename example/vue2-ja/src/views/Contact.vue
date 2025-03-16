<!--
 * @Date: 2025-01-22 11:03:34
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-03-16 18:31:55
 * @FilePath: /i18n_translation_vite/example/vue2/src/views/Contact.vue
-->
<template>
    <div class="contact">
        <h1>お問い合わせ</h1>
        <div class="contact-content">
            <div class="contact-info">
                <h3>連絡先</h3>
                <p>電話：123-456-7890</p>
                <p>メール：contact@example.com</p>
                <p>住所：某某市某某区某某街道123号</p>
            </div>
            <div class="contact-form">
                <h3>メッセージフォーム</h3>
                <a-form :model="form">
                    <a-form-item label="名前">
                        <a-input v-model="form.name" />
                    </a-form-item>
                    <a-form-item label="メールアドレス">
                        <a-input v-model="form.email" />
                    </a-form-item>
                    <a-form-item label="メッセージ">
                        <a-textarea v-model="form.message" :rows="4" />
                    </a-form-item>
                    <a-form-item>
                        <a-button type="primary" @click="submitForm">送信</a-button>
                    </a-form-item>
                </a-form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Contact',
    data() {
        return {
            form: {
                name: '',
                email: '',
                message: ''
            }
        }
    },
    methods: {
        submitForm() {
            console.log('フォームを送信:', this.form)
            // ここにフォーム送信ロジックを追加
        }
    }
}
</script>

<style scoped>
.contact {
    padding: 20px;
}

.contact-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    margin-top: 20px;
}

.contact-info,
.contact-form {
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
    .contact-content {
        grid-template-columns: 1fr;
    }
}
</style>
<!-- element-tag-marker: iw6m4f2b -->
