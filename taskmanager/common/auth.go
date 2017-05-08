package common 

import (
//	"io/ioutil"
	"fmt"	
	//"log"
	"net/http"
	"time"
	"context"
	"github.com/dgrijalva/jwt-go"
	//"GFW/taskmanager/controllers"

)	 

type Key int

const MyKey Key = 0

// JWT schema of the data it will store
type Claims struct {
	Username string `json:"username"`
	jwt.StandardClaims
}

// create a JWT and put in the clients cookie
func SetToken(res http.ResponseWriter, req *http.Request, name string) (string, error) {
	expireToken := time.Now().Add(time.Hour * 1).Unix()
	//expireCookie := time.Now().Add(time.Hour * 1)

	claims := Claims{
		name,
		jwt.StandardClaims{
			ExpiresAt: expireToken,
			Issuer:    "localhost:8080",
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	signedToken, _ := token.SignedString([]byte("secret"))

	//cookie := http.Cookie{Name: "Auth", Value: signedToken, Expires: expireCookie, HttpOnly: true}
	//fmt.Println("cookie:",cookie)
	//fmt.Println(signedToken)

	//http.SetCookie(res, &cookie)

	//http.Redirect(res, req, "/taskmanager/all", 307)
	return signedToken,nil

}



// middleware to protect private pages
func Validate(w http.ResponseWriter, r *http.Request, next http.HandlerFunc)  {
	//fmt.Println("Validate")
	//return http.HandlerFunc(func(res http.ResponseWriter, req *http.Request) {
		cookie, err := r.Cookie("Auth")
	//	fmt.Println(err)
	//	fmt.Println(cookie)
		if err != nil {
			http.NotFound(w, r)
			return
		}

		token, err := jwt.ParseWithClaims(cookie.Value, &Claims{}, func(token *jwt.Token) (interface{}, error) {
			//fmt.Println("validate token:",token)
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("Unexpected signing method")
			}
			return []byte("secret"), nil
		})
		if err != nil {
			http.NotFound(w, r)
			return
		}

		if claims, ok := token.Claims.(*Claims); ok && token.Valid {
			ctx := context.WithValue(r.Context(), MyKey, *claims)
	//		fmt.Println("hello Next")
			next(w, r.WithContext(ctx))
		} else {
			http.NotFound(w, r)
			return
		}
	//})
}

func Logout(res http.ResponseWriter, req *http.Request) {
	deleteCookie := http.Cookie{Name: "Auth", Value: "none", Expires: time.Now()}
	http.SetCookie(res, &deleteCookie)
	return
}