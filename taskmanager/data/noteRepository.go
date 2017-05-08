package data

import (
	"time"
	"fmt"
	"GFW/taskmanager/models"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"

    
    
  
)

type NoteRepository struct {
	C *mgo.Collection
}

func (r *NoteRepository) Create(note  *models.Note) error {
	obj_id := bson.NewObjectId()
	note.Id = obj_id
	note.CreatedOn = time.Now()
	err := r.C.Insert(&note)
	
	return err
}

func (r *NoteRepository) Update(note *models.Note) error {
	fmt.Println("HELLO FROM UPDATE")
	err := r.C.Update(bson.M{"_id": note.Id},
			bson.M{"$set":bson.M{
				"name" : note.Name,
				"description": note.Description,
				"content": note.Content,
				}})
	return err
}

func (r *NoteRepository) GetById(id string) (note models.Note,err error) {
	err = r.C.FindId(bson.ObjectIdHex(id)).One(&note)
	return note,err
}

func (r *NoteRepository) GetAll() []models.Note {
	var notes []models.Note
	iter := r.C.Find(nil).Iter()
	result := models.Note{}
	for iter.Next(&result) {
		notes = append(notes,result)
	}
	return notes
}

func (r *NoteRepository) GetByUser(user string) []models.Note {
	var notes []models.Note
	iter := r.C.Find(bson.M{"createdby": user}).Iter()
	result := models.Note{}
	for iter.Next(&result) {
		notes = append(notes,result)
	}
	return notes
}

func (r *NoteRepository) GetByTask(id string) []models.Note {
	var notes []models.Note
	notebookid := bson.ObjectIdHex(id)


	iter := r.C.Find(bson.M{"notebookid": notebookid}).Iter()
	result := models.Note{}
	for iter.Next(&result) {
		notes = append(notes,result)
	}
	return notes
}

func (r *NoteRepository) Delete(id string) error {
	err := r.C.Remove(bson.M{"_id":bson.ObjectIdHex(id)})
	return err
}

func (r *NoteRepository) DeleteWithNotebook(id string) error {
	info,err := r.C.RemoveAll(bson.M{"notebookid":bson.ObjectIdHex(id)})
	fmt.Println(info)
	return err
}