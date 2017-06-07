package tests

import (
   // "GFW/taskmanager/controllers"
    "net/http"
    "net/http/httptest"
    "testing"
    //"io"
    //"strings"
    "GFW/taskmanager/common"

)




func TestCreateUser(t *testing.T) {
    // var reader io.Reader
    // userJson := `{"data": {
    // "FirstName": "test",
    // "SecondName": "Testtest",
    // "Email": "example@.mail.com",
    // "Password": "322test" 
    // }}`
   // reader = strings.NewReader(userJson) //Convert string to reader



// Create a request to pass to our handler. We don't have any query parameters for now, so we'll
    // pass 'nil' as the third parameter.
    req, err := http.NewRequest("GET", "/logout", nil)
    if err != nil {
        t.Fatal(err)
    }

    // We create a ResponseRecorder (which satisfies http.ResponseWriter) to record the response.
    rr := httptest.NewRecorder()
    handler := http.HandlerFunc(common.Logout)

   
   //
   // common.StartUp()
	//router := routers.InitRoutes()
	//n := negroni.Classic()
	//n.UseHandler(router)
	// server := &http.Server{
	// 	Addr: common.AppConfig.Server,
	// 	Handler: handler,
	// }

	// log.Println("Listening...")
	 //server.ListenAndServe()
	 handler.ServeHTTP(rr, req)



    // Check the status code is what we expect.
    if status := rr.Code; status != http.StatusOK {
        t.Errorf("handler returned wrong status code: got %v want %v",
            status, http.StatusOK)
    }

    // Check the response body is what we expect.
    // expected := `{"alive": true}`
    // if rr.Body.String() != expected {
    //     t.Errorf("handler returned unexpected body: got %v want %v",
    //         rr.Body.String(), expected)
    // }
}