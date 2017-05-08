package controllers 

import (
	"encoding/json"
	"net/http"
	"fmt"
	"github.com/gorilla/mux"
	"GFW/taskmanager/common"
	"GFW/taskmanager/data"
	"GFW/taskmanager/models"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

func CreateNote(w http.ResponseWriter, r *http.Request) {
	var dataResource NoteResource
	err := json.NewDecoder(r.Body).Decode(&dataResource)
	if err != nil {
		common.DisplayAppError(w,err,"Invalid Note data",500)
		return
	}
	noteModel := dataResource.Data
	note := &models.Note{
		NotebookId: 	bson.ObjectIdHex(noteModel.NotebookId),
		Name:			noteModel.Name,
		CreatedBy: 		noteModel.CreatedBy,
		Description:    noteModel.Description,
		Content: 		noteModel.Content,
	}
	context := NewContext()
	defer context.Close()
	c := context.DbCollection("notes")
	repo := &data.NoteRepository{c}
	repo.Create(note)

	if j,err := json.Marshal(note); err != nil {
		common.DisplayAppError(w,err, "An unexpected error has occurred", 500)
		return
	} else {
		w.Header().Set("Content-Type","application/json")
		w.WriteHeader(http.StatusCreated)
		w.Write(j)
	}

}


func UpdateNote(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := bson.ObjectIdHex(vars["id"])
	var dataResource NoteResource

	err := json.NewDecoder(r.Body).Decode(&dataResource)
	if err != nil {
		common.DisplayAppError(w,err,"Invalid Note data",500)
		return
	}
	noteModel := dataResource.Data
	note := &models.Note{
		Id : 	id,
		Name:			noteModel.Name,
		Description:    noteModel.Description,
		Content: 		noteModel.Content,
	}

	context := NewContext()
	defer context.Close()
	c := context.DbCollection("notes")
	repo := &data.NoteRepository{c}

	if err := repo.Update(note); err != nil {
		common.DisplayAppError(w,err,"An unexpected error has occurred", 500)
		return
	} else {
		w.WriteHeader(http.StatusNoContent)
	}
}

func GetNoteById(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id :=vars["id"]
	context := NewContext()
	defer context.Close()
	c := context.DbCollection("notes")
	repo := &data.NoteRepository{c}

	note,err := repo.GetById(id)
	if err != nil {
		if err == mgo.ErrNotFound {
			w.WriteHeader(http.StatusNoContent)
			return
		} else {
			common.DisplayAppError(w,err,"An unexpected error has occurred", 500)
			return
		}
	}
	if j,err := json.Marshal(note); err != nil {
			common.DisplayAppError(w,err,"An unexpected error has occurred", 500)
			return
	} else {
		w.Header().Set("Content-Type","application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(j)

	}
}

func GetNotes(w http.ResponseWriter, r *http.Request) {
	context := NewContext()
	defer context.Close()
	c := context.DbCollection("notes")
	repo := &data.NoteRepository{c}
	notes := repo.GetAll()
	if j,err := json.Marshal(NotesResource{Data : notes}); err != nil {
			common.DisplayAppError(w,err,"An unexpected error has occurred", 500)
			return
	} else {
		w.Header().Set("Content-Type","application/json")
		w.WriteHeader(http.StatusOK)
		w.Write(j)

	}
}

func GetNotesByUser(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	user := vars["id"]
	context := NewContext()
	defer context.Close()
	c := context.DbCollection("notes")
	repo := &data.NoteRepository{c}
	notes := repo.GetByUser(user)
	j,err := json.Marshal(NotesResource{Data: notes})
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

func GetNotesByTask(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	context := NewContext()
	defer context.Close()
	c := context.DbCollection("notes")
	repo := &data.NoteRepository{c}
	notes := repo.GetByTask(id)
	j,err := json.Marshal(NotesResource{Data: notes})
	if err != nil {
		common.DisplayAppError(w,err, "An unexpected error has occurred", 500)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(j)
}

func DeleteNote(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	context := NewContext()
	defer context.Close()
	c := context.DbCollection("notes")
	repo := &data.NoteRepository{c}

	err := repo.Delete(id)
	if err != nil {
		common.DisplayAppError(w,err, "An unexpected error has occurred", 500)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

func DeleteAllNotesFromNotebook(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	notebookid := vars["id"]
	fmt.Println("WOW: ", notebookid)
	context := NewContext()
	defer context.Close()
	c := context.DbCollection("notes")
	repo := &data.NoteRepository{c}

	err := repo.DeleteWithNotebook(notebookid)
	if err != nil {
		common.DisplayAppError(w,err, "An unexpected error has occurred", 500)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}