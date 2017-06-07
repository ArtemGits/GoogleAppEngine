package models

import (
	"time"
	"gopkg.in/mgo.v2/bson"
)

type (
	User struct {
		Id 		     bson.ObjectId 	`bson:"_id,omitempty" json:"id"`
		FirstName	 string 		`json:"firstname"`
		LastName 	 string 		`json:"lastname"`
		Email 		 string 		`json:"email"`
		Password 	 string 		`json:"password,omitempty"`
		HashPassword []byte		    `json:"hashpassword,omitempty"`
	}

	Notebook struct{
		Id 			bson.ObjectId	`bson:"_id,omitempty" json:"id"`
		CreatedBy 	string 			`json:"createdby"`
		Name 		string 			`json:"name"`
		Description string 			`json:"description"`
		CreatedOn 	time.Time 		`json:createdon,omitempty"`
		Status 		string 			`json:"status,omitempty"`
	}
	Note struct {
		Id 			bson.ObjectId 	`bson:"_id,omitempty" json:"id"`
		Name 		string 			`json:"name"`
		CreatedBy 	string 			`json:"createdby"`
		NotebookId 	bson.ObjectId 	`bson:"notebookid" json:"notebookid"`
		Description string			`json:"description"`
		Content 	string			`json:"content"`
		CreatedOn   time.Time 		`json:"createdon,omitempty"`
	}
	
)
