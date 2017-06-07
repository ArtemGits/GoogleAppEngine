package controllers


import (
	"encoding/json"
	
	"net/http"
	"log"
	"github.com/gorilla/mux"
	"GFW/taskmanager/data"
	"GFW/taskmanager/common"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)




func CreateNotebooks(w http.ResponseWriter, r *http.Request) {
	var dataResource NotebookResource

	err := json.NewDecoder(r.Body).Decode(&dataResource)
	if err != nil {
		common.DisplayAppError(
			w,
			err,
			"Invalid Notebook Data",
			500,
		)
		return
	}

	task:= &dataResource.Data
	context := NewContext()
	defer context.Close()
	c := context.DbCollection("notebooks")
	repo := &data.NotebookRepository{c}

	repo.Create(task)
	if j,err := json.Marshal(NotebookResource{Data: *task}); err != nil {
		common.DisplayAppError(
			w,
			err,
			"An unexpected error has occured",
			500,
		)
		return
	} else {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusCreated)
		
		w.Write(j)

	}
}

func GetNotebooks(w http.ResponseWriter, r *http.Request) {
	context := NewContext()
	defer context.Close()
	c := context.DbCollection("notebooks")
	repo := &data.NotebookRepository{c}
	tasks := repo.GetAll()
	j, err := json.Marshal(NotebooksResource{Data: tasks})
	if err != nil {
		common.DisplayAppError(
			w,
			err,
			"An unexpected error has occured",
			500,
		)
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	
	//log.Println("IN function!")
	w.Write(j)
}

func GetNotebookById(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	context := NewContext()
	defer context.Close()
	c := context.DbCollection("notebooks")
	repo := &data.NotebookRepository{c}
	task,err := repo.GetById(id)
	if err != nil {
		if err == mgo.ErrNotFound {
			w.WriteHeader(http.StatusNoContent)
			return
		} else {
			common.DisplayAppError(
				w,
				err,
				"An unexpected error has occured",
				500,
			)
			return
		}
	}
	if j,err := json.Marshal(task); err != nil {
		common.DisplayAppError(
			w,
			err,
			"An unexpected error has occurred",
			500,
		)
		return
	} else {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(j)
	}
}


func GetNotebookByUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	user := vars["id"]
	context := NewContext()
	defer context.Close()
	c := context.DbCollection("notebooks")
	repo := &data.NotebookRepository{c}
	tasks := repo.GetByUser(user)
	j,err := json.Marshal(NotebooksResource{Data: tasks})
	if err != nil {
		common.DisplayAppError(
			w,
			err,
			"An unexpected error has occured",
			500,
		)
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Header().Set("Content-Type", "application/json")
	w.Write(j)
}

func UpdateNotebook(w http.ResponseWriter, r *http.Request) {
	
	vars := mux.Vars(r)
	id := bson.ObjectIdHex(vars["id"])
	
	var dataResource NotebookResource
	log.Println("In function_____________ ", id)

	err := json.NewDecoder(r.Body).Decode(&dataResource)
	log.Println(dataResource)
	if err != nil {
		common.DisplayAppError(
			w,
			err,
			"Invalid Notebook data",
			500,
		)
		return
	}
	log.Println("In function_____________ ")
	task := &dataResource.Data
	task.Id = id
	log.Println("ID=",task.Id)
	context := NewContext()
	defer context.Close()
	c := context.DbCollection("notebooks")
	repo := &data.NotebookRepository{c}

	if err := repo.Update(task); err != nil {
		common.DisplayAppError(
			w,
			err,
			"An unexpected error has occured",
			500,
		)
		return
	} else {
		w.WriteHeader(http.StatusNoContent)
	}
}


func DeleteNotebook(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	context := NewContext()
	defer context.Close()
	c := context.DbCollection("notebooks")
	repo := &data.NotebookRepository{c}
	err := repo.Delete(id)
	if err != nil {
		common.DisplayAppError(
			w,
			err,
			"An unexpected error has occured",
			500,
		)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}