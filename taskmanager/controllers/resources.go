package controllers

import (
	"GFW/taskmanager/models"
)

type (
	UserResource struct {
		Data models.User `json:"data"`
	}

	LoginResource struct {
		Data LoginModel `json:"data"`

	}
	AuthUserResource struct {
		Data AuthUserModel `json:"data"`
	}

	LoginModel struct {
		Email string 	`json:"email"`
		Password string `json:"password"`
	}
	AuthUserModel struct {
		User 	models.User `json:"user"`
		Token 	string 	    `json:"token"`
	}
)

type (
	NotebookResource struct {
		Data models.Notebook	`json:"data"`
	}

	NotebooksResource struct {
		Data []models.Notebook  `json:"data"`
	}
)

type (
	NoteResource struct {
		Data NoteModel 	`json:"data"`
	}
	NotesResource struct {
		Data []models.Note `json:"data"`
	}
	NoteModel struct {
		NotebookId 	string `json:"notebookid"`
		Name 		string `json:"name"`
		CreatedBy 	string `json:"createdby"`
		Description string `json:"description"`
		Content 	string `json:"content"`
	}
)