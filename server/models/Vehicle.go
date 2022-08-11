package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Vehicle struct {
	ID     primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Placa  string             `json" "placa, omitempty" bson:"placa", omitempty`
	Modelo int                `json" "modelo, omitempty" bson:"modelo", omitempty`
	Marca  string             `json" "marca, omitempty" bson:"marca", omitempty`
	Color  string             `json" "color, omitempty" bson:"color", omitempty`
	Serie  string             `json" "serie, omitempty" bson:"serie", omitempty`
}

type Vehicles []Vehicle
