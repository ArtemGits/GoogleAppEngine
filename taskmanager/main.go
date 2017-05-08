package main 

import(
	"log"
	"net/http"
	
	 "github.com/codegangsta/negroni"
//"github.com/gorilla/mux"
	 "GFW/taskmanager/common"
	 "GFW/taskmanager/routers"
)

//var templates = template.Must(template.ParseGlob("templates/*"))


func main() {
	
	 common.StartUp()
	 router := routers.InitRoutes()
//	 staticDirectory := "/static/"
	// router.PathPrefix("/").Handler(http.FileServer(http.Dir("./static")))
//	 ServeStatic(router,staticDirectory)
	 n := negroni.Classic()
	
	 //router.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
	 
	 // router.PathPrefix("/static/").Handler(http.StripPrefix("/static/",http.FileServer(http.Dir("./static"))))
	 // router.HandleFunc("/", IndexPage)
	 // router.HandleFunc("/signup", RegisterPage)
	 // router.HandleFunc("/success", SuccessPage)
	 // router.HandleFunc("/login", LoginPage)


	n.UseHandler(router)
	server := &http.Server{
		Addr: common.AppConfig.Server,
		Handler: n,
	}

	
	


	 log.Println("Listening...")
	 server.ListenAndServe()

	


}




// func RegisterPage(w http.ResponseWriter, r *http.Request) {
// 	if err := templates.ExecuteTemplate(w, "register", nil); err != nil {
// 		log.Println(err.Error())
// 		http.Error(w,http.StatusText(500),500)
// 	}
	
// }
// func LoginPage(w http.ResponseWriter, r *http.Request) {
// 	if err := templates.ExecuteTemplate(w, "login", nil); err != nil {
// 		log.Println(err.Error())
// 		http.Error(w,http.StatusText(500),500)
// 	}
	
// }
// func FailurePage(w http.ResponseWriter, r *http.Request) {
// 	if err := templates.ExecuteTemplate(w, "fail", nil); err != nil {
// 		log.Println(err.Error())
// 		http.Error(w,http.StatusText(500),500)
// 	}
	
// }
// func SuccessPage(w http.ResponseWriter, r *http.Request) {
// 	if err := templates.ExecuteTemplate(w, "success", nil); err != nil {
// 		log.Println(err.Error())
// 		http.Error(w,http.StatusText(500),500)

// 	}
// 	//http.Redirect(w, r, "http://www.google.com", 302)
// 	log.Println("SuccessPage")
	
// }



// func IndexPage(w http.ResponseWriter, r *http.Request) {
// 	if err := templates.ExecuteTemplate(w, "Index", nil); err != nil {
// 		log.Println(err.Error())
// 		http.Error(w,http.StatusText(500),500)
// 	}
// 	if err := templates.ExecuteTemplate(w, "home", nil); err != nil {
// 		log.Println(err.Error())
// 		http.Error(w,http.StatusText(500),500)
// 	}
// }


//join to startup

// func ServeStatic(router *mux.Router, staticDirectory string) {
// 	staticPaths := map[string]string {
// 		"styles": staticDirectory + "/stylesheets/",
// 		"images": staticDirectory + "/images",
// 		"scripts": staticDirectory + "js",
// 	}
// 	for pathName, pathValue := range staticPaths {
// 		pathPrefix := "/" + pathName + "/"
// 		router.PathPrefix(pathPrefix).Handler(http.StripPrefix(pathPrefix,http.FileServer(http.Dir(pathValue))))
// 	}
// }




