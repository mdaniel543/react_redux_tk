package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type Log struct {
	ID   primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Func string             `json" "func, omitempty" bson:"func", omitempty`
	Time string             `json" "time, omitempty" bson:"time", omitempty`
}
