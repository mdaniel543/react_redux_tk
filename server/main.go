package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/mdaniel543/so1_practica1_201709450/server/controllers"
)

func main() {
	fmt.Println("Server started")
	controllers.Connect() // Conecta a la base de datos
	router := mux.NewRouter()
	router.HandleFunc("/vehicle", controllers.CreateVehicle).Methods("POST")
	router.HandleFunc("/vehicle", controllers.GetVehicles).Methods("GET")
	router.HandleFunc("/vehicle/{id}", controllers.GetVehicle).Methods("GET")
	router.HandleFunc("/vehicle/{id}", controllers.UpdateVehicle).Methods("PUT")
	router.HandleFunc("/vehicle/{id}", controllers.DeleteVehicle).Methods("DELETE")
	http.ListenAndServe(":8080", router)
}
