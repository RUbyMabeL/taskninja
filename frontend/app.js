const baseUrl = 'http://127.0.0.1:8000'

const app = Vue.createApp({
  data: function () {
    return {
      title: 'TaskNinja',
      token: '',
      priorities: [],
      user: {},
      tasks: [],
      lists: [],
      showNewTask: false,
      showEditTask: false,
      showNewList: false,
      showEditList: false,
      showRegisterForm: false,
      RegisterSuccess: false,
      registerForm: {
        name: '',
        email: '',
        password: ''
      },
      loginForm: {
        email: '',
        password: ''
      },
      taskForm: {
        content: '',
        list_id: '',
        due_date: '',
        priority_id: ''
      },
      listForm: {
        user_id: '',
        name: ''
      },
      listForm: {
        user_id: '',
        name: ''
      },
      editForm: {
        id: '',
        content: '',
        list_id: '',
        due_date: '',
        priority_id: '',
        completed: ''
      },
      editListForm: {
        id: '',
        name: '',
        user_id: ''
      }
    }
  },
  created: async function () {
    this.token = sessionStorage.getItem('token') || ''
    //has an loading error
    this.user = JSON.parse(sessionStorage.getItem('user') || {})
    
    this.getLists()
    this.getTasks()
    this.getPriorities()
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
        this.getLists()
        this.getTasks()
        this.RegisterSuccess = false

        //clear the login form
        this.loginForm.email = ''
        this.loginForm.password = ''

      } catch (error) {
        console.log(error)
      }
    },
    //Register new user
    register: async function () {
      try {
        const response = await fetch(`${baseUrl}/register`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(this.registerForm)
        })
        console.log(await response.json())
        this.showRegisterForm = false
        this.RegisterSuccess = true

        // clear the Registerform
        this.registerForm.name = ''
        this.registerForm.email = ''
        this.registerForm.password = ''

      } catch (error) {
        console.log(error)
      }
    },
    togglePassword: function () {
      let x = document.getElementById("regi-password");
      if (x.type === "password") {
        x.type = "text";
      }
      else {
        x.type = "password";
      }
    },
    // Tasks CRUD
    getTasks: async function () {
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
    getPriorities: async function () {
      try {
        const response = await fetch(`${baseUrl}/api/priorities`, {
          method: 'get',
          headers: {
            'Accept': 'application/json'
          }
        });

        this.priorities = await response.json();
        console.log(this.priorities);

      } catch (error) {
        console.log('Error fetching priorities:', error);
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
        // clear the taskform
        this.taskForm.content = ''
        this.taskForm.due_date = ''
        this.taskForm.priority = ''
        this.taskForm.list_id = ''

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
        const response = await fetch(`${baseUrl}/api/users/${this.user.id}/tasks/${this.editForm.id}`, {
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          },
          body: JSON.stringify(this.editForm)
        })

        const json = await response.json()
        // update the specific task
        var allTasks = this.tasks
        for (let i = 0; i < allTasks.length; i++) {
          if (allTasks[i].id === json.id) {
            allTasks[i].content = json.content;
            allTasks[i].due_date = json.due_date;
            allTasks[i].priority_id = json.priority_id;
            allTasks[i].list_id = json.list_id;
            allTasks[i].completed = json.completed;
          }
        }
        this.showEditTask = false

      } catch (error) {
        console.log(error)
      }
    },
    deleteTask: async function (task_id) {
      try {
        const response = await fetch(`${baseUrl}/api/users/${this.user.id}/tasks/${task_id}`, {
          method: 'delete',
          headers: {
            'Authorization': `Bearer ${this.token}`
          },
        })
        this.tasks.splice(this.tasks.findIndex(a => a.id === task_id), 1)

      } catch (error) {
        console.log(error)
      }
    },

    // Lists CRUD
    getLists: async function () {
      try {
        if (this.user.id && this.token) {
          const response = await fetch(`${baseUrl}/api/users/${this.user.id}/lists`, {
            method: 'get',
            headers: {
              'Accept': 'application/json',
              'Authorization': `Bearer ${this.token}`
            }
          })

          this.lists = await response.json()
        }
      } catch (error) {
        console.log(error)
      }
    },
    addList: async function () {
      try {
        this.listForm.user_id = this.user.id;
        const response = await fetch(`${baseUrl}/api/users/${this.user.id}/lists`, {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`
          },
          body: JSON.stringify(this.listForm)
        })

        const json = await response.json()
        this.lists.push(json)

        // clear the lisrform
        this.listForm.name = ''

        this.showNewList = false

      } catch (error) {
        console.log(error)
      }
    },
    editList: async function (list) {
      this.showEditList = true
      this.editListForm = { ...list }
    },
    updateList: async function () {
      try {
        this.editListForm.user_id = this.user.id
        //url: baseUrl/api/users/id/notes
        const response = await fetch(`${baseUrl}/api/users/${this.user.id}/lists/${this.editListForm.id}`, {
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.token}`
          },
          body: JSON.stringify(this.editListForm)
        })

        const json = await response.json()
        // update the specific list
        var allLists = this.lists
        for (let i = 0; i < allLists.length; i++) {
          if (allLists[i].id === json.id) {
            allLists[i].name = json.name;
          }
        }

        this.showEditList = false

      } catch (error) {
        console.log(error)
      }
    },
    deleteList: async function (list_id) {
      try {
        const response = await fetch(`${baseUrl}/api/users/${this.user.id}/lists/${list_id}`, {
          method: 'delete',
          headers: {
            'Authorization': `Bearer ${this.token}`
          },
        })

        // get ids of all the tasks that belongs to the list
        let deleteTasksIds = [];
        for (let task of this.tasks) {
          if (task.list_id === list_id) {
            deleteTasksIds.push(task.id);
          }
        }
        console.log(deleteTasksIds);
        // delete all the tasks of current list
        for (let taskId of deleteTasksIds) {
          this.deleteTask(taskId);
        }

        // delete the list
        this.lists.splice(this.lists.findIndex(a => a.id === list_id), 1)

        this.showEditList = false;

      } catch (error) {
        console.log(error)
      }
    },
    //filter list
    filterList: async function (list) {
      this.editListForm.id = list.id
      this.editListForm.user_id = this.user.id
      try {
        const response = await fetch(`${baseUrl}/api/tasks/${this.user.id}/${this.editListForm.id}`, {
          method: 'get',
          headers: {
            'Authorization': `Bearer ${this.token}`
          },
        })
        this.tasks = await response.json()

      } catch (error) {
        console.log(error)
      }
    },

    logout: async function () {
      this.token = ''
      this.user = {}
    },

    getListName: function(listId) {
      const list = this.lists.find(list => list.id === listId);
      return list ? list.name : 'List Not Found';
    },

    getPriorityName: function (priorityId) {
      const priority = this.priorities.find(p => p.id === priorityId);
      return priority ? priority.level : 'Priority Not Found';
    },
  }
})

app.mount('#app')