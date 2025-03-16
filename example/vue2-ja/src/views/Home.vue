<template>
    <div class="content">
        <div class="hero-section">
            <h1>弊社の企業ポータルへようこそ</h1>
            <p class="hero-text">専門的な企業レベルのソリューションを提供いたします</p>
            <div class="hero-buttons">
                <a-button type="primary" size="large" @click="learnMore">詳細を見る</a-button>
                <a-button size="large" @click="contactUs">お問い合わせ</a-button>
            </div>
        </div>

        <div class="features-section">
            <h2>当社の強み</h2>
            <div class="features-grid">
                <div class="feature-card">
                    <a-icon type="solution" class="feature-icon" />
                    <h3>専門的なサービス</h3>
                    <p>
                        全方位的な企業サービスソリューションを提供し、あなたの様々なビジネスニーズに対応いたします。当社の専門チームは豊富な業界経験を持ち、あなたに最適なソリューションをカスタマイズできます。
                    </p>
                    <ul class="feature-list">
                        <li>企業管理コンサルティング</li>
                        <li>プロセス最適化方案</li>
                        <li>リスク管理サービス</li>
                    </ul>
                </div>
                <div class="feature-card">
                    <a-icon type="bulb" class="feature-icon" />
                    <h3>技術革新</h3>
                    <p>
                        継続的に技術を革新し、企業に最先端の技術サポートを提供します。当社は多くの資源を研究開発に投入し、お客様に最も先進的な技術ソリューションを提供することを保証します。
                    </p>
                    <ul class="feature-list">
                        <li>人工知能の応用</li>
                        <li>クラウドコンピューティングサービス</li>
                        <li>ブロックチェーン技術</li>
                    </ul>
                </div>
                <div class="feature-card">
                    <a-icon type="team" class="feature-icon" />
                    <h3>優れたチーム</h3>
                    <p>
                        経験豊富な専門チームを擁し、あなたに最高のサービス体験を提供します。当社のチームメンバーはすべて業界のトップ企業出身で、深い専門知識を持っています。
                    </p>
                    <ul class="feature-list">
                        <li>資深技術専門家</li>
                        <li>業界分野のコンサルタント</li>
                        <li>専門のカスタマーサービスチーム</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="statistics-section">
            <h2>会社のデータ</h2>
            <div class="statistics-grid">
                <div class="statistic-item">
                    <h3>1000社以上</h3>
                    <p>サービスしたお客様</p>
                </div>
                <div class="statistic-item">
                    <h3>50社以上</h3>
                    <p>パートナー</p>
                </div>
                <div class="statistic-item">
                    <h3>200名以上</h3>
                    <p>専門チーム</p>
                </div>
                <div class="statistic-item">
                    <h3>15年</h3>
                    <p>業界経験</p>
                </div>
            </div>
        </div>

        <div class="about-section">
            <h2>当社について</h2>
            <div class="about-content">
                <div class="about-text">
                    <p>
                        当社は、企業に全方位的なソリューションを提供することに専念するテクノロジー企業です。継続的な革新と専門的なサービスを通じて、お客様のビジネス拡大とデジタルトランスフォーメーションを支援しています。
                    </p>
                    <p>
                        設立以来、当社は常に「お客様を中心とした」サービス理念を堅持し、サービス品質と技術レベルを不断に向上させ、お客様により大きな価値を創造しています。
                    </p>
                    <div class="company-values">
                        <div class="value-item">
                            <h4>ビジョン</h4>
                            <p>世界をリードする企業サービスソリューションプロバイダーになる</p>
                        </div>
                        <div class="value-item">
                            <h4>ミッション</h4>
                            <p>技術革新で企業の発展を推進する</p>
                        </div>
                        <div class="value-item">
                            <h4>価値観</h4>
                            <p>誠実さ、革新、専門性、ウィンウィン</p>
                        </div>
                    </div>
                </div>
                <div class="about-image">
                    <img src="../assets/logo.png" alt="会社概要" />
                </div>
            </div>
        </div>

        <div class="contact-section">
            <h2>お問い合わせ</h2>
            <div class="contact-container">
                <div class="contact-info">
                    <h3>連絡先</h3>
                    <div class="info-item">
                        <a-icon type="phone" />
                        <p>
                            <strong>サービスホットライン：</strong>
                            400-888-8888
                        </p>
                    </div>
                    <div class="info-item">
                        <a-icon type="mail" />
                        <p>
                            <strong>ビジネスメール：</strong>
                            contact@company.com
                        </p>
                    </div>
                    <div class="info-item">
                        <a-icon type="environment" />
                        <p>
                            <strong>会社の住所：</strong>
                            北京市朝阳区科技園区88号
                        </p>
                    </div>
                    <div class="info-item">
                        <a-icon type="clock-circle" />
                        <p>
                            <strong>営業時間：</strong>
                            月曜日から金曜日 9:00-18:00
                        </p>
                    </div>
                </div>
                <div class="contact-form">
                    <h3>オンラインでのお問い合わせ</h3>
                    <a-form :form="formData" @submit="handleSubmit">
                        <a-form-item label="氏名">
                            <a-input
                                v-model="formData.name"
                                placeholder="あなたの氏名を入力してください"
                            />
                        </a-form-item>
                        <a-form-item label="電話番号">
                            <a-input
                                v-model="formData.phone"
                                placeholder="あなたの連絡先電話番号を入力してください"
                            />
                        </a-form-item>
                        <a-form-item label="メールアドレス">
                            <a-input
                                v-model="formData.email"
                                placeholder="あなたのメールアドレスを入力してください"
                            />
                        </a-form-item>
                        <a-form-item label="お問い合わせ内容">
                            <a-textarea
                                v-model="formData.message"
                                :rows="4"
                                placeholder="あなたがお問い合わせしたい内容を入力してください"
                            />
                        </a-form-item>
                        <a-form-item>
                            <a-button type="primary" html-type="submit">送信</a-button>
                        </a-form-item>
                    </a-form>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const formData = ref({
    name: '',
    phone: '',
    email: '',
    message: ''
})

const learnMore = () => {
    // 詳細を見る機能を実装
}

const contactUs = () => {
    // お問い合わせ機能を実装
}

const handleSubmit = () => {
    // フォーム送信機能を実装
    console.log('送信されたフォームデータ：', formData.value)
}
</script>

<style>
.content {
    display: flex;
    flex-direction: column;
    text-align: left;
    padding: 2rem;
}

.hero-section {
    text-align: center;
    padding: 6rem 0;
    background-color: #f5f7fa;
    border-radius: 8px;
    margin-bottom: 3rem;
    position: relative;
    overflow: hidden;
}

.hero-buttons {
    margin-top: 2rem;
}

.hero-buttons .ant-btn {
    margin: 0 1rem;
}

.hero-text {
    font-size: 1.4rem;
    color: #666;
    margin-top: 1.5rem;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
}

.features-section {
    margin-bottom: 4rem;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.feature-card {
    padding: 2rem;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.feature-card:hover {
    transform: translateY(-5px);
}

.feature-icon {
    font-size: 2.5rem;
    color: #1890ff;
    margin-bottom: 1rem;
}

.feature-list {
    margin-top: 1rem;
    padding-left: 1.5rem;
}

.feature-list li {
    margin-bottom: 0.5rem;
    color: #666;
}

.statistics-section {
    background-color: #1890ff;
    color: white;
    padding: 4rem 2rem;
    border-radius: 8px;
    margin-bottom: 4rem;
}

.statistics-section h2 {
    color: white;
    text-align: center;
}

.statistics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
    text-align: center;
}

.statistic-item h3 {
    font-size: 2.5rem;
    color: white;
    margin-bottom: 0.5rem;
}

.about-section,
.contact-section {
    margin-bottom: 4rem;
}

.about-content {
    display: grid;
    grid-template-columns: 3fr 2fr;
    gap: 3rem;
    align-items: center;
}

.company-values {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-top: 2rem;
}

.value-item {
    text-align: center;
    padding: 1.5rem;
    background-color: #f5f7fa;
    border-radius: 8px;
}

.contact-container {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 3rem;
}

.contact-info {
    background-color: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.info-item {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
}

.info-item .anticon {
    margin-right: 1rem;
    color: #1890ff;
}

.contact-form {
    background-color: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

h1,
h2,
h3,
h4 {
    color: #2c3e50;
}

h2 {
    margin-bottom: 1.5rem;
    font-size: 2rem;
}

p {
    line-height: 1.6;
    color: #666;
}

@media (max-width: 768px) {
    .about-content,
    .contact-container {
        grid-template-columns: 1fr;
    }

    .statistics-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>

<!-- element-tag-marker: v40vri28 -->
