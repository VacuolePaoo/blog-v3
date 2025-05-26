interface IpResponse {
    ret: string;
    ip: string;
    data: string[];
}

export const useIpLocation = () => {
    const location = ref<string[]>([])
    const loading = ref(true)
    const error = ref<Error | null>(null)

    const fetchLocation = async () => {
        try {
            const currentYear = new Date().getFullYear()
            const response = await fetch(`https://${currentYear}.ipchaxun.com/`)
            const data: IpResponse = await response.json()
            
            if (data.ret === 'ok' && data.data.length >= 3) {
                location.value = data.data.slice(1, 3)
            }
        } catch (e) {
            error.value = e as Error
        } finally {
            loading.value = false
        }
    }

    onMounted(() => {
        fetchLocation()
    })

    return {
        location,
        loading,
        error
    }
}
