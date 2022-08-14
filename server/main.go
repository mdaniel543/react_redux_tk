package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/mdaniel543/so1_practica1_201709450/server/controllers"
	"github.com/rs/cors"
)

func main() {
	fmt.Println("Server started")
	controllers.Connect() // Conecta a la base de datos
	router := mux.NewRouter()
	router.HandleFunc("/insert", controllers.CreateVehicle).Methods("POST")
	router.HandleFunc("/get", controllers.GetVehicles).Methods("GET")
	router.HandleFunc("/get/{id}", controllers.GetVehicle).Methods("GET")
	router.HandleFunc("/put/{id}", controllers.UpdateVehicle).Methods("PUT")
	router.HandleFunc("/delete/{id}", controllers.DeleteVehicle).Methods("DELETE")

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"http://localhost:3000"},
		AllowedMethods:   []string{http.MethodGet, http.MethodPost, http.MethodDelete, http.MethodPut},
		AllowCredentials: true,
	})

	handler := c.Handler(router)
	http.ListenAndServe(":8080", handler)
}
