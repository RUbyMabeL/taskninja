const baseUrl = 'http://127.0.0.1:8000'

const app = Vue.createApp({
  data: function () {
    return {
      title: 'TaskNinja',
      token: '',
      user: {},
      tasks: [],
      lists:[],
      showNewTask: false,
      showEditTask: false,
      loginForm: {
        email: '',
        password: ''
      },
      taskForm: {
        content: '',
        list_id: '',
        due_date: '',
        priority: ''
      },
      editForm: {
        id: '',
        content: '',
        list_id: '',
        due_date: '',
        priority: '',
        completed: ''
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
    // Tasks CRUD
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
        this.tasks.push(json)
        this.showNewTask = false

      } catch (error) {
        console.log(error)
      }
    },
    editTask: async function (task) {
      this.showEditTask = true
      this.editForm = { ...task }
    },
    updateTask: async function () {
      try {
        //url: baseUrl/api/users/id/notes
        const response = await fetch(`${baseUrl}/api/users/${this.user.id}/tasks/${this.editForm.id}`, {
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          },
          body: JSON.stringify(this.editForm)
        })

        const json = await response.json()
        // this.tasks = await response.json()
        var allTasks = this.tasks
        for (let i = 0; i < allTasks.length; i++) {
          if (allTasks[i].id === json.id) {
            allTasks[i].content = json.content;
            allTasks[i].due_date = json.due_date;
            allTasks[i].priority = json.priority;
            allTasks[i].list_id = json.list_id;
            allTasks[i].completed = json.completed;
          }
        }

        // this.tasks.push(json)
        this.showEditTask = false

      } catch (error) {
        console.log(error)
      }
    },
    deleteTask: async function (task) {
      try {
        //url: baseUrl/api/users/id/notes
        const response = await fetch(`${baseUrl}/api/users/${this.user.id}/tasks/${task.id}`, {
          method: 'delete',
          headers: {
            'Authorization': `Bearer ${this.token}`
          },
        })
        this.tasks.splice(this.tasks.findIndex(a => a.id === task.id), 1)

      } catch (error) {
        console.log(error)
      }
    },

    // Lists CRUD
    getLists: async function () {
      try {
        if (this.user.id && this.token) {
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

    logout: async function () {
      this.token = ''
      this.user = {}
    }
  }
})

app.mount('#app')