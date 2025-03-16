package main

import (
	pb "github.com/hygenec2olkid/7-solutions-assignment/blob/main/backend/task-3/proto/beefpb"
)

type beefServer struct {
	pb.UnimplementedBeefServiceServer
}
