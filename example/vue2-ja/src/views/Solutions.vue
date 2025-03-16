<!--
 * @Date: 2025-01-22 11:03:24
 * @LastEditors: xiaoshan
 * @LastEditTime: 2025-03-16 18:33:50
 * @FilePath: /i18n_translation_vite/example/vue2/src/views/Solutions.vue
-->
<template>
    <div class="solutions">
        <h1>ソリューション</h1>
        <div class="solutions-content">
            <div class="solution-card" v-for="(solution, index) in solutions" :key="index">
                <h3>{{ solution.name }}</h3>
                <p>{{ solution.description }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Solutions',
    data() {
        return {
            solutions: [
                {
                    name: 'ソリューション1',
                    description: 'ソリューション1の詳細な説明'
                },
                {
                    name: 'ソリューション2',
                    description: 'ソリューション2の詳細な説明'
                }
            ]
        }
    }
}
</script>

<style scoped>
.solutions {
    padding: 20px;
}

.solutions-content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
}

.solution-card {
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
<!-- element-tag-marker: 6no4at2d -->
