package routers

import (
	
	"github.com/codegangsta/negroni"
	"github.com/gorilla/mux"

	"GFW/taskmanager/common"
	"GFW/taskmanager/controllers"

)

func SetTaskRoutes(router *mux.Router) *mux.Router {
	taskRouter := mux.NewRouter()	
	taskRouter.HandleFunc("/tasks", controllers.CreateNotebooks).Methods("POST")
	taskRouter.HandleFunc("/tasks/{id}", controllers.UpdateNotebook).Methods("PUT")
	taskRouter.HandleFunc("/tasks", controllers.GetNotebooks).Methods("GET")
	taskRouter.HandleFunc("/tasks/{id}", controllers.GetNotebookById).Methods("GET")
	taskRouter.HandleFunc("/tasks/users/{id}", controllers.GetNotebookByUser).Methods("GET")
	taskRouter.HandleFunc("/tasks/{id}", controllers.DeleteNotebook).Methods("DELETE")
	router.PathPrefix("/tasks").Handler(negroni.New(
		negroni.HandlerFunc(common.Validate),
		negroni.Wrap(taskRouter),
		))
	return router
	
}


