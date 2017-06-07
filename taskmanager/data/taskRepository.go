package data

import(
	"time"
	"fmt"
	"GFW/taskmanager/models"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)


type NotebookRepository struct {
	C *mgo.Collection
}

func (r *NotebookRepository) Create(task *models.Notebook) error {
	obj_id := bson.NewObjectId()
	task.Id = obj_id
	task.CreatedOn = time.Now()
	fmt.Println("In create")
	task.Status = "Created"
	err := r.C.Insert(&task)
	fmt.Println(task)
	return err
}

func (r *NotebookRepository) Update(task *models.Notebook) error {
	fmt.Println("Update")
	fmt.Println(*task);
	err := r.C.Update(bson.M{"_id": task.Id},
		bson.M{"$set": bson.M{
		"name":task.Name,
		"description": task.Description,
		"status":task.Status,
		}})
	fmt.Println(err)
	return err
}

func (r *NotebookRepository) Delete(id string) error {
	err := r.C. Remove(bson.M{"_id": bson.ObjectIdHex(id)})
	return err
}

func (r *NotebookRepository) GetAll() []models.Notebook {
	var tasks []models.Notebook
	iter := r.C.Find(nil).Iter()
	result := models.Notebook{}
	for iter.Next(&result) {
		tasks = append(tasks, result)
	}
	return tasks
}

func (r *NotebookRepository) GetById(id string) (task models.Notebook,err error) {
	err = r.C.FindId(bson.ObjectIdHex(id)).One(&task)
	return
}

func (r *NotebookRepository) GetByUser(user string) []models.Notebook {
	var tasks []models.Notebook
	iter := r.C.Find(bson.M{"createdby": user}).Iter()
	result := models.Notebook{}
	for iter.Next(&result) {
		tasks = append(tasks,result)
	}
	return tasks
}