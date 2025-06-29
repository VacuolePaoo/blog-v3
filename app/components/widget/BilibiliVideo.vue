<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  bvId: string
}>()

const videoInfo = ref({
  title: '',
  cover: '',
  author: '',
  views: 0,
  danmaku: 0
})

const loading = ref(true)
const error = ref(false)

// 模拟从B站API获取视频信息
const fetchVideoInfo = async () => {
  // 实际应用中应该调用B站开放API获取真实数据
  // 这里仅做演示使用模拟数据
  loading.value = true
  error.value = false
  
  try {
    // 模拟网络请求延迟
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 模拟返回的数据
    videoInfo.value = {
      title: '这就是中国风|液泡实验室',
      cover: 'https://i0.hdslb.com/bfs/archive/abf1bb4412360550a18e5f2e71b1227e7d949735.png',
      author: '液泡学院',
      views: 15000,
      danmaku: 245
    }
  } catch (err) {
    error.value = true
    console.error('获取视频信息失败:', err)
  } finally {
    loading.value = false
  }
}

// 当bvId变化时重新获取视频信息
watch(
  () => props.bvId,
  (newVal) => {
    if (newVal) {
      fetchVideoInfo()
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="bilibili-video-card">
    <div v-if="loading" class="loading">加载中...</div>
    <div v-else-if="error" class="error">获取视频信息失败</div>
    <div v-else class="video-content">
      <img :src="cover" alt="视频封面" class="video-cover">
      <h3 class="video-title">{{ title }}</h3>
      <p class="video-author">UP主: {{ author }}</p>
      <div class="video-stats">
        <span>播放: {{ views.toLocaleString() }}</span>
        <span>弹幕: {{ danmaku.toLocaleString() }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bilibili-video-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  font-family: Arial, sans-serif;
  
  .video-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .video-cover {
    width: 100%;
    border-radius: 6px;
    margin-bottom: 0.8rem;
  }
  
  .video-title {
    font-size: 1.1rem;
    font-weight: bold;
    margin: 0 0 0.5rem 0;
    line-height: 1.4;
  }
  
  .video-author {
    color: #666;
    font-size: 0.9rem;
    margin: 0 0 0.8rem 0;
  }
  
  .video-stats {
    display: flex;
    justify-content: space-between;
    width: 100%;
    font-size: 0.8rem;
    color: #999;
    
    span {
      flex: 1;
    }
  }
  
  .loading,
  .error {
    text-align: center;
    padding: 1.5rem 0;
    color: #333;
  }
}
</style>