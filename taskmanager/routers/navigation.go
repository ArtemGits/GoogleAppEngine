package routers

import (
	"github.com/gorilla/mux"
	"GFW/taskmanager/controllers" 
	"net/http"
)

func SetNavigationRoutes(router *mux.Router) *mux.Router {
	 router.PathPrefix("/static/").Handler(http.StripPrefix("/static/",http.FileServer(http.Dir("./static"))))
	 router.HandleFunc("/", controllers.IndexPage)
	 router.HandleFunc("/signup", controllers.RegisterPage)
	 router.HandleFunc("/success", controllers.SuccessPage)
	 router.HandleFunc("/login", controllers.LoginPage)
	 router.HandleFunc("/taskmanager/all", controllers.TaskManagerAll)
	 router.HandleFunc("/taskmanager/createNotebook", controllers.CreateNotebook)
	 router.HandleFunc("/taskmanager/updateTask/{id}", controllers.UpdateNotebookPage)
	 router.HandleFunc("/taskmanager/updateNote/{id}", controllers.UpdateNotePage)
	 router.HandleFunc("/taskmanager/createNote", controllers.CreateNotePage)
	return router
}