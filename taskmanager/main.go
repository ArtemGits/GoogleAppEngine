package main 

import(
	"log"
	"net/http"
	
	 "github.com/codegangsta/negroni"
	 "GFW/taskmanager/common"
	 "GFW/taskmanager/routers"
)




func main() {
	
	common.StartUp()
	router := routers.InitRoutes()
	n := negroni.Classic()
	n.UseHandler(router)
	server := &http.Server{
		Addr: common.AppConfig.Server,
		Handler: n,
	}

	 log.Println("Listening...")
	 server.ListenAndServe()
}




