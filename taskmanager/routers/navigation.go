package routers

import (
	"github.com/gorilla/mux"
	"GFW/taskmanager/controllers" 
	"net/http"
)

func SetNavigationRoutes(router *mux.Router) *mux.Router {
	 router.PathPrefix("/static/").Handler(http.StripPrefix("/static/",http.FileServer(http.Dir("./static"))))
	// subrouter := router.PathPrefix("/taskmanager/").Subrouter()
	 router.HandleFunc("/", controllers.IndexPage)
	 router.HandleFunc("/signup", controllers.RegisterPage)
	 router.HandleFunc("/success", controllers.SuccessPage)
	 router.HandleFunc("/login", controllers.LoginPage)
	 router.HandleFunc("/taskmanager/all", controllers.TaskManagerAll)
	 // router.HandleFunc("/taskmanager/tasks", controllers.TaskManagerTasks)
	 // router.HandleFunc("/taskmanager/notes", controllers.TaskManagerNotes)
	 // router.HandleFunc("/taskmanager/get", controllers.TaskManagerGet)
	 // router.HandleFunc("/taskmanager/create", controllers.TaskManagerCreate)
	 // router.HandleFunc("/taskmanager/update", controllers.TaskManagerUpdate)
	 // router.HandleFunc("/taskmanager/delete", controllers.TaskManagerDelete)
	  router.HandleFunc("/taskmanager/createNotebook", controllers.CreateNotebook)
	  router.HandleFunc("/taskmanager/updateTask/{id}", controllers.UpdateNotebookPage)
	  router.HandleFunc("/taskmanager/updateNote/{id}", controllers.UpdateNotePage)
	 // router.HandleFunc("/taskmanager/getTaskByUser", controllers.TaskManagerGetTaskByUser)
	  router.HandleFunc("/taskmanager/createNote", controllers.CreateNotePage)


	return router
}