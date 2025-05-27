import { ref } from 'vue'

export const useHitokoto = () => {
    const hitokoto = ref('')
    const isHovered = ref(false)
    const isRefreshing = ref(false)
      const fetchHitokoto = async () => {
        if (isRefreshing.value) return
        
        isRefreshing.value = true
        isHovered.value = false  // 重置悬浮状态
        let newText = ''
        
        try {
            const response = await fetch('https://v1.hitokoto.cn/?encode=text')
            newText = await response.text()
              // 显示完成图标的持续时间
            await new Promise(resolve => setTimeout(resolve, 500))
        } catch (error) {
            console.error('Failed to fetch hitokoto:', error)
            newText = hitokoto.value
        } finally {
            hitokoto.value = newText
            isRefreshing.value = false
        }
    }

    // 在组件挂载时获取一次一言
    onMounted(() => {
        fetchHitokoto()
    })

    return {
        hitokoto,
        isHovered,
        isRefreshing,
        fetchHitokoto
    }
}
