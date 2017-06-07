package controllers

import (
	"log"
	"net/http"
	"html/template"
)

var templates = template.Must(template.ParseGlob("/home/artem/Documents/code/go/src/GFW/taskmanager/templates/*"))
var userLoginInfo interface{}


func IndexPage(w http.ResponseWriter, r *http.Request) {
	if err := templates.ExecuteTemplate(w, "Index", nil); err != nil {
		log.Println(err.Error())
		http.Error(w,http.StatusText(500),500)
	}
	if err := templates.ExecuteTemplate(w, "home", nil); err != nil {
		log.Println(err.Error())
		http.Error(w,http.StatusText(500),500)
	}
}


func RegisterPage(w http.ResponseWriter, r *http.Request) {
	if err := templates.ExecuteTemplate(w, "register", nil); err != nil {
		log.Println(err.Error())
		http.Error(w,http.StatusText(500),500)
	}
	
}
func LoginPage(w http.ResponseWriter, r *http.Request) {
	if err := templates.ExecuteTemplate(w, "login", nil); err != nil {
		log.Println(err.Error())
		http.Error(w,http.StatusText(500),500)
	}
	
}

func SuccessPage(w http.ResponseWriter, r *http.Request) {
	if err := templates.ExecuteTemplate(w, "success", nil); err != nil {
		log.Println(err.Error())
		http.Error(w,http.StatusText(500),500)
	}
}

func TaskManagerAll(w http.ResponseWriter, r *http.Request) {
	if err := templates.ExecuteTemplate(w, "all", userLoginInfo); err != nil {
		log.Println(err.Error())
		http.Error(w,http.StatusText(500),500)
	}


	
}

func CreateNotebook(w http.ResponseWriter, r *http.Request) {
	if err := templates.ExecuteTemplate(w, "createNotebook", userLoginInfo); err != nil {
		log.Println(err.Error())
		http.Error(w,http.StatusText(500),500)
	}
}

func CreateNotePage(w http.ResponseWriter, r *http.Request) {
	if err := templates.ExecuteTemplate(w, "createNote", userLoginInfo); err != nil {
		log.Println(err.Error())
		http.Error(w,http.StatusText(500),500)
	}
}

func UpdateNotebookPage(w http.ResponseWriter, r *http.Request) {
	if err := templates.ExecuteTemplate(w, "updateTask", userLoginInfo); err != nil {
		log.Println(err.Error())
		http.Error(w,http.StatusText(500),500)
	}
}

func UpdateNotePage(w http.ResponseWriter, r *http.Request) {
	if err := templates.ExecuteTemplate(w, "updateNote", userLoginInfo); err != nil {
		log.Println(err.Error())
		http.Error(w,http.StatusText(500),500)
	}
}

func storeUserLogin(resource interface{}) {
	userLoginInfo = resource
}


