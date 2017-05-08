package routers

import (
	"github.com/gorilla/mux"
	"GFW/taskmanager/controllers" 
	"GFW/taskmanager/common"
)

func SetUserRoutes(router *mux.Router) *mux.Router {
	router.HandleFunc("/users/register",controllers.Register).Methods("POST")
	router.HandleFunc("/users/login",controllers.Login).Methods("POST")
	router.HandleFunc("/logout",common.Logout)
	return router
}