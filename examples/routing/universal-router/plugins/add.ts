export default defineNuxtPlugin(() => {
  const timer = useState('timer', () => 0)

  if (import.meta.client) {
    let timerRunning = false
    addRouteMiddleware(async () => {
      if (timerRunning) return

      console.log('Starting timer...')
      timerRunning = true
      timer.value = 5

      do {
        await new Promise(resolve => setTimeout(resolve, 100))
        console.log('Timer:', timer.value)
        timer.value--
      } while (timer.value > 0)

      console.log('...and navigating')
      timerRunning = false
    })
  }

  addRouteMiddleware((to) => {
    if (to.path === '/forbidden') {
      return false
    }
  })

  addRouteMiddleware((to) => {
    const { $config } = useNuxtApp()
    if ($config) {
      console.log('Accessed runtime config within middleware.')
    }

    if (to.path !== '/redirect') {
      return
    }

    console.log('Heading to', to.path, 'but I think we should go somewhere else...')
    return '/secret'
  })
})
