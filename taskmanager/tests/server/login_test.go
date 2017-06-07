package tests

import (
 
    "GFW/taskmanager/controllers"
    "net/http"
    "net/http/httptest"
    "testing"
    "io"
    "strings"
)

func TestHandleGetPage(t *testing.T) { 
   var reader io.Reader
    userJson := `{"data": {
    "Email": "example@.mail.com",
    "Password": "322test" 
    }}`
   reader = strings.NewReader(userJson) //Convert string to reader

  // Create a new HTTP Get request with the above generated uri.
  req, err := http.NewRequest("POST", "/users/login", reader)
  if err != nil {
    t.Fatal(err)
  }

  // Create a new recorder to get results.
  rr := httptest.NewRecorder()
  // Set the handler to test (HandleGetPage)
  handler := http.HandlerFunc(controllers.Login)
  // Run the above request
  handler.ServeHTTP(rr, req)

  // Status should be http.StatusOK
  if status := rr.Code;  status != http.StatusOK  {
    t.Errorf("handler returned wrong status code: got %v want %v",
      status, http.StatusCreated)
  }

  
}