package routers

import (
	"github.com/codegangsta/negroni"
	"github.com/gorilla/mux"

	"GFW/taskmanager/common"
	"GFW/taskmanager/controllers"
)

func SetNoteRoutes(router *mux.Router) *mux.Router {
	noteRouter := mux.NewRouter()
	noteRouter.HandleFunc("/notes", controllers.CreateNote).Methods("POST")
	noteRouter.HandleFunc("/notes/{id}", controllers.UpdateNote).Methods("PUT")
	noteRouter.HandleFunc("/notes/{id}", controllers.GetNoteById).Methods("GET")
	noteRouter.HandleFunc("/notes",controllers.GetNotes).Methods("GET")
	noteRouter.HandleFunc("/notes/task/{id}", controllers.GetNotesByTask).Methods("GET")
	noteRouter.HandleFunc("/notes/users/{id}", controllers.GetNotesByUser).Methods("GET")
	noteRouter.HandleFunc("/notes/{id}",controllers.DeleteNote).Methods("DELETE")
	noteRouter.HandleFunc("/notes/notebook/{id}",controllers.DeleteAllNotesFromNotebook).Methods("DELETE")
	router.PathPrefix("/notes").Handler(negroni.New(
		negroni.HandlerFunc(common.Validate),
		negroni.Wrap(noteRouter),
		))
	return router
}
