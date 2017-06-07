package tests



import (
    "GFW/taskmanager/routers"
    "GFW/taskmanager/common"
    "fmt"
    "io"
    "io/ioutil"
    "net/http"
    "net/http/httptest"
    "net/http/cookiejar"
    "strings"
    "testing"
    "net/url"
    
  
)


var (
    server   *httptest.Server
    reader   io.Reader 
    notebookUrl string
)

func init() {
    server = httptest.NewServer(routers.InitRoutes()) //Creating new server with the user handlers
    notebookUrl = fmt.Sprintf("http://localhost:8080/tasks")
}



func TestCreateNotebook(t *testing.T) {
      notebookJson := `{"data": {
      "Createdby": "example@.mail.com",
      "Name": "testNotebook",
      "Description": "descriptionTest" 
    }}`

    token,err := common.SetToken(nil,nil,"example@.mail.com")


    reader = strings.NewReader(notebookJson)

    jar, _ := cookiejar.New(nil)
    var cookies []*http.Cookie
    cookie := &http.Cookie{
    Name:   "Auth",
    Value:  token,
    
  }
  cookies = append(cookies, cookie)
  u, _ := url.Parse(notebookUrl)
  jar.SetCookies(u, cookies)
  fmt.Println(jar.Cookies(u))
  client := &http.Client{
    Jar: jar,
  }


  
  req, _ := http.NewRequest("POST", "http://localhost:8080/tasks", reader )
  req.Header.Add("Content-Type", "application/x-www-form-urlencoded")
  resp, err := client.Do(req)
  if err != nil {
    panic(nil)
  }
  body, _ := ioutil.ReadAll(resp.Body)
  resp.Body.Close()
  fmt.Println(string(body))

}






