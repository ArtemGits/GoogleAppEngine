package tests

// import (
 
//     "GFW/taskmanager/controllers"
//     "net/http"
//     "net/http/httptest"
//     "testing"
//     "io"
//     "strings"
// )

// func TestHandleGetPage(t *testing.T) { 
//    var reader io.Reader
//     userJson := `{"data": {
//     "FirstName": "test322",
//     "LastName": "Testtest",
//     "Email": "ffffexample22@.mail.com",
//     "Password": "333test" 
//     }}`
//    reader = strings.NewReader(userJson) //Convert string to reader

//   // Create a new HTTP Get request with the above generated uri.
//   req, err := http.NewRequest("POST", "/users/register", reader)
//   if err != nil {
//     t.Fatal(err)
//   }

//   // Create a new recorder to get results.
//   rr := httptest.NewRecorder()
//   // Set the handler to test (HandleGetPage)
//   handler := http.HandlerFunc(controllers.Register)
//   // Run the above request
//   handler.ServeHTTP(rr, req)

//   // Status should be http.StatusOK
//   if status := rr.Code;  status != http.StatusCreated  {
//     t.Errorf("handler returned wrong status code: got %v want %v",
//       status, http.StatusCreated)
//   }

  
// }



import (
    "GFW/taskmanager/routers"
    "fmt"
    "io"
    "net/http"
    "net/http/httptest"
    "strings"
    "testing"
)

var (
    server   *httptest.Server
    reader   io.Reader //Ignore this for now
    usersUrl string
)

func init() {
    server = httptest.NewServer(routers.InitRoutes()) //Creating new server with the user handlers

    usersUrl = fmt.Sprintf("http://localhost:8080/users/register") //Grab the address for the API endpoint
}

func TestCreateUser(t *testing.T) {
     userJson := `{"data": {
     "FirstName": "test322",
     "LastName": "Testtest",
     "Email": "ffffexample22@.mail.com",
     "Password": "333test" 
     }}`

    reader = strings.NewReader(userJson) //Convert string to reader

    request, err := http.NewRequest("POST", usersUrl, reader) //Create request with JSON body

    res, err := http.DefaultClient.Do(request)

    if err != nil {
        t.Error(err) //Something is wrong while sending request
    }

    if res.StatusCode != 201 {
        t.Errorf("Success expected: %d", res.StatusCode) //Uh-oh this means our test failed
    }
}

