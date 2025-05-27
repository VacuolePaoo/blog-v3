import { ref } from 'vue'

export const useHitokoto = () => {
    const hitokoto = ref('')

    const fetchHitokoto = async () => {
        try {
            const response = await fetch('https://v1.hitokoto.cn/?encode=text')
            hitokoto.value = await response.text()
        } catch (error) {
            console.error('Failed to fetch hitokoto:', error)
            hitokoto.value = ''
        }
    }

    // 在组件挂载时获取一次一言
    onMounted(() => {
        fetchHitokoto()
    })

    return {
        hitokoto
    }
}
