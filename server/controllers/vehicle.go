package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/mdaniel543/so1_practica1_201709450/server/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var client *mongo.Client

func CreateVehicle(response http.ResponseWriter, request *http.Request) {
	log := models.Log{
		ID:   [12]byte{},
		Func: "CreateVehicle",
		Time: time.Now().String(),
	}
	collectiontmp := client.Database("practica1").Collection("log")
	ctxtmp, _ := context.WithTimeout(context.Background(), 5*time.Second)
	_, _ = collectiontmp.InsertOne(ctxtmp, log)

	response.Header().Set("Content-Type", "application/json")
	var vehicle models.Vehicle
	_ = json.NewDecoder(request.Body).Decode(&vehicle)
	collection := client.Database("practica1").Collection("vehicle")
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	result, _ := collection.InsertOne(ctx, vehicle)
	json.NewEncoder(response).Encode(result)
}

func GetVehicle(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")
	params := mux.Vars(request)
	id, _ := primitive.ObjectIDFromHex(params["id"])
	collection := client.Database("practica1").Collection("vehicle")
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	var vehicle models.Vehicle
	err := collection.FindOne(ctx, bson.M{"_id": id}).Decode(&vehicle)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{ "message": "` + err.Error() + `" }`))
		return
	}
	json.NewEncoder(response).Encode(vehicle)
}

func GetVehicles(response http.ResponseWriter, request *http.Request) {
	response.Header().Set("Content-Type", "application/json")
	collection := client.Database("practica1").Collection("vehicle")
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	cursor, _ := collection.Find(ctx, bson.M{})
	var vehicles []models.Vehicle
	for cursor.Next(ctx) {
		var vehicle models.Vehicle
		cursor.Decode(&vehicle)
		vehicles = append(vehicles, vehicle)
	}
	json.NewEncoder(response).Encode(vehicles)
}

func UpdateVehicle(response http.ResponseWriter, request *http.Request) {
	log := models.Log{
		ID:   [12]byte{},
		Func: "UpdateVehicle",
		Time: time.Now().String(),
	}
	collectiontmp := client.Database("practica1").Collection("log")
	ctxtmp, _ := context.WithTimeout(context.Background(), 5*time.Second)
	_, _ = collectiontmp.InsertOne(ctxtmp, log)

	response.Header().Set("Content-Type", "application/json")
	params := mux.Vars(request)
	id, _ := primitive.ObjectIDFromHex(params["id"])
	var vehicle models.Vehicle
	_ = json.NewDecoder(request.Body).Decode(&vehicle)
	collection := client.Database("practica1").Collection("vehicle")
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	result, _ := collection.UpdateOne(ctx, bson.M{"_id": id}, bson.M{"$set": vehicle})
	json.NewEncoder(response).Encode(result)
}

func DeleteVehicle(response http.ResponseWriter, request *http.Request) {
	log := models.Log{
		ID:   [12]byte{},
		Func: "DeleteVehicle",
		Time: time.Now().String(),
	}
	collectiontmp := client.Database("practica1").Collection("log")
	ctxtmp, _ := context.WithTimeout(context.Background(), 5*time.Second)
	_, _ = collectiontmp.InsertOne(ctxtmp, log)

	response.Header().Set("Content-Type", "application/json")
	params := mux.Vars(request)
	id, _ := primitive.ObjectIDFromHex(params["id"])
	collection := client.Database("practica1").Collection("vehicle")
	ctx, _ := context.WithTimeout(context.Background(), 5*time.Second)
	result, _ := collection.DeleteOne(ctx, bson.M{"_id": id})
	json.NewEncoder(response).Encode(result)
}

func Connect() {
	fmt.Println("Conectando a la base de datos...")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	client, _ = mongo.Connect(ctx, options.Client().ApplyURI("mongodb://db:27017"))
	if err := client.Ping(ctx, nil); err != nil {
		fmt.Println(err)
		fmt.Println("No se pudo conectar a la base de datos")
	}
}
