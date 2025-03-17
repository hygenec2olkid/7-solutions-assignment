package main

import (
	"fmt"
	"log"
	"net"
	"net/http"
	"context"
	"io"
	pb "github.com/hygenec2olkid/7-solutions-assignment/backend/task-3/proto/beefpb"
	"google.golang.org/grpc"
)

type beefServer struct {
	pb.UnimplementedBeefServiceServer
}

func main() {
	listener, err := net.Listen("tcp", ":9000")
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}

	grpcServer := grpc.NewServer()
	pb.RegisterBeefServiceServer(grpcServer, &beefServer{})

	fmt.Println("🚀 gRPC Server is running on port 9000...")
	if err := grpcServer.Serve(listener); err != nil {
		log.Fatalf("Failed to serve: %v", err)
	}

}

func (s *beefServer) FetchBeef(ctx context.Context, req *pb.BeefRequest) (*pb.BeefResponse, error) {
	url := "https://baconipsum.com/api/?type=meat-and-filler&paras=99&format=text"
	resp, err := http.Get(url)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch beef data: %v", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response body: %v", err)
	}

	return &pb.BeefResponse{Text: string(body)}, nil
}
