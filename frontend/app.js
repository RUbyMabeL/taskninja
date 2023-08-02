const baseUrl = 'http://127.0.0.1:8000'

const app = Vue.createApp({
  data: function () {
    return {
      title: 'TaskNinja',
      token: '',
      user: {},
      tasks: [],
      showNewTask: false,
      showEditTask: false,
      loginForm: {
        email: '',
        password: ''
      },
      taskForm: {
        content: ''
      },
      editForm: {
        content: ''
      }
    }
  },
  created: async function () {
    this.token = sessionStorage.getItem('token') || ''
    this.user = JSON.parse(sessionStorage.getItem('user') || {})

    this.getTasks()
  },
  methods: {
    login: async function () {
      try {
        const response = await fetch(`${baseUrl}/login`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(this.loginForm)
        })

        const json = await response.json()
        this.token = json.token
        this.user = json.user
        sessionStorage.setItem('token', this.token)
        sessionStorage.setItem('user', JSON.stringify(json.user))
        this.getTasks()

      } catch (error) {
        console.log(error)
      }
    },
    getTasks: async function () {
      try {
        if (this.user.id && this.token) {
          //baseUrl/api/users/{id}/notes
          const response = await fetch(`${baseUrl}/api/users/${this.user.id}/tasks`, {
            method: 'get',
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${this.token}`
            }
          })

          this.tasks = await response.json()
        }
      } catch (error) {
        console.log(error)
      }
    },
    addTask: async function () {
      try {
        //url: baseUrl/api/users/id/notes
        const response = await fetch(`${baseUrl}/api/users/${this.user.id}/tasks`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`
          },
          body: JSON.stringify(this.taskForm)
        })

        const json = await response.json()
        this.notes.push(json)
        this.showNewTask = false

      } catch (error) {
        console.log(error)
      }
    },
    editTask: function (task) {

    },
    updateTask: async function () {

    },
    deleteTask: async function (task) {

    },
    logout: async function () {

    }

  }
})

app.mount('#app')